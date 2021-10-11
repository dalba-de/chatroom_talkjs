import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  auth_token = "sk_test_cXQWf30DGmEwziQOH16cqXqv8LX0vmYa";
  constructor(private httpClient: HttpClient) { }

  API_SERVER = "https://api.talkjs.com/v1/tN8sUhGL"

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`
  })

  public getUsers() {
    return this.httpClient.get(`${this.API_SERVER}/users/`, { headers: this.headers })
  }
}
