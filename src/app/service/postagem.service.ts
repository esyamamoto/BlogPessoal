import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  } /* httpheaders : Para inserir o token no Authorization e no Header da minha requisição.*/

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>('https://sayuriblog.herokuapp.com/postagem', this.token)
  }
  /*Observable nos metódos que irão chamar os end-points Para garantir que o tipo da variável será passado corretamente.*/

  getByIdPostagem(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`https://sayuriblog.herokuapp.com/postagem/${id}`, this.token)
  }

  getByTituloPostagem(titulo: string): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`https://sayuriblog.herokuapp.com/postagem/titulo/${titulo}`, this.token)

  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.post<Postagem>('https://sayuriblog.herokuapp.com/postagem', postagem, this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {
    return this.http.put<Postagem>('https://sayuriblog.herokuapp.com/postagem', postagem, this.token)
  }

  deletePostagem(id: number) {
    return this.http.delete(`https://sayuriblog.herokuapp.com/postagem/${id}`, this.token)
  }
}
