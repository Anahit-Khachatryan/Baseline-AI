export const environment = {
  production: true,
  angularBaseUrl: 'https://myapp.com',
  angularLogoutUrl: 'https://myapp.com/logout',
  apiBaseUrl: 'https://api.myapp.com/api',
  signalrNotificationEndpoint: '/users/notify',
  useMockSignalR: false, // Always false in production
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