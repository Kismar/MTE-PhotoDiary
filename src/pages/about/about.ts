import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RandomImageServiceProvider } from '../../providers/random-image-service/random-image-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  randomPicture: any;
  constructor(
    public navCtrl: NavController,
    private randomImageProvider: RandomImageServiceProvider) {

  }

  setRandomPicture() {
    this.randomImageProvider.getImageUrl().subscribe(r => {
      this.randomPicture = r.url;
    })
  }

}
