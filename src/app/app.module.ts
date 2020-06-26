import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BusoperatorComponent } from './busoperator/busoperator.component';
import { EditbusComponent } from './editbus/editbus.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ListbusComponent } from './listbus/listbus.component';
import { BookticketComponent } from './bookticket/bookticket.component';
import { ViewticketComponent } from './viewticket/viewticket.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BusoperatorComponent,
    EditbusComponent,
    EdituserComponent,
    ListbusComponent,
    BookticketComponent,
    ViewticketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
