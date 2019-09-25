import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { urlConfigProvider, ConfigService } from './services/config/config.service';
import { ApiClientService } from './services/api-client/api-client.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: urlConfigProvider,
      multi: true,
      deps: [ApiClientService, ConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
