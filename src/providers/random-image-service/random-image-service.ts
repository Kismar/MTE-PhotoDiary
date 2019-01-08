import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ResponsePicture } from '../../object/response-picture';
import { File } from '@ionic-native/file';
declare var cordova:any;

/*
  Generated class for the RandomImageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RandomImageServiceProvider {

  constructor(
    public http: HttpClient) {
  }


  getImageUrl(): Observable<ResponsePicture>{
    return this.http.get<ResponsePicture>('http://www.splashbase.co/api/v1/images/random');
  }
}
