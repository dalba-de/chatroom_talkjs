import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../api.service";
import { DataService } from "../data.service";
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  nickname: string;
  Users: any = [];
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private apiService: ApiService, private dataService: DataService,
    private observer: BreakpointObserver) { }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((result) => {
      this.Users = result['data'];
      for (let i = 0; i < 6; i++) {
        console.log(this.Users[i].name)
      };
    })
  }

  private getData() {
    this.nickname = this.dataService.SharedData;
  }

}
