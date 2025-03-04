import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { API_CONFIG } from 'src/config/api.config';
import { PhotoService } from 'src/services/photo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingService } from 'src/services/domain/loading.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: string = "Profile";
  
  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;
  

  constructor(
    public navCtrl: NavController,
    public storage: StorageService,
    public clienteService: ClienteService,
    public loadngCtrl: LoadingService,
    public photoService: PhotoService,
    public camera: Camera,

  ) { 
    // this.picture = false;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){

    let localUser = this.storage.getLocalUser();
    if( localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExists();
        },
        error => {
          if(error.status == 403){
            this.navCtrl.navigateBack('home');
          }
        });
    }
    else {
      this.navCtrl.navigateBack('home');
    }

  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe( response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketbaseUrl}/cp${this.cliente.id}.jpg`;
      },
      error => {});
  }


  getCameraPicture(){

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.loadngCtrl.present();
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
     this.loadngCtrl.dismiss();
    }, (err) => {
      this.cameraOn = false;
      this.loadngCtrl.dismiss();
    });

  }

  getGalleryPicture(){

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.loadngCtrl.present();
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
     this.loadngCtrl.dismiss();
    }, (err) => {
      this.cameraOn = false;
      this.loadngCtrl.dismiss();
    });

  }

  sendPicture(){
    this.loadngCtrl.present();
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.loadData();
        this.loadngCtrl.dismiss();
      },
      error => {
        this.loadngCtrl.dismiss();
      });
  }

  cancel(){
    this.picture = null;
  }

}
