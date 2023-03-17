import { SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


export const environment = {
  socketConfig: config,
  production: true,
  urlSocket: "http://localhost:3000",
  url: "https://enviosrapidosapi.herokuapp.com",
  urlFront: "https://enviosrrapidoscom.web.app",
  URLFILE: "https://lokomproaqui.herokuapp.com",
};
