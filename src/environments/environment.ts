// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  TOKEN: 'c5f7150439c23ef073b1ae67724a9762',
  HOST: 'http://localhost:8000/webservice/rest/server.php?wstoken=',

  firebaseConfig : {
    apiKey: 'AIzaSyDNOUph6LzPQ1RkXacP0JPvKWJ9dfRVsXc',
    authDomain: 'moodle-charts-ng.firebaseapp.com',
    databaseURL: 'https://moodle-charts-ng.firebaseio.com',
    projectId: 'moodle-charts-ng',
    storageBucket: 'moodle-charts-ng.appspot.com',
    messagingSenderId: '814370259348',
    appId: '1:814370259348:web:7bb909e330711f5e9b0f81',
    measurementId: 'G-0CEM4QMB6G'
  }



};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
