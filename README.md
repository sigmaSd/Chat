# Chat

Deno api wrapper for the free ChatGpt Web interface

## Usage

```typescript
import { Chat } from "https://deno.land/x/xchat/chat.ts";

// start the chat server
const chat = Chat.start();

// wait for chatgpt to connect to our servers
// you need to paste web.js contents into the web console of chatgpt page
while (!chat.connected) await new Promise((r) => setTimeout(r, 1000));

// stat chating
console.log(await chat.chat("hello"));
```

## Demo

<img src="https://cdn.discordapp.com/attachments/983096812456017934/1082698462635757579/chat.gif"/>

## How it works

- Chat.start starts a webscket server
- when you paste web.js in the web console of chatGpt page, it will open a
  websockt and connect back to our server
- Chat.chat sends our input to the chatgpt page, it will be inputed with an
  enter event, then it tries to use some heursitics to detect chatGpt answer and
  send it back

## Nvim Plugin

https://github.com/sigmaSd/chat.nvim

## TODO

- [ ] Add a bing backend
- [ ] Add an alterante API where the answer is streamed

## News

I just noticied there is free api proxy project https://github.com/ayaka14732/ChatGPTAPIFree

So all these hacks might not be needed (if openai allows it to continue)
