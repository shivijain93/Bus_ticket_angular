const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusbookService {
  busData;
  ticketId;

  constructor(private http:HttpClient) {}

    
    registerUser(data):Observable<any>{
      console.log(data)
      return this.http.post("http://localhost:3000/register",data)
    }
    loginUser(data):Observable<any>{
      console.log(data)
      return this.http.post("http://localhost:3000/login",data)
    }
   
    addbusData(data):Observable<any>{
      console.log(data)
      return this.http.post("http://localhost:3000/addbus",data)
    }
    getBuses(): Observable<any> {
      return this.http.get('http://localhost:3000/listbus')
    }

    editUserData(data):Observable<any>
  {
    var email=sessionStorage.email
    return this.http.put('http://localhost:3000/edituser/'+ email, data)
  }

  searchbus(data): Observable<any> {
    return this.http.post('http://localhost:3000/searchbuses', data);
  }

  

  editBusData(data): Observable<any> {
    return this.http.put('http://localhost:3000/editbus/' + data.busNum, data)
  }

  getBusInfo() {
    return this.busData;
  }
  setBusInfo(busData) {
    this.busData = busData;
  }

  setBlockedSeats(seats): Observable<any> {
    return this.http.put('http://localhost:3000/editSeats/' + this.busData.busNum + '/' + this.busData.avlSeats, seats);
  }

  getBlockedSeats(busNum): Observable<any> {
    return this.http.get('http://localhost:3000/seatstatus/' + busNum)
  }

  setTicketData(ticketData): Observable<any> {
    return this.http.post('http://localhost:3000/addticket', ticketData)
  }

  getUserTickets(email): Observable<any> {
    return this.http.get('http://localhost:3000/listtickets/' + email)
  }

  setTicketId(ticketId)
  {
    this.ticketId=ticketId;
  }

  getTIcketId()
  {
    return this.ticketId;
  }

  getTicket(ticketId)
  {
    return this.http.get('http://localhost:3000/viewticket/' + ticketId)
  }

  ChangeStatus(ticketId)
  {
    return this.http.put('http://localhost:3000/cancelticket/'+ticketId,ticketId)
  }

  freeSeatsOnCancel(busNum,seats,blockedseats)
  {
    
    return this.http.put('http://localhost:3000/freeseats/'+busNum+'/' + seats,blockedseats)
  }
}