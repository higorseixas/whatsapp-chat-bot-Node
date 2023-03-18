import { Whatsapp, create, Message, SocketState } from 'venom-bot';
import { stages, getStage } from './stages';


// import { BoletoInterface } from './interfaces/boletoInterface';
// import { BoletoService } from './module/boleto/boleto.service';
// import fs from 'fs';

export type QRcode = {
  base64r: string;
  asciiQR: string;
  attempts: number;
};

export class Sender {
  private client: Whatsapp;
  private conected: boolean;
  private qr: QRcode;
  // private boleto = new BoletoService();

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
      //TESTE SALVANDO UM ARQUIVO PDF NO BANCO DE DADOS(BASE64)

      // const pdfBuffer = fs.readFileSync('./dummy.pdf');
      // const base64String = pdfBuffer.toString('base64');
      // const boletoConst: BoletoInterface = {
      //   data: 'data:application/pdf;base64,' + base64String,
      //   userCpf: '29004950087'
      // }
      // this.boleto.createBoleto(boletoConst)


      //TESTE - LENDO BASE64 DO BANCO E ENVIANDO VIA MENSAGEM NO WHATSAPP
      // const pdf = await this.boleto.getBoletoByID(6)
      // if (pdf?.data) {
      //   client.sendFileFromBase64(
      //     '4396753542@c.us',
      //     pdf?.data,
      //     'pdfEnviado.pdf',
      //   )
      //     .then((result) => {
      //       console.log('Resultado: ', result); //return object success
      //     })
      //     .catch((erro) => {
      //       console.error('Erro ao enviar: ', erro); //return object error
      //     });
      // }
      client.onMessage(async (message) => {
        if (!message.isGroupMsg) {
          const currentStage = getStage({ from: message.from });

          const messageResponse = await stages[currentStage].stage.exec({
            from: message.from,
            message: message.body,
            client,
          });

          if (messageResponse) {
            client.sendText(message.from, messageResponse).then(() => {
            }).catch(error => console.error('Error ao enviar mensagem: ', error));
          }
        }
      });
    }

    create('ws-bot', qr, status)
      .then((client) => start(client))
      .catch((error) => console.error(error));
  }
}
