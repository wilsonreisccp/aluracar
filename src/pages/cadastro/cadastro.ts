import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { HomePage                    } from '../home/home';
import { Carro                       } from '../../modelos/carro';
import { Agendamento                 } from '../../modelos/agendamento';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  public carro     : Carro;
  public precoTotal: number;

  public nome    : string = '';
  public endereco: string = '';
  public email   : string = '';
  public data    : string = new Date().toISOString();
  private _alert : Alert;

  constructor(public navCtrl: NavController, 
    public  navParams          : NavParams, 
    private _alertCtrl         : AlertController,
    private _agendamentoService: AgendamentosServiceProvider,
    private _agendamentoDao    : AgendamentoDaoProvider) {
      
      this.carro      = this.navParams.get("carroSelecionado");
      this.precoTotal = this.navParams.get("precoTotal");
  }

  agenda(){
    if(!this.nome || !this.endereco || !this.email) {
      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Preencha todos os campos',
        buttons: [
          { text: 'ok'}
        ]
      }).present();
      return;
    }

    let agendamento: Agendamento = {
      nomeCliente    : this.nome, 
      enderecoCliente: this.endereco,
      emailCliente   : this.email,
      modeloCliente  : this.carro.nome,
      precoTotal     : this.precoTotal,
      confirmado     : false,
      enviado        : false,
      data           : this.data
    };

    this._alert = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { 
          text: 'OK',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });

    let mensagem = '';

    this._agendamentoDao
        .ehDuplicado(agendamento)
        .mergeMap(ehDuplicado => {
          if(ehDuplicado){
            throw new Error('Agendamento Existente!!');
          }
          return this._agendamentoService.agenda(agendamento);
        })                
        .mergeMap(
          (valor) => {
            let observable = this._agendamentoDao.salva(agendamento);
            if (valor instanceof Error){
              throw valor;
            }
            return observable;
          }
        )
        .finally(
          () => { this._alert.setSubTitle(mensagem);
                  this._alert.present();
                }
        )
        .subscribe(
          () => { mensagem = 'Agendamento Realizado!!!'; },
          (err: Error) => mensagem = err.message
        );
  }

  
}
