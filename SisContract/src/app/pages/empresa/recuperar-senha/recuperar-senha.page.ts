import { Component, OnInit } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

import { EmpresaService } from 'src/app/services/empresafb.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {

  constructor( private _route : Router,
    private activatedRoute: ActivatedRoute, 
    public menuCtrl: MenuController,
    private _auth : Auth,
    private _empresaFBS : EmpresaService,
    private alertController: AlertController,
    private formBuilder : FormBuilder,private myApp:AppComponent) { }
    auth = getAuth();
    form_recover:FormGroup;

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.form_recover = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    })
  }
  isSubmitted: boolean
  submitForm(){
    this.isSubmitted = true;
    if(!this.form_recover.valid){
      this.presentAlert('SisContract', 'Error', 'Todos os campos são Obrigatórios!');
      return false;
    }else{
      //this.docTamanho();
      this.recover();
      //this.authLogin();
    }
  }

  get errorControl(){
    return this.form_recover.controls;
  }
  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  private recover(){
    this._empresaFBS.recoverPassword(this.form_recover.value)
    .then(() => {
        this.presentAlert('Redefinir Senha', 'Redefinido!', 'Verifique seu email!')
        this.myApp.tipoUser("j");
        this._route.navigate(['/home'])
    })
    .catch((error) => {
          this.presentAlert('Redefinir Senha', 'ERRO!', error)
      // ..
    });
  }


}
