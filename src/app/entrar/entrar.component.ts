import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertaService } from '../service/alerta.service';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

    userLogin: UserLogin = new UserLogin ()

  constructor(
    private auth: AuthService,
    private router: Router,
    private alerta: AlertaService

  ) { }

  ngOnInit(){

    window.scroll(0,0)

  }

  entrar (){
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
    this.userLogin = resp

    environment.token = this.userLogin.token
    environment.nomeCompleto = this.userLogin.nomeCompleto
    environment.foto = this.userLogin.foto
    environment.id = this.userLogin.id
    environment.tipo = this.userLogin.tipo

      console.log(environment.token)
      console.log(environment.nomeCompleto)
      console.log(environment.foto)
      console.log(environment.id)
      console.log(environment.tipo)





    this.router.navigate(['/inicio'])

    }, erro =>{
      if(erro.status != 200){
        Swal.fire({
          title: 'Usuário ou senha estão incorretos!',
          showConfirmButton: false,
          timer: 3000,
          icon: 'error',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://c.tenor.com/dNtJSujn-lYAAAAj/run-pikachu.gif")
            left top
            no-repeat
          `
        })
      }
    })
  }
}
