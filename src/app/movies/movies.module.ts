import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesPageRoutingModule } from './movies-routing.module';

import { MoviesPage } from './movies.page';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { StorageService } from 'src/services/storage.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { MovieViewComponent } from './movie-view/movie-view.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoviesPageRoutingModule,
  ],
  declarations: [MoviesPage, EditMovieComponent, MovieViewComponent],
  providers: []
})
export class MoviesPageModule {}
