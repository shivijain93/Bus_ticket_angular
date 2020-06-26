import { Component, OnInit } from '@angular/core';
import { BusbookService } from '../busbook.service';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.css']
})
export class BookticketComponent implements OnInit {

  seatId;
  //flags for div
  isViewTicket: Boolean = false;//for view ticket
  isBusInfo: boolean = false;//for bus information
  isBusSeats: boolean = false;//for bus seats
  isMakePayment: boolean = false;//for make payment div
  ticketInfo;

  busfare: number;//calculate Bus fare

  isBookingSuccess: boolean = false;//flag for booking success
  isUserLoggedIn: boolean = false;//flag for logged in user
  isConfirmClicked: boolean = false;//flag if confirm clicked
  occupiedSeats = [];//occupied Seats Array
  selSeatArray = [];//Selected Seats Array

  bookSeatsDisp = [];//Display current booking seats dummy array for user to display
  busInfo;//object of bus information
  userName;//username to get from session storage
  userEmail;//email from session storage
  userPhone;//phone from session storage
  bookedSeats = [];//Booked Seats Array from DB
  bookSeats: string = "";//string to display the ookked seats to user



  constructor(private busservice: BusbookService) { }

  ngOnInit(): void {

    //set businfo and busseats flags
    this.isBusInfo = true;
    this.isBusSeats = true;

    //retrive bus info from service
    this.busInfo = this.busservice.getBusInfo()
    if (this.busInfo) {
      //console.log(this.busInfo);
      //retrive the booked seats from db
      this.busservice.getBlockedSeats(this.busInfo.busNum).subscribe((data) => {

        // console.log(data);

        if (data.seatstatus) {
          var result = Object.keys(data.seatstatus).filter(function (key) {
            return data.seatstatus[key] == true;
          });

          // console.log(result);
          //update the occupied seats array with the seat status from DB
          result.forEach((item) => {
            this.occupiedSeats.push(item);
          })

          this.bookedSeats = result;
        }


      })
    }
    //user Data from session storage
    this.userName = sessionStorage.getItem('name');
    this.userEmail = sessionStorage.getItem('email');
    this.userPhone = sessionStorage.getItem('phone');
    console.log(this.userEmail);
    this.isUserLoggedIn = this.userEmail != null ? true : false;//check if user has logged in 
  }

  //When user selects the seats
  selSeat(event) {

    var target = event.target;
    var id = target.attributes.id;
    this.seatId = id.nodeValue;
    //console.log(this.seatId);
    if (!(this.selSeatArray.includes(this.seatId))) {
      this.selSeatArray.push(this.seatId)
    }
    else {
      var removeseat = this.selSeatArray.indexOf(this.seatId);
      this.selSeatArray.splice(removeseat, 1);
    }

  }

  //when Comfirm seats is clicked
  confirmSeats() {
    console.log(this.isUserLoggedIn)

    if (this.isUserLoggedIn != null) {
      this.isConfirmClicked = true;//flag for confirm click button
      this.bookSeats = "";//make empty to avoid dup display of blocked seats
      //move the seleted seats to occupied array
      this.selSeatArray.forEach((item) => {
        if (!this.occupiedSeats.includes(item)) {
          this.occupiedSeats.push(item)
        }
      })

      console.log(this.busInfo.avlSeats)


    
      this.isBusInfo = false;
      this.isBusSeats = false;
      this.isMakePayment = this.busInfo.avlSeats > 0 ? true : false;
      //for seat display to the user
      this.occupiedSeats.forEach((item) => {
        if (!this.bookedSeats.includes(item)) {
          this.bookSeatsDisp.push(item);
        }
      })

      this.bookSeats = this.bookSeatsDisp.join(',')
      this.busfare = this.bookSeatsDisp.length * 500
      // console.log(this.busfare)
    }

  }

  makePayment() {

   this.isMakePayment = true;


    //update the seats inforation into the db
    if (this.userEmail) {
      this.busservice.setBlockedSeats(this.occupiedSeats).subscribe((data) => {

        //console.log(data.message);
        if (data.message == "Seats Updated") {
          this.isBookingSuccess = true;

          var today = new Date();

          var bookingDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          var bookingTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

          // var dateTime = bookingDate + ' ' + bookingTime;
          this.ticketInfo = {
            userEmail: this.userEmail,
            userName: this.userName,
            userPhone: this.userPhone,
            ticketId: this.generateTicketId(),
            busNum: this.busInfo.busNum,
            agencyname: this.busInfo.agencyname,
            source: this.busInfo.source,
            destination: this.busInfo.destination,
            seats: this.bookSeats,
            status: "Confirmed",
            departDate: this.busInfo.departDate,
            departTime: this.busInfo.departTime,
            arrivalDate: this.busInfo.arrivalDate,
            arrivalTime: this.busInfo.arrivalTime,
            fare: this.busfare,
            bookingDate: bookingDate,
            bookingTime: bookingTime
          }
          this.busservice.setTicketData(this.ticketInfo).subscribe((data) => {
            console.log(data)

          })
        }
      })
    }

  }

  viewTicket() {
    //flags to view ticket
    this.isViewTicket = true;
    this.isMakePayment = false;
    this.isBusInfo = false;
    this.isBusSeats = false;


  }


  generateTicketId() {
    let minm = 100;
    let maxm = 9999;
    let TicketId = "BB" + Math.floor(Math.random() * (maxm - minm + 1) + minm);
    return TicketId;

  }


}