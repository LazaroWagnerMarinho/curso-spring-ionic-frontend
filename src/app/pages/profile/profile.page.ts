import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { API_CONFIG } from 'src/config/api.config';
import { PhotoService } from 'src/services/photo.service';
import { CameraPhoto } from '@capacitor/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: string = "Profile";
  
  cliente: ClienteDTO;
  picture: any;
  cameraOn: boolean = false;
  

  constructor(
    public navCtrl: NavController,
    public storage: StorageService,
    public clienteService: ClienteService,
    public photoService: PhotoService,

  ) { 
    this.picture = false;
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

  sendPicture(){
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.loadData();
      },
      error => {

      });
  }

  cancel(){
    this.picture = null;
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
    this.picture = this.photoService.photos;
  }

}
