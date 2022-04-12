import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class AuthService {



  baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  register(value: any): any {
    return this.http.post(`${this.baseUrl}/register`, value)
  }
  login(value: any): any {
    return this.http.post(`${this.baseUrl}/login`, value)
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/getUsers`)
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.baseUrl}/deleteuser/${id}`)
  }

  // USER TYPE
  getAllUserType() {
    return this.http.get(`${this.baseUrl}/getAllUserType`)
  }
  saveUserType(value: any): any {
    return this.http.post(`${this.baseUrl}/saveUserType`, value)
  }

  deleteUserType(id: any) {
    return this.http.delete(`${this.baseUrl}/deleteUserType/${id}`)
  }

  saveClientAdmin(value: any) {
    return this.http.post(`${this.baseUrl}/saveClientAdminUser`, value)
  }

  saveClientUser(value: any) {
    return this.http.post(`${this.baseUrl}/saveClientUser`, value)
  }


}
