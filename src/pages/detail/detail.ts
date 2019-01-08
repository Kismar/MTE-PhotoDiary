import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  key: string;
  originalImage: any;
  metadata: any;
  temp: any;
  comment: any;
  date: Date;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private shareing: SocialSharing
    ) {
      
  }

  ionViewDidLoad() {
    this.key = this.navParams.get('key');
    this.originalImage = this.navParams.get('image');
    this.comment = this.navParams.get('comment');
    this.date = this.navParams.get('date');
  }

  save(description: string) {
    let tempImages: any[];
    let tempComments: string[];
    let tempDate: Date[];
    this.storage.get(this.key).then(r => {
      tempImages = r[0];
      tempComments = r[1];
      tempDate = r[2];
      for (let index = 0; index < tempImages.length; index++) {
        const element = tempImages[index];
        if (element == this.originalImage) {
          tempComments[index] = description;
          tempDate[index] = this.date;
        }
      }
      this.storage.set(this.key, [tempImages, tempComments, tempDate]).then(() => {
        this.navCtrl.pop();
      });
    })
  }

  share(message: string) {
    this.shareing.share(message, '', this.originalImage)
  }
}
