import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './ui-elements-components/button/button.component';
import { VideosTableComponent } from './ui-elements-components/videos-table/videos-table.component';
import { HomeComponent } from './pages/home/home.component';
import { AddEditVideosComponent } from './pages/add-edit-videos/add-edit-videos.component';

@NgModule({
  declarations: [AppComponent, ButtonComponent, VideosTableComponent, HomeComponent, AddEditVideosComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
