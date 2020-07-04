import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: string = "Profile"

  cliente: ClienteDTO;
  // email: string;

  constructor(
    public navCtrl: NavController,
    // public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if( localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
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

}
