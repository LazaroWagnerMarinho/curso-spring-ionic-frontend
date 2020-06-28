import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public menu: MenuController, 
    public NavCtrl: NavController) { }

 login(){   
   this.NavCtrl.navigateBack('categorias');
 }

 ionViewWillEnter(){
   this.menu.swipeGesture(false);
 }

}
