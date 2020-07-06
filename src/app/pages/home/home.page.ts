import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credencias.dto';
import { AuthService } from 'src/services/auth.service';
import { HttpHeaderResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  creds : CredenciaisDTO = {
    email : "",
    senha : "",
  }

  constructor(
    public menu: MenuController, 
    public navCtrl: NavController,
    public auth: AuthService,
    ) { }

    
    ionViewWillEnter(){
      this.menu.enable(false);
    }
    
    ionViewDidLeave() {
      this.menu.enable(true);
    }

    ionViewDidEnter(){
      this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateBack('categorias');
      },
      error => {});  
    }
    
    login(){   
      this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateBack('categorias');
      },
      error => {});   
    }

    signup(){
      this.navCtrl.navigateForward('signup');
    }

}
