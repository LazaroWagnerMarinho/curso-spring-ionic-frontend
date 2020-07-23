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

  items : ProdutoDTO[] = [];
  loader: HTMLIonLoadingElement;
  isLoading = false;
  page: number = 0;

  constructor(
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public navCtrl: NavController,
    public loadngCtrl: LoadingService,
  ) { }

  async ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.loader = null;
    let categoria_id:any = this.navParams.data
    this.loadngCtrl.present();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        console.log(this.page);
        console.log(this.items);
        this.loadImageUrls(start, end);
        this.loadngCtrl.dismiss();
      },
      error => {
        this.loadngCtrl.dismiss();
      });
  }

  loadImageUrls(start: number, end: number){
    for (var i=start; i < end; i++){
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
  

  doRefresh(event) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  ionInfinite(event) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
