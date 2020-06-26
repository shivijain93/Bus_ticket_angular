import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusbookService } from '../busbook.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editbus',
  templateUrl: './editbus.component.html',
  styleUrls: ['./editbus.component.css']
})
export class EditbusComponent implements OnInit {
  editBus;
  busInfo;
    constructor(private busservice:BusbookService,private router:Router) {
  
      this.editBus = new FormGroup({
        'busNum':new FormControl('',Validators.required),
        'source':new FormControl('',Validators.required),
        'destination':new FormControl('',Validators.required),
        'departDate':new FormControl('',Validators.required),
        'departTime':new FormControl('',Validators.required),
        'arrivalDate':new FormControl('',Validators.required),
        'arrivalTime':new FormControl('',Validators.required)
  
      })
     }
  
    ngOnInit(): void {
  
      this.busservice.getBuses().subscribe((data)=>{
        console.log(data);
        this.busInfo=data;
      })
    }
  
    editbus()
    {
      if(this.editBus.valid)
      {
        this.busservice.editBusData(this.editBus.value).subscribe((data)=>{
          console.log(data);
          this.router.navigate(['/listbus'])
        })
      }
  
    }
  }