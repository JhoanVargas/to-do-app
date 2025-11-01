// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { initializeApp } from 'firebase/app';
import { getRemoteConfig } from 'firebase/remote-config';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: 'REMOTE_CONFIG',
      useFactory: () => {
        const app = initializeApp(environment.firebase);
        const rc = getRemoteConfig(app);
        rc.settings = {
          minimumFetchIntervalMillis: 1000,
          fetchTimeoutMillis: 1000,
        };
        return rc;
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
