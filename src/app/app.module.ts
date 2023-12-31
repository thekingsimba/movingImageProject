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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CategoriesState } from './categories-store/categories.state';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './ui-elements-components/modal/modal.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

@NgModule({
  declarations: [AppComponent, ButtonComponent, VideosTableComponent, HomeComponent, AddEditVideosComponent, ModalComponent, AboutUsComponent],
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
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
