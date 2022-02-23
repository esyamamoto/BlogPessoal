import{ HttpClientModule} from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy , LocationStrategy } from '@angular/common';


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { TemaComponent } from './tema/tema.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    EntrarComponent,
    CadastrarComponent,
    InicioComponent,
    TemaComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  /*colocar importação manualmente */
    FormsModule
  ],
  providers: [{

provide: LocationStrategy, 
useClass: HashLocationStrategy
/* ajuda o angular a nao se perder nas rotas e uso de ancoras */

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
