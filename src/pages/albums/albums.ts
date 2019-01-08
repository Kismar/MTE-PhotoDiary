import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlbumPage } from '../album/album';
import { Dialogs } from '@ionic-native/dialogs';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the AlbumsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-albums',
  templateUrl: 'albums.html',
})
export class AlbumsPage {

  albums: any[] = [];
  currentKey: string;
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private dialog: Dialogs,
    private sharing: SocialSharing
    ) {
  }

  ionViewDidLoad() {
    this.storage.keys().then(val => {
      this.albums = val; 
    });
  }

  share() {
    this.storage.get(this.currentKey).then(v => {
      let images = v[0];
      let comments = v[1];
      for (let index = 0; index < images.length; index++) {
        const element = images[index];
        const el = comments[index];
        this.sharing.shareViaWhatsApp(el, element);
      }
    })
  }

  openCurrent() {
    this.navCtrl.push(AlbumPage, {key: this.currentKey});
  }

  setCurrent(key: string) {
    this.currentKey = key;
  }

  deleteCurrent() {
    this.storage.remove(this.currentKey);
  }

  openDialog(key: string) {
    this.setCurrent(key);
    this.dialog.confirm('Choose option', this.currentKey, ['Open','Delete']).then(v => {
      if (v == 1) {
        this.openCurrent();
      }
      if (v == 2) {
        this.deleteCurrent();
      }
    })
  }

}
