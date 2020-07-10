import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';
import { StorageService } from 'src/services/storage.service';
import { ClienteService } from 'src/services/domain/cliente.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pick-enddress',
  templateUrl: './pick-enddress.page.html',
  styleUrls: ['./pick-enddress.page.scss'],
})
export class PickEnddressPage implements OnInit {

  pickEnddress: string = "Fechamento do Pedido";

  items: EnderecoDTO[];

  constructor(
    public navCtrl: NavController,
    public storage: StorageService,
    public clienteService: ClienteService,

  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];
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

}
