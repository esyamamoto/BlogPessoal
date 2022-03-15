import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AlertaService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alerta: AlertaService
  ) { }
  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)

  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }
  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar() {
    this.user.tipo = this.tipoUsuario

    if (this.user.senha != this.confirmarSenha) {
      Swal.fire({
        title: 'As senhas não coincidem!',
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
      
    } else {
      this.authService.atualizar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/inicio'])
        
        Swal.fire({
          title: 'Usuário atualizado com sucesso! Entre novamente!git ',
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

        environment.token = ''
        environment.nomeCompleto = ''
        environment.foto = ''
        environment.id = 0
        this.router.navigate(['/entrar'])

      })  /* ele pega o usuario da linha 13 que foi preenchido nos ngModel, seja mandado pro servidor*/
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }
}
