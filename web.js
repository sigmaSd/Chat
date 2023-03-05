(() => {
  const ws = new WebSocket("ws://localhost:5420");
  ws.onmessage = async (m) => {
    console.log("received: ", m.data);
    await exec(m.data);
  };

  async function exec(input) {
    const event = new Event("keydown");
    event.key = "Enter";
    document.querySelector(".m-0").value = input;
    document.querySelector(".m-0").dispatchEvent(event);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    requestIdleCallback(() => {
      const response =
        [...document.querySelectorAll(".markdown")].at(-1).innerText;
      console.log("sending: ", response);
      ws.send(response);
    }, { timeout: 60 * 1000 });
  }
})();
