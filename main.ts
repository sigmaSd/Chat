import { Chat } from "./chat.ts";

const chat = Chat.start();

while (true) {
  console.log(chat.connected);
  await new Promise((r) => setTimeout(r, 1000));
}
