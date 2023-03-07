# Chat

Deno api wrapper for the free ChatGpt Web interface

## Usage

```typescript
import { Chat } from "https://deno.land/x/TODONAME/chat.ts";

// start the chat server
const chat = Chat.start();

// wait for chatgpt to connect to our servers
// you need to paste web.js contents into the web console of chatgpt page
while (!chat.connected) await new Promise((r) => setTimeout(r, 1000));

// stat chating
console.log(await chat.chat("hello"));
```

## Demo

https://cdn.discordapp.com/attachments/983096812456017934/1082382192019263488/Screencast_from_2023-03-06_20-14-51.webm

## How it works

- Chat.start starts a webscket server
- when you paste web.js in the web console of chatGpt page, it will open a
  websockt and connect back to our servers
- Chat.chat sends our input to the chatgpt page, it will be inputed with an
  enter event, then it try to use some heursitics to detect chatGpt answer and
  send it back

## Nvim Plugin

TODO add link