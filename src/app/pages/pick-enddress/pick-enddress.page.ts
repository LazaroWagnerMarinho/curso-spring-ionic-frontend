import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { StorageService } from 'src/services/storage.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { NavController, NavParams } from '@ionic/angular';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartService } from 'src/services/domain/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pick-enddress',
  templateUrl: './pick-enddress.page.html',
  styleUrls: ['./pick-enddress.page.scss'],
})
export class PickEnddressPage implements OnInit {

  pickEnddress: string = "Fechamento do Pedido";

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService

  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: {id: response['id']},
            enderecoDeEntrega: null,
            pagamento: null,
            items: cart.items.map(x => { return {quantidade: x.quantidade, produto: {id: x.produto.id}}})
          }
        },
        error => {
          if(error.status == 403){
            this.navCtrl.navigateBack('home');
          }
        });
    }
    else {
      this.navCtrl.navigateBack('home');
    }

  }

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: item.id}
    this.navParams.data = this.pedido;
    this.router.navigate(['payment'])
  }

}
