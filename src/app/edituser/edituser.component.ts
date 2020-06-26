import { Component, OnInit } from '@angular/core';
import { BusbookService } from '../busbook.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  editUser;
  userName;
  userEmail;
  userPhone;
  userDOB;

  constructor(private busservice:BusbookService, private router: Router) {

    this.editUser = new FormGroup({
      'dob': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required)
      
    })
  }

  ngOnInit(): void {

    this.userName=sessionStorage.getItem('name')
    this.userEmail=sessionStorage.getItem('email')
   this.userPhone=sessionStorage.getItem('phone');
   this.userDOB=sessionStorage.getItem('dob');

  }

  editData() {
    if (this.editUser.valid) {
      this.busservice.editUserData((this.editUser.value)).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/home'])
      })
    }
  }
}