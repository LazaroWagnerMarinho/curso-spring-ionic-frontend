import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, NavParams } from '@ionic/angular';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  categoria: string = 'Categorias';

  

  bucketUrl: string = API_CONFIG.bucketbaseUrl;

  items: CategoriaDTO[];

  constructor(
    public menu: MenuController,
    public NavCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService) {

     }

  ngOnInit() {
    this.categoriaService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {});
  }

  openFirst() {
    this.menu.enable(false, 'first');
    this.menu.open('first');
  }

  home(){
   
    this.NavCtrl.navigateBack('home');
 
  }

  showProdutos(categoria_id){
    this.navParams.data = categoria_id;
    this.NavCtrl.navigateForward('produtos');
    
  }

}
