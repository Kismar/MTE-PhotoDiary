import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Dialogs } from '@ionic-native/dialogs';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { DetailPage } from '../detail/detail';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the AlbumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
export class AlbumPage {

  photos: any[] = [];
  key: string;
  comments: string[] = [];
  data: Date[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private dialog: Dialogs,
    private imagePicker: ImagePicker,
    private file: File,
    private camera: Camera
    ) {
  }
  ionViewDidEnter() {
    this.key = this.navParams.get('key');
    this.storage.get(this.key).then(p => {
      this.photos = p[0];
      this.comments = p[1];
      this.data = p[2];
      this.data.forEach(element => {
        console.log('qwert:' + element);
      });
    })
  }

  private openDetail(im: any) {
    let tempComent: string;
    let tempDate: Date;
    for (let index = 0; index < this.photos.length; index++) {
      const element = this.photos[index];
      if (element == im) {
        tempComent = this.comments[index];
        tempDate = this.data[index]
      }
    }
    this.navCtrl.push(DetailPage, {key: this.key, image: im, comment: tempComent, date: tempDate}).then(r => {
      console.log('qwert: ' + r);
    }, 
    error => {
      console.log('Error: ' + error)
    }).catch(e => {
      console.log('qwert Ex: ' + e);
    })
  }

  private deleteItem(image: any) {
    let tempP: any[] = [];
    let tempU: any[] = [];
    for (let index = 0; index < this.photos.length; index++) {
      const element = this.photos[index];
      const el = this.comments[index];
      if (element != image) {
        tempP.push(element);
        tempU.push(el)
      }
    }
    this.photos = tempP;
    this.comments = tempU;
    this.storage.set(this.key, [this.photos, this.comments]);
  }

  dialogOpen(image: any) {
    this.dialog.confirm('Choose option','Image',['Detail','Delete']).then(v => {
      if (v == 1) {
        this.openDetail(image);
      }
      if (v == 2) {
        this.deleteItem(image);
      }
    })
  }

  private addFromGallery() {
    let options = {
      maximumImagesCount: 8,
      width: 500,
      height: 500,
      quality: 75
    };

    this.imagePicker.getPictures(options).then(
      file_uris =>  {
        file_uris.forEach(element => {
          let fileName = element.substring(element.lastIndexOf('/')+1);
          let path = element.substring(0, element.lastIndexOf('/')+1);
          this.file.readAsDataURL(path, fileName).then( res => {
          this.photos.push(res);
          this.comments.push('');
          this.data.push(new Date());
          this.storage.set(this.key, [this.photos, this.comments, this.data]);
        })
        });
      },
      err => console.log('ups')
    ); 
  }

  private addViaCamera() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 600,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      allowEdit: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
      let fileName = imageData.substring(imageData.lastIndexOf('/')+1);
      let path = imageData.substring(0, imageData.lastIndexOf('/')+1);
      this.file.readAsDataURL(path, fileName).then( res => {
      this.photos.push(res);
      this.comments.push('');
      this.data.push(new Date());
      this.storage.set(this.key, [this.photos, this.comments, this.data]);    
    })
    }, (err) => {
     console.log("error");
    });
  }

  addItem() {

    this.dialog.confirm('From which source.', 'Add note', ['Camera', 'Gallery']).then(v => {
      if (v == 1) {
        this.addViaCamera();
      }
      if (v == 2) {
        this.addFromGallery();
      }
    })


  }
}
