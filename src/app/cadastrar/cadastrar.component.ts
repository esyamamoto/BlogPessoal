import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertaService } from '../service/alerta.service';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user:  User = new User
  confirmarSenha: string /*tem que ser diferente o de baixo*/
  tipo: string


  constructor( /*injeção de dependencia*/
    private authService: AuthService,
    private router: Router,
    private alerta: AlertaService
  ) { }

  ngOnInit() {
window.scroll(0,0)
  }

  confirmSenha(event:any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipo =  event.target.value
  }

  cadastrar(){
    this.user.tipo = this.tipo
    if(this.user.senha != this.confirmarSenha){
   
      Swal.fire({
        title: 'Senhas não coincidem!',
        showConfirmButton: false,
        timer: 3000,
        icon: 'info',
        width: 600,
        padding: '3em',
        color: '#f34534',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://c.tenor.com/dNtJSujn-lYAAAAj/run-pikachu.gif")
          left top
          no-repeat
        `
      })
      
    } else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        Swal.fire({
          title: 'Usuário cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 3000,
          icon: 'success',
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
      })  /* ele pega o usuario da linha 13 que foi preenchido nos ngModel, seja mandado pro servidor*/
    }
  }
}
