export interface ChatOpts {
  port: number;
}

export class Chat {
  /** Did chatGpt isntance connect to our server*/
  connected = false;

  // Is accepting more then one WebSocket useful?
  #socket: WebSocket | undefined = undefined;
  /** js quirk: ensure that the user created Chat with `start` not `new`*/
  #init = false;

  static start(opts?: ChatOpts) {
    const { port } = opts ?? { port: 5423 } satisfies ChatOpts;
    const server = Deno.listen({ port });

    const chat = new Chat();

    (async () => {
      for await (const con of server) {
        await chat.#handle(con);
      }
    })();

    chat.#init = true;
    return chat;
  }

  async chat(input: string) {
    if (!this.#init) throw "use `Chat.start` not `new Chat`";
    if (!this.#socket || !this.connected) return;

    let response = undefined;
    this.#socket.onmessage = (m) => {
      response = m.data;
    };
    this.#socket.send(input);
    while (response === undefined) {
      await new Promise((r) => setTimeout(r, 100));
    }
    return response;
  }

  async #handle(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn);
    for await (const requestEvent of httpConn) {
      await requestEvent.respondWith(this.#handleReq(requestEvent.request));
    }
  }

  #handleReq(req: Request): Response {
    const upgrade = req.headers.get("upgrade") || "";
    if (upgrade.toLowerCase() != "websocket") {
      return new Response("request isn't trying to upgrade to websocket.");
    }
    const { socket, response } = Deno.upgradeWebSocket(req);
    this.#socket = socket;
    socket.onopen = () => this.connected = true;
    socket.onclose = () => this.connected = false;
    socket.onerror = (e) => console.error("socket errored:", e);
    return response;
  }
}
