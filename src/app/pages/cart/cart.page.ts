import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/models/cart-item';
import { API_CONFIG } from 'src/config/api.config';
import { ProdutoService } from 'src/services/domain/produto.service';
import { CartService } from 'src/services/domain/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartTitulo: string = "Carrinho de Compras";
  items: CartItem[];

  constructor(
    public cartService: CartService,
    public produtoService: ProdutoService,
  ) { }

  ngOnInit() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls(){
    for ( var i=0; i<this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe( response => {
          item.produto.imageUrl =  `${API_CONFIG.bucketbaseUrl}/prod${item.produto.id}-small.jpg`
        },
    error => {});
    }
  }

}
