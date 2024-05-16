import constants from '../constants';

export default class MessageApi {
  private socket:WebSocket|null = null;

  private interval:number|null = null;

  private callbackResponce?:(resources:any)=>void;

  private callbackOpen?:()=>void;

  init(userId:number, chatId:number, token:string, callbackResponce?:(resources:any)=>void, callbackOpen?:()=>void) {
    this.socket = new WebSocket(`${constants.WSS}/ws/chats/${userId}/${chatId}/${token}`);
    this.callbackResponce = callbackResponce;
    this.callbackOpen = callbackOpen;
    this.pingPong();

    this.socket.addEventListener('open', () => {
      if (this.callbackOpen) this.callbackOpen();
    });

    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'pong') return;
      if (this.callbackResponce) {
        this.callbackResponce(data);
      }
    });

    this.socket.addEventListener('close', () => {
      this.closePingPong();
    });

    this.socket.addEventListener('error', () => {
      this.closePingPong();
    });
  }

  getMessages(offset:number) {
    this.socket?.send(JSON.stringify({ content: offset, type: 'get old' }));
  }

  sendMessageText(message:string) {
    this.socket?.send(JSON.stringify({ content: message, type: 'message' }));
  }

  sendMessageFile(idFile:number) {
    this.socket?.send(JSON.stringify({ content: idFile, type: 'file' }));
  }

  close() {
    this.closePingPong();
    this.socket = null;
  }

  private pingPong() {
    this.interval = setInterval(() => {
      this.socket?.send(JSON.stringify({ type: 'ping' }));
    }, 1000);
  }

  private closePingPong() {
    if (this.interval === null) return;
    clearInterval(this.interval);
  }
}
