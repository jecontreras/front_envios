// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

export const environment = {
  production: false,
  urlSocket: "http://localhost:3000",
  socketConfig: config,
  //url: "https://backpublihazclick.herokuapp.com",
<<<<<<< HEAD
  url: 'http://localhost:9000',
  urlFront: "http://localhost:4200",
=======
  // url: 'http://localhost:1337',
  // urlFront: "http://localhost:4200",
  url: "https://apienviosrapidos-ce1b900c1c5b.herokuapp.com",
  urlFront: "https://enviosrrapidoscom.web.app",
>>>>>>> bfeef1d85afca89e72ee21ba58dde83ba6d586f7
  URLFILE: "https://apilokomprojs-7681dc4951e1.herokuapp.com",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
