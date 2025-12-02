export const environment = {
  production: false,
  angularBaseUrl: 'http://localhost:4200',
  angularLogoutUrl: 'http://localhost:4200/logout',
  apiBaseUrl: 'http://localhost:5000/api',
  signalrNotificationEndpoint: '/users/notify',
  // Set to true to use mock SignalR service (for frontend testing without backend)
  useMockSignalR: true,
  defaultauth: 'fackbackend',
  applicationName: 'my-new-app',
  idleTimeout: {
    idle: 1200, // 20 minutes (1200 seconds)
    timeout: 60, // 60 seconds warning
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