import socket from './ws-client';
import {ChatForm, ChatList} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

class ChatApp {
  constructor() {
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, 'wonderwoman');

    socket.init('ws://localhost:3001');
    socket.registerOpenHandler( () => {
      let message = new ChatMessage({ message: 'kaPOW!', user: 'superman', timestamp: (new Date()).getTime() });
      socket.sendMessage(message.toObj());

      // this.chatForm.init((data) => {
      //   console.log('in chatForm.init... data is:', data);
      //   let message = new ChatMessage(data);
      //   socket.sendMessage(message.toObj());
      // });
    });
    socket.registerMessageHandler((data) => {
      console.log("ChatApp data: ", data);
      let message = new ChatMessage(data);
      this.chatList.drawMessage(message.toObj());
    });
  }
}

class ChatMessage {
  constructor(data) {
    if (typeof data === 'string') {
      data = {
        message: data
      };
    }
    this.username = data.user || 'wonderwoman';
    this.message = data.message;
    this.timestamp = data.timestamp || (new Date()).getTime();

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
