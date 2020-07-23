import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { NavParams, NavController } from '@ionic/angular';
import { ProdutoService } from 'src/services/domain/produto.service';
import { API_CONFIG } from 'src/config/api.config';
import { LoadingController } from '@ionic/angular';
import { LoadingService } from 'src/services/domain/loading.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items : ProdutoDTO[];
  loader: HTMLIonLoadingElement;
  isLoading = false;

  constructor(
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public navCtrl: NavController,
    public loadngCtrl: LoadingService,
  ) { }

  async ngOnInit() {
    this.loader = null;
    let categoria_id:any = this.navParams.data
    this.loadngCtrl.present();
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
        this.loadngCtrl.dismiss();
      },
      error => {
        this.loadngCtrl.dismiss();
      });
  }

  loadImageUrls(){
    for (var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketbaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }

  showDetail(produto_id:any){

    this.navParams.data = produto_id;
    this.navCtrl.navigateForward('produto-detail')
  }  
}
