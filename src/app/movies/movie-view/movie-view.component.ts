import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Movie } from 'src/interfaces/movie';

@Component({
  selector: 'movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss'],
})
export class MovieViewComponent implements OnInit {

  @Input() movie: Movie;
  @Output() deleteMovie = new EventEmitter<string>();

  constructor(private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    console.log(this.movie)
  }

  delete(){
    this.deleteMovie.emit();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Delete Movie',
      subHeader: 'Are you sure you want to delete ' + this.movie.name,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    if (result.data.action == 'delete')
      this.delete();
  }

}
