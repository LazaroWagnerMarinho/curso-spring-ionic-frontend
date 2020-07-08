import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { ProdutoService } from 'src/services/domain/produto.service';
import { NavParams } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  produtoDetail : string = "Detalhe do Produto";

  item: ProdutoDTO;

  constructor(
    public navParams: NavParams,
    public produtoService: ProdutoService,
  ) { }

  ngOnInit() {

      let produto_id:any = this.navParams.data;
      this.produtoService.findById(produto_id)
        .subscribe(response => {
          this.item = response;
          this.getImageUrlIfExists();
        },
        error => {});
  }

  getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketbaseUrl}/prod${this.item.id}.jpg`;
      })
  }

}
