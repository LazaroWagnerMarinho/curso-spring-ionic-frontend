import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credencias.dto';

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
    public NavCtrl: NavController) { }

 login(){   
   console.log(this.creds);
   this.NavCtrl.navigateBack('categorias');
 }

 ionViewWillEnter(){
   this.menu.swipeGesture(false);
 }

}
