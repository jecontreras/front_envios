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
   //url: 'http://localhost:1336',
  // urlFront: "http://localhost:4200",
  url: "https://apienviosrapidos1-52a38e8052ee.herokuapp.com",
  urlFront: "https://enviosrrapidoscom.web.app",
  URLFILE: "https://apilokomproaqui1-9219656b6da1.herokuapp.com",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
