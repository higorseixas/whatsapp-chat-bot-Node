import { Whatsapp, create, Message, SocketState } from 'venom-bot';
import { stages, getStage } from './stages';
import { UserService } from './module/user/user.service';

export type QRcode = {
  base64r: string;
  asciiQR: string;
  attempts: number;
};

export class Sender {
  private client: Whatsapp;
  private conected: boolean;
  private qr: QRcode;
  private userService = new UserService();

  constructor() {
    this.initialize();
  }

  get isConected(): boolean {
    return this.conected;
  }

  get qrCode(): QRcode {
    return this.qr;
  }

  async sendText(to: string, body: string) {
    await this.client.sendText(to, body);
  }

  private initialize() {

    const qr = (base64r: string, asciiQR: string, attempts: number) => {
      this.qr = { base64r, asciiQR, attempts };
    };

    const status = (statusSession: string) => {
      this.conected = ['isLogged', 'qrReadSuccess', 'chatsAvailable'].includes(
        statusSession
      );
    };

    const start = async (client: Whatsapp) => {
      client.onMessage((message) => {
        console.log(message)
        if (!message.isGroupMsg && message.body === 'Oi bot') {
          const currentStage = getStage({ from: message.from });

          const messageResponse = stages[currentStage].stage.exec({
            from: message.from,
            message: message.body,
            client,
          });

          if (messageResponse) {
            client.sendText(message.from, messageResponse).then(() => {
              console.log('Message sent.');
            }).catch(error => console.error('Error when sending message', error));
          }
        }
      });
    }

    create('ws-bot', qr, status)
      .then((client) => start(client))
      .catch((error) => console.error(error));
  }
}
