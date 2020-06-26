import { Component, OnInit } from '@angular/core';
import { BusbookService } from '../busbook.service';

@Component({
  selector: 'app-listbus',
  templateUrl: './listbus.component.html',
  styleUrls: ['./listbus.component.css']
})
export class ListbusComponent implements OnInit {
  allBus;
  constructor(private busservice:BusbookService) { }

  ngOnInit(): void {

    this.busservice.getBuses().subscribe((data)=>{
      this.allBus=data;
    })
  }

}

