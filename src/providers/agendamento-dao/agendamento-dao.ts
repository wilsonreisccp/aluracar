import { Injectable  } from '@angular/core';
import { Agendamento } from '../../modelos/agendamento';
import { Observable  } from 'rxjs/Observable';
import { Storage     } from '@ionic/storage';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storag: Storage) {
    
  }

  private _geraChave(agendamento: Agendamento){
    return agendamento.emailCliente + agendamento.data.substr(0,10);
  }

  salva(agendamento: Agendamento){
    let chave   = this._geraChave(agendamento);
    let promise = this._storag.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }
  
  ehDuplicado(agendamento: Agendamento){
    let chave   = this._geraChave(agendamento);
    let promise = this._storag.get(chave)
                              .then(dado => dado ? true : false);
    return Observable.fromPromise(promise);

  }



}
