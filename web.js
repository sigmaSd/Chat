(() => {
  function getDivs() {
    return [...document.querySelectorAll(".markdown")];
  }

  async function sleepMs(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  let divN = getDivs().length;

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

    const zeroWidthSpace = new TextDecoder().decode(
      new Uint8Array([226, 128, 139]),
    );
    // wait for answer
    // wait for the answer div to be created
    while (getDivs().length === divN) await sleepMs(1000);
    divN = getDivs().length;

    // wait for writing
    while (getDivs().at(-1).innerText === zeroWidthSpace) await sleepMs(1000);

    // poll the last div
    // if twice in a row its the same -> consider the answer done
    while (true) {
      const answer = getDivs().at(-1).innerText;
      await sleepMs(1000);
      const answer2 = getDivs().at(-1).innerText;
      if (answer === answer2) break;
    }

    const answer = getDivs().at(-1).innerText;
    console.log("sending: ", answer);
    ws.send(answer);
  }
})();
