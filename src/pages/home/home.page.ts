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
    public NavCtrl: NavController,
    public auth: AuthService) { }

    login(){   
      this.auth.authenticate(this.creds)
      .subscribe(response => {
        console.log(response.headers.get('Authorization'));
        this.NavCtrl.navigateBack('categorias');
      },
      error => {});   
    }

 ionViewWillEnter(){
   this.menu.swipeGesture(false);
 }

}
