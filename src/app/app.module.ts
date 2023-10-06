import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './ui-elements-components/button/button.component';
import { VideosTableComponent } from './ui-elements-components/videos-table/videos-table.component';
import { HomeComponent } from './pages/home/home.component';
import { AddEditVideosComponent } from './pages/add-edit-videos/add-edit-videos.component';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';

import { ToastrModule } from 'ngx-toastr';
import { CategoriesState } from './categories-store/categories.state';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ButtonComponent, VideosTableComponent, HomeComponent, AddEditVideosComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxsModule.forRoot([
      CategoriesState
    ]),
    NgxsStoragePluginModule.forRoot({
      key: [
        'categories'
      ]
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
