import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BusbookService } from '../busbook.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  
  constructor(private busservice:BusbookService,private router:Router) { 
    this.loginForm = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),

     
      
    })
  }
ngOnInit(): void {
}


sendData() {
  if (this.loginForm.valid) {
    console.log(this.loginForm.value);

      this.busservice.loginUser(this.loginForm.value).subscribe((data) => {

      console.log(data.result)

      if (sessionStorage.length == 0) {
        sessionStorage.setItem('email', data.result.email);
       // sessionStorage.setItem('name', data.result.name);
        //sessionStorage.setItem('phone', data.result.phone);
        //sessionStorage.setItem('dob', data.result.dob);
        this.router.navigate(['/home']);
      }

    })
  }
}



}