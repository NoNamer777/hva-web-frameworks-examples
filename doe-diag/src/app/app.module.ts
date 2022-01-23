import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { YaDoeDiagramComponent } from './components/ya-doe-diagram/ya-doe-diagram.component';

@NgModule({
  declarations: [
    AppComponent,
    YaDoeDiagramComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
