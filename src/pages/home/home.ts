import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  picture: any;
  print: string;
  images: any[] = [];
  show = true;
  comments: string[] = [];
  date: Date[] = [];
  d: Date[] = [];
  constructor(
    public navCtrl: NavController,
    private file: File,
    private imagePicker: ImagePicker,
    private storage: Storage,
   ) {
    for (let index = 0; index < 4; index++) {
      this.d.push(new Date());      
    }
  }

  library() {
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
          this.images.push(res);
          this.comments.push(''); 
          this.date.push(new Date());
          this.show = false;
        })
        });
      },
      err => console.log('ups')
    );
  }

  save(name: string) {
    this.show = true;
    this.date.forEach(element => {
      console.log('DATE: ' + element);
    });
    this.storage.set(name, [this.images, this.comments, this.date]);
    this.images = [];
  }
}
