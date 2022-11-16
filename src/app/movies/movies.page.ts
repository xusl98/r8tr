import { Component, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { subscribeOn } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';
import { Movie } from '../../interfaces/movie';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { MovieViewComponent } from './movie-view/movie-view.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  providers: [StorageService]
})
export class MoviesPage implements OnInit {


  movies: Movie[] = [];

  currentMovie: Movie = null;

  @ViewChild(IonModal) modal: IonModal;

  constructor(private modalCtrl: ModalController, private storageService: StorageService) { }

  async ngOnInit() {
    this.storageService.get('movies').subscribe(data => {
      this.movies = !data ? [] : data as Movie[];
    });
    // this.movies = !movies ? [] : movies as Movie[];
  }





  async openEditModal() {
    const modal = await this.modalCtrl.create({
      component: EditMovieComponent,
      componentProps: {
        movie: this.currentMovie,
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data)
      var movie = this.movies.find(movie => movie.id == data.id);
      if (!movie)
        this.movies.push(data as Movie);
      else
        movie = data as Movie;
      this.storageService.set('movies', this.movies);

      // this.name = data;
    }
  }

  viewMovie(id: string) {
    this.currentMovie = this.movies.find(movie => movie.id == id);
  }

  cancel() {
    this.currentMovie = null;
  }

  deleteMovie() {
    const index = this.movies.indexOf(this.currentMovie);
    if (index > -1) {
      this.movies.splice(index, 1);
    }
    this.currentMovie = null;
    this.storageService.set('movies', this.movies);
  }


  // async openViewModal(id: string){
  //   const modal = await this.modalCtrl.create({
  //     component: MovieViewComponent,
  //     componentProps:{
  //       movie: this.movies.find(movie => movie.id == id)
  //     }
  //   });
  //   modal.present();

  //   const { data, role } = await modal.onWillDismiss();

  //   if (role === 'confirm') {
  //     console.log(data)

  //     // this.name = data;
  //   }
  // }

  // onRatingChange(event) {
  //   console.log(event)
  // }


}
