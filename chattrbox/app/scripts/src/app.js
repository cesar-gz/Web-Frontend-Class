import socket from './ws-client';
import { UserStore } from './storage';
import {ChatForm, ChatList, promptForUsername} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

//let username = '';
let userStore = new UserStore('x-chattrbox/u');
let username = userStore.get();
if (!username) {
  username = promptForUsername();
  userStore.set(username);
}

class ChatApp {
  constructor() {
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username);

    socket.init('ws://localhost:3001');
    socket.registerOpenHandler( () => {
      //let message = new ChatMessage({ message: 'kaPOW!', user: 'superman', timestamp: (new Date()).getTime() });
      //socket.sendMessage(message.toObj());
       this.chatForm.init((data) => {
         console.log('in chatForm.init... data is:', data);
         let message = new ChatMessage({ message: data });
         socket.sendMessage(message.toObj());
         //socket.sendMessage(message.serialize());
       });
        this.chatList.init();
    });
    socket.registerMessageHandler((data) => {
      console.log("ChatApp data: ", data);
      let message = new ChatMessage(data);
      this.chatList.drawMessage(message.toObj());
      //this.chatList.drawMessage(message.serialize());
    });
  }
}

class ChatMessage {
    constructor({
      message: m,
      user: u=username,
      timestamp: t=(new Date()).getTime()
    }) {
    //this.username = data.user || 'wonderwoman';
    this.username = u;
    this.message = m;
    this.timestamp = t;

    console.log('ChatMessage constructed', this);
    console.log('ChatMessage constructed object', this.toObj());
  }
  toObj() {
    return {
      user: this.username,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

export default ChatApp;
