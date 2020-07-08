import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from 'src/models/produto.dto';
import { NavParams } from '@ionic/angular';
import { ProdutoService } from 'src/services/domain/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  items : ProdutoDTO[];

  constructor(
    public navParams: NavParams,
    public produtoService: ProdutoService,
  ) { }

  ngOnInit() {
    let categoria_id:any = this.navParams.data
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
      },
      error => {});
  }
}
