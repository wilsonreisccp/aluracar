import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Agendamento                 } from '../../modelos/agendamento';
import { AgendamentoDaoProvider      } from '../../providers/agendamento-dao/agendamento-dao';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {
  agendamentos: Agendamento[];
  private _alert;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _agendamentoService: AgendamentosServiceProvider,
              private _agendamentoDao: AgendamentoDaoProvider,
              private _alertCtrl: AlertController) {
  }

  ionViewDidLoad(){
    this._agendamentoDao.listaTodos()
        .subscribe(
          (agendamentos: Agendamento []) => {
            this.agendamentos = agendamentos;
          }
        )
  }

  reenvia(agendamento: Agendamento){
    this._alert = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK' }
      ]
    });

    let mensagem = '';

    this._agendamentoService.agenda(agendamento)             
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
          () => { mensagem = 'Agendamento Reenviado!!!'; },
          (err: Error) => mensagem = err.message
        );
  }

}
