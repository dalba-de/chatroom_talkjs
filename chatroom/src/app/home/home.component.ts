import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "../data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nickname: string = '';
  imageUrl: string = '';

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  }

  joinChat() {
    this.router.navigate(['chatroom'])
  }

  setData(value: string, image: string) {
    this.dataService.SharedData = value;
    this.dataService.SharedImage = image;
    this.router.navigate(['chatroom'])
  }

}
