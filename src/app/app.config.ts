import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode,provideAppInitializer, } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { authFeature } from './core/store/features/auth.feature';
import { signalrFeature } from './core/store/features/signalr.feature';
import { appMenuFeature } from './core/store/features/app.feature';
import * as AuthEffects from './core/store/effects/auth.effects';
import * as SignalREffects from './core/store/effects/signalr.effects';
import * as UsersEffects from './features/admin/users/store/effects/users.effects';
import * as AppEffects from './core/store/effects/app.effects';
import * as ToastEffects from './core/store/effects/toast.effects';
import { routes } from './app.routes';
import { appInitializer } from '../app-initializer';
import { usersFeature } from './features/admin/users/store/features/users.feature';

const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{slate.50}',
      100: '{slate.100}',
      200: '{slate.200}',
      300: '{slate.300}',
      400: '{slate.400}',
      500: '{slate.500}',
      600: '{slate.600}',
      700: '{slate.700}',
      800: '{slate.800}',
      900: '{slate.900}',
      950: '{slate.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{slate.950}',
          inverseColor: '#ffffff',
          hoverColor: '{slate.900}',
          activeColor: '{slate.800}',
        },
        highlight: {
          background: '{slate.950}',
          focusBackground: '{slate.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{slate.50}',
          inverseColor: '{slate.950}',
          hoverColor: '{slate.100}',
          activeColor: '{slate.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(appInitializer),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(routes),
    MessageService,
    provideStore(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionTypeUniqueness: true,
          strictActionWithinNgZone: true,
        },
      },
    ),
    providePrimeNG({
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: 'html.dark',
        },
      },
      zIndex: {
        modal: 1100, // dialog, sidebar
        overlay: 1200, // dropdown, overlaypanel
        menu: 1000, // overlay menus
        tooltip: 1100, // tooltip
      },
    }),
    provideState(authFeature),
    provideState(signalrFeature),
    provideState(usersFeature),
    provideState(appMenuFeature),
    provideEffects([AuthEffects, SignalREffects, UsersEffects, AppEffects, ToastEffects]),
    provideEventPlugins(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
