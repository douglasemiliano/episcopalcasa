import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideAnimations } from '@angular/platform-browser/animations';

// Registra os dados de localização para pt-BR
registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideClientHydration(), 
    provideHttpClient(withFetch()), 
    provideAnimations(),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'pt-BR' }, // Locale configurado para Brasil
    { provide: 'DEFAULT_TIMEZONE', useValue: 'America/Recife' }, // Fuso horário padrão
    DatePipe]
};
