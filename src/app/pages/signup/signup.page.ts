import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { CidadeService } from 'src/services/domain/cidade.service';
import { EstadoService } from 'src/services/domain/estado.service';
import { EstadoDTO } from 'src/models/estado.dto';
import { CidadeDTO } from 'src/models/cidade.dto';
import { ClienteService } from 'src/services/domain/cliente.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public formBuilder:FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public cliente: ClienteService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        nome: ['Lázaro', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['lazarowagner@gmail.com', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
        cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['123', [Validators.required]],
        logradouro : ['Rua Via', [Validators.required]],
        numero : ['25', [Validators.required]],
        complemento : ['Apto 3', []],
        bairro : ['Copacabana', []],
        cep : ['10828333', [Validators.required]],
        telefone1 : ['977261827', [Validators.required]],
        telefone2 : ['', []],
        telefone3 : ['', []],
        estadoId : [1, [Validators.required]],
        cidadeId : [null, [Validators.required]] 
      });
    }

    ionViewDidEnter(){
      this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});
    }

    updateCidades() {
      let estado_id = this.formGroup.value.estadoId;
      this.cidadeService.findAll(estado_id)
        .subscribe(response => {
          this.cidades = response;
          this.formGroup.controls.cidadeId.setValue(null);
        },
        error => {});
    }

  ngOnInit() {
  }

  signupUser(){
    this.cliente.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {})
  }

  async showInsertOk(){
    const alert = await this.alertCtrl.create({
      header: 'Sucesso!',      
      message: 'Cadastro efetuado com sucesso',
      backdropDismiss: false,
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    await alert.present();
  }

  // async handleDefault(errorObj){
  //   const alert = await this.alertCtrl.create({
  //       cssClass: 'my-custom-class',
  //       header: `Erro ${errorObj.status}:`,
  //       subHeader: errorObj.error,
  //       message: errorObj.message,
  //       backdropDismiss: false,
  //       buttons: ['OK']
  //   });
  //   await alert.present();
    
  // }


}
