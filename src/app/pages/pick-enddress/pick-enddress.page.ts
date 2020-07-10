import { Component, OnInit } from '@angular/core';
import { EnderecoDTO } from 'src/models/endereco.dto';

@Component({
  selector: 'app-pick-enddress',
  templateUrl: './pick-enddress.page.html',
  styleUrls: ['./pick-enddress.page.scss'],
})
export class PickEnddressPage implements OnInit {

  pickEnddress: string = "Fechamento do Pedido";

  items: EnderecoDTO[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua Quinze de Novembro",
        numero: "300",
        complemento: "Apto 200",
        bairro: "Santa Mônica",
        cep: "48293822",
        cidade: {
          id: "1",
          nome: "Uberlândia",
          estado: {
            id: "1",
            nome: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua Alexandre Toledo da Silva",
        numero: "405",
        complemento: null,
        bairro: "Centro",
        cep: "88933822",
        cidade: {
          id: "3",
          nome: "São Paulo",
          estado: {
            id: "2",
            nome: "São Paulo"
          }
        }
      }
    ];
  }

}
