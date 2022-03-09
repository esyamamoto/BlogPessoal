import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }
  
 

  entrar(userLogin: UserLogin):Observable<UserLogin>{
    return this.http.post<UserLogin>('https://sayuriblog.herokuapp.com/usuarios/logar', userLogin) /*pq post? ususario controller está no post*/
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('https://sayuriblog.herokuapp.com/usuarios/cadastrar' , user)
  }
  /* Como eu sei se o meu user está logado em minha plataforma? Quando existe um token gerado pelo back-end no meu environment. */

  atualizar(user: User): Observable<User> {
    return this.http.put<User>('https://sayuriblog.herokuapp.com/usuarios/atualizar' , user)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://sayuriblog.herokuapp.com/usuarios/${id}`)
  }

  putUsuario(user: User): Observable<User> {
    return this.http.put<User>('https://sayuriblog.herokuapp.com/usuarios/atualizar', user)
  }

  logado(){
    let ok: boolean = false
    
    if (environment.token != ''){
      ok = true
    }
    
    return ok
  }

  adm(){
    let ok: boolean = false
    
    if (environment.tipo == 'adm'){
      ok = true
    }
    
    return ok
  }

}
