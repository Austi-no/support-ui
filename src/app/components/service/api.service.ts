import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {






  baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  createCallType(value: any): any {
    return this.http.post(`${this.baseUrl}/saveCallType`, value)
  }

  getAllCallTypes() {
    return this.http.get(`${this.baseUrl}/getAllCallTypes`)
  }
  deleteCallType(id: any) {
    return this.http.delete(`${this.baseUrl}/deleteCallType/${id}`)
  }

  createTicket(value: FormData) {
    return this.http.post(`${this.baseUrl}/createTicket`, value)
  }
  getAllTickets() {
    return this.http.get(`${this.baseUrl}/getTickets`)
  }

  getAllTicketByTicketNo(ticketNo: any) {
    return this.http.get(`${this.baseUrl}/getTickerByNo/${ticketNo}`)
  }

  // ORGANIZATION
  getAllOrganisations() {
    return this.http.get(`${this.baseUrl}/getAllOrganisation`)
  }
  saveOrganisation(value: any): any {
    return this.http.post(`${this.baseUrl}/saveOrganisation`, value)
  }

  deleteOrganisation(id: any) {
    return this.http.delete(`${this.baseUrl}/deleteOrganisation/${id}`)
  }


  deleteBranch(id: any) {
    return this.http.delete(`${this.baseUrl}/deleteBranch/${id}`)
  }
  getAllBranches() {
    return this.http.get(`${this.baseUrl}/getAllBranch`)
  }
  saveBranch(value: any) {
    return this.http.post(`${this.baseUrl}/saveBranch`, value)
  }


  sendMessage(value: any) {
    return this.http.post(`${this.baseUrl}/sendMessage`, value)
  }


  getAllTicketConversation() {
    return this.http.get(`${this.baseUrl}/allTicketConversation`)
  }
  getConversationByTicketNo(ticketNo: any) {
    return this.http.get(`${this.baseUrl}/getConversationByTicketNo/${ticketNo}`)
  }


}
