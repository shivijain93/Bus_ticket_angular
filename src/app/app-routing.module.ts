import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BusoperatorComponent } from './busoperator/busoperator.component';
import { ListbusComponent } from './listbus/listbus.component';
import { EditbusComponent } from './editbus/editbus.component';
import { EdituserComponent } from './edituser/edituser.component';
import { BookticketComponent } from './bookticket/bookticket.component';
import { ViewticketComponent } from './viewticket/viewticket.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
 

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'addbus',
    component:BusoperatorComponent
  },
  {
    path:'listbus',
    component:ListbusComponent
  },
  {
    path:'editbus/:id',
    component:EditbusComponent
  },
  {
    path:'edituser',
    component:EdituserComponent
  },

  {
    path:'home/bookticket',
    component:BookticketComponent
  },

  {
    path:'viewbooking/:id',
    component:ViewticketComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
