import { Chat } from "./chat.ts";

const chat = Chat.start();

try {
  const wlcopy = new Deno.Command("wl-copy", { stdin: "piped" }).spawn();
  const stdinWriter = wlcopy.stdin.getWriter();

  console.log("running: wl-copy './web.js'");
  await stdinWriter.write(
    new TextEncoder().encode(
      Deno.readTextFileSync("./web.js"),
    ),
  );
  await stdinWriter.close();
  await wlcopy.status;
} catch {
  // user doesn't have wl-copy probably
  console.log("you need to copy './web.js' contents");
}

console.log("Paste './web.js' contents in the console of ChatGpt page");
console.log("waiting for chatGpt connection");

while (!chat.connected) await new Promise((r) => setTimeout(r, 1000));
console.log("chatGpt connected");

while (true) {
  const input = prompt("> ");
  if (!input) break;

  console.log(await chat.chat(input));
}
