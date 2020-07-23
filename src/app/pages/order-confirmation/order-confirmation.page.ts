import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from '@ionic/angular';
import { PedidoDTO } from 'src/models/pedido.dto';
import { CartItem } from 'src/models/cart-item';
import { CartService } from 'src/services/domain/cart.service';
import { ClienteDTO } from 'src/models/cliente.dto';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { ClienteService } from 'src/services/domain/cliente.service';
import { PedidoService } from 'src/services/domain/pedido.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  ordeConfimation: string = 'Confira seu pedido';
  ordeRegistrado: string = 'Pedido registrado';

  pedido: any;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codPedido: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService,    
  ) { 

    this.pedido = this.navParams.data;

  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      },
      error => {
        this.navCtrl.navigateForward('home')
      })
  }


  private findEndereco(id: string, list: EnderecoDTO[]) : EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total()  : number{
    return this.cartService.total();
  }

  back(){
    this.navCtrl.navigateRoot('cartPage')
  }

  home(){
    this.navCtrl.navigateRoot('home')
  }

  checkout(){
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.creatOrClearCart();
        this.codPedido = this.extractId(response.headers.get('location'));
      },
      error => {
        if(error.status == 403){
          this.navCtrl.navigateRoot('home');
        }
      })
  }

  private extractId(location: string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}
