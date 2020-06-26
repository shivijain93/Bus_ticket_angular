import { Component, OnInit } from '@angular/core';
import { BusbookService } from '../busbook.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-viewticket',
  templateUrl: './viewticket.component.html',
  styleUrls: ['./viewticket.component.css']
})
export class ViewticketComponent implements OnInit {

  userName;
  userEmail;
  userPhone;
  ticketsList;
  seats;
  blockedSeats = [];
  upcoming;
  completed;
  cancelled;
  isCancelled: boolean = false;
  constructor(private busservice: BusbookService, private router: Router) { }

  ngOnInit(): void {

    this.userName = sessionStorage.getItem('name');
    this.userEmail = sessionStorage.getItem('email');
    this.userPhone = sessionStorage.getItem('phone');

    this.busservice.getUserTickets(this.userEmail).subscribe((data) => {
      console.log(data);
      this.ticketsList = data;
      console.log(this.ticketsList)



      this.upcoming = this.ticketsList.filter((item) => {
        var todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        console.log(Date.parse(todayDate));
        return Date.parse(item.departDate) >= Date.parse(todayDate) && item.status != "Cancelled";
      })
      console.log("Confirmed tickets")
      console.log(this.upcoming)

      this.completed = this.ticketsList.filter((item) => {
        var todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        console.log(Date.parse(todayDate));
        return Date.parse(item.departDate) < Date.parse(todayDate) && item.status != "Cancelled";
      })
      console.log("Completed journey")
      console.log(this.completed)

      this.cancelled=this.ticketsList.filter((item)=>{
        return item.status == "Cancelled"
      })
      console.log("Cancelled")
      console.log(this.cancelled);
    })




  }

  setTicketId(ticketId) {
    this.busservice.setTicketId(ticketId);
    this.router.navigate(['/printticket'])
  }

  cancelTicketId(ticketId, seats, busNum) {

    this.busservice.ChangeStatus(ticketId).subscribe((data) => {
      console.log(data);
    })

    this.busservice.getBlockedSeats(busNum).subscribe((data) => {

      if (data.seatstatus) {
        var result = Object.keys(data.seatstatus).filter(function (key) {
          return data.seatstatus[key] == true;
        });

        console.log(result);
        // console.log(result);
        //update the occupied seats array with the seat status from DB
        result.forEach((item) => {
          this.blockedSeats.push(item);
        })

        this.blockedSeats = result;
        console.log(this.blockedSeats);
      }

      this.busservice.freeSeatsOnCancel(busNum, seats, this.blockedSeats).subscribe((data) => {
        console.log(data);
        this.isCancelled = true;
      })
    })

  }
}
