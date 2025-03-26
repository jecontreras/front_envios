import { SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


export const environment = {
  socketConfig: config,
  production: true,
  urlSocket: "http://localhost:3000",
  url : "https://apienviosrapidos1-52a38e8052ee.herokuapp.com",
  //url: "https://apienviosrapidos-ce1b900c1c5b.herokuapp.com",
  urlFront: "https://enviosrrapidoscom.web.app",
  URLFILE: "https://apilokomproaqui1-9219656b6da1.herokuapp.com",
};
