import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { AlertaService } from 'src/app/service/alerta.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {


  postagem: Postagem = new Postagem()
  idPost: number


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private alerta: AlertaService
    
  ) { }


  ngOnInit(){
    if(environment.token == ''){
      this.alerta.showAlertDanger('Faça o login novamente')
      this.router.navigate(['/entrar'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
  }

  findByIdPostagem(id:number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  apagar(){
    this.postagemService.deletePostagem(this.idPost).subscribe(() => {
      Swal.fire({
        title: 'Postagem apagada com sucesso!',
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
      this.router.navigate(['/inicio'])
    })
  }

}
