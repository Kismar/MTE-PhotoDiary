import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AlbumsPage } from '../pages/albums/albums';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from '@ionic-native/camera';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Diagnostic } from '@ionic-native/diagnostic';
import { File } from '@ionic-native/file';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { ImagePicker } from '@ionic-native/image-picker';
import { IonicStorageModule } from '@ionic/storage';
import { AlbumPage } from '../pages/album/album';
import { Dialogs } from '@ionic-native/dialogs';
import { DetailPage } from '../pages/detail/detail';
import { SocialSharing } from '@ionic-native/social-sharing';
import { RandomImageServiceProvider } from '../providers/random-image-service/random-image-service';
import { FileTransfer } from '@ionic-native/file-transfer';
import { HttpClientModule } from '@angular/common/http'
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    AlbumsPage,
    AlbumPage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    AlbumsPage,
    AlbumPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AndroidPermissions,
    Diagnostic,
    File,
    PhotoLibrary,
    ImagePicker,
    Dialogs,
    SocialSharing,
    FileTransfer,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RandomImageServiceProvider
  ]
})
export class AppModule {}
