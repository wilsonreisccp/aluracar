import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = 'joao@alura.com.br';
  senha: string = 'alura123';


  constructor(public navCtrl         : NavController, 
              public navParams       : NavParams,
              private _usuarioService: UsuariosServiceProvider,
              private _alertCtrl     : AlertController) {
  }

  efetuaLogin(){
    console.log(this.email);
    console.log(this.senha);

    this._usuarioService
        .efetuaLogin(this.email, this.senha)
        .subscribe(
          (usuario: Usuario) => {
            console.log(usuario);
            this.navCtrl.setRoot(HomePage);
          },
          () => {
            this._alertCtrl.create({
              title   : 'Falha no login',
              subTitle: 'Email ou senha incorretos! Verifique!',
              buttons : [
                { text: 'Ok'}
              ]
            }).present();

          }
        )

    this.navCtrl.setRoot(HomePage);
  }

}
