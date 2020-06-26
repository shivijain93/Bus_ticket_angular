import { Component, OnInit } from '@angular/core';
import { BusbookService } from '../busbook.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-busoperator',
  templateUrl: './busoperator.component.html',
  styleUrls: ['./busoperator.component.css']
})
export class BusoperatorComponent implements OnInit {
  busData;
  constructor(private busservice:BusbookService, private router: Router) {
    this.busData=new FormGroup({
      'travelname':new FormControl('',Validators.required),
      'source':new FormControl('',Validators.required),
      'destination':new FormControl('',Validators.required),
      'busNum':new FormControl('',Validators.required),
      'departDate':new FormControl('',Validators.required),
      'departTime':new FormControl('',Validators.required),
      'arrivalDate':new FormControl('',Validators.required),
      'arrivalTime':new FormControl('',Validators.required),
      'avlSeats':new FormControl('',Validators.required)
   })
  }
  ngOnInit(): void {
  }
  addbus()
  {
    if(this.busData.valid)
    {
      this.busservice.addbusData(this.busData.value).subscribe((data)=>{

        console.log(data);
        this.router.navigate(['/listbus']);
      })
    }
  }
}