import { Component, Input, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Movie } from 'src/interfaces/movie';
import { MoviesPage } from '../movies.page';

@Component({
  selector: 'edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit {

  constructor() { }


  movie: Movie;
  modal: IonModal;
  new: boolean = false;
  

  ngOnInit() {
    if (!this.movie){
      this.new = true;
      this.movie = {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        rating: 0,
        releaseYear: 0,
        viewDate: null
      } as Movie;
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.movie, 'confirm');
  }

}
