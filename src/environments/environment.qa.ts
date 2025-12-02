export const environment = {
  production: false,
  angularBaseUrl: 'https://qa.myapp.com',
  angularLogoutUrl: 'https://qa.myapp.com/logout',
  apiBaseUrl: 'https://qa.api.myapp.com/api',
  signalrNotificationEndpoint: '/users/notify',
  useMockSignalR: false, // Set to true for frontend-only testing
  defaultauth: 'fackbackend',
  applicationName: 'my-new-app',
  idleTimeout: {
    idle: 1200,
    timeout: 60,
  },
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  },
};