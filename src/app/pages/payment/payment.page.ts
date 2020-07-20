import { Component, OnInit } from '@angular/core';
import { PedidoDTO } from 'src/models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular'; 


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pedido: any;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
  ) {

    this.pedido = this.navParams.data;
    

    this.formGroup = this.formBuilder.group({
      "@type": ["pagamentoComCartao", Validators.required],
      numeroDeParcelas: [1, Validators.required],
    })
   }

  ngOnInit() {
  }

  nextPage(){
    this.pedido.pagamento = this.formGroup.value;
    console.log(this.pedido);
  }

}
