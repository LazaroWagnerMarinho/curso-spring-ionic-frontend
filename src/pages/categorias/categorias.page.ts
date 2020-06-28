import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CategoriaService } from 'src/services/domain/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(
    public menu: MenuController,
    public NavCtrl: NavController,
    public categoriaService: CategoriaService) {

     }

  ngOnInit() {
    this.categoriaService.findAll()
    .subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

  openFirst() {
    this.menu.enable(false, 'first');
    this.menu.open('first');
  }

  // ionViewWillEnter(){
  //   this.menu.swipeGesture(false);
  // }

  // ionViewDidLeave(){
  //   this.menu.swipeGesture(false);
  // }

  home(){
   
    this.NavCtrl.navigateBack('home');
 
  }

}
