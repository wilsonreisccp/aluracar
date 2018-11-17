import { Injectable  } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Agendamento } from '../../modelos/agendamento';

@Injectable()
export class AgendamentosServiceProvider {

  private _url = 'http://192.168.0.106:8080/api'

  constructor(private _http: HttpClient) {
  }

  agenda(agendamento: Agendamento){
    return this._http.post(this._url+'/agendamento/agenda', agendamento)
                     .do(() => agendamento.enviado = true)
                     ._catch((err) => Observable.of(new Error('Falha no Agendamento!')));
  }

}
