import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertaService } from '../service/alerta.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  descricaoTema: string

  user: User = new User()
  idUser = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alerta: AlertaService
  ) { }

  ngOnInit() {
    window.scroll(0,0) /* já começa a página no inicio*/

    if (environment.token == '') {
      /*
            alert('Sua seção expirou, faça o login novamente!')
      */
      this.router.navigate(['/entrar'])
    }
    this.getAllTema()
    this.getAllPostagens()
  }


  getAllTema(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp

    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }


  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }
  findByIdUser() {
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }


  findByTituloPostagem(){

    if(this.tituloPost ==''){
      this.getAllPostagens()

    } else{
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listaPostagens = resp
      })
    }

   
  }
  findByDescricaoTema(){
    if (this.descricaoTema == '') {
      this.getAllTema
      
    } else {
      this.temaService.getByDescricaoTema(this.descricaoTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }

 
publicar() {
  this.tema.id = this.idTema
  this.postagem.tema = this.tema

  this.user.id = this.idUser
  this.postagem.usuario = this.user

  this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
    this.postagem = resp
    
    Swal.fire({
      title: 'Postagem realizada com sucesso!',
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

    this.postagem = new Postagem()
    this.getAllPostagens()
  })

}
}
