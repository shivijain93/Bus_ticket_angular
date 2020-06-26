import { Component, OnInit } from '@angular/core';
import { BusbookService } from '../busbook.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  busData;
  busResults;
  buses;
  loggedinUser;
  constructor(private busService:BusbookService) {

    this.busData = new FormGroup({
      'source': new FormControl('', Validators.required),
      'destination': new FormControl('', Validators.required),
      'departDate': new FormControl('', Validators.required)
      
    })
  }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('name') != null)
    {
      this.loggedinUser=window.sessionStorage.getItem('name');
      console.log(this.loggedinUser);
    }
    
  }

  getBuses() {

    console.log(this.busData.value);
    this.busService.searchbus(this.busData.value).subscribe((data) => {
      console.log(data);
      this.busResults=data;      
    })

  }

  setBusData(busInfo)
  {
    this.busService.setBusInfo(busInfo)
  }

}
