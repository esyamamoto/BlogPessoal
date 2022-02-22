import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';


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
    private router: Router
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
      alert('As senhas não coincidem')
    } else{
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })  /* ele pega o usuario da linha 13 que foi preenchido nos ngModel, seja mandado pro servidor*/
    }
  }
}
