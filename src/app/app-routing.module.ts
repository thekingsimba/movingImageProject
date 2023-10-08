import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddEditVideosComponent } from './pages/add-edit-videos/add-edit-videos.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

const routes: Routes = [

  {
    path: 'add-edit-videos/:purpose/:authorId/:videoId',
    component: AddEditVideosComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
