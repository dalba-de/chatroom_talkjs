import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DataService } from "../data.service";
import { TalkService } from "../talk.service";
import Talk from 'talkjs'
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from "@angular/cdk/layout";
import { ApiService } from "../api.service";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  users: any[] = [];
  friends: any[] = [];
  nickname: string;
  imageUrl: string;
  inbox: Talk.Inbox;
  @ViewChild('talkjsContainer') talkjsContainer!: ElementRef;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private dataService: DataService, private talkService: TalkService,
    private observer: BreakpointObserver, private apiService: ApiService) { }

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

  async ngOnInit(): Promise<void> {
    await this.dataService.retrieveData().then(res => {
      this.nickname = res;
    });
    await this.dataService.retrieveImage().then(res => {
      this.imageUrl = res
    });
    this.apiService.getUsers().subscribe((result) => {
      this.friends = result['data'];
      for (let i = 0; i < this.friends.length; i++) {
        if (this.friends[i].name !== '[DELETED]' && this.friends[i].name !== this.nickname)
          this.users.push(this.friends[i].name);
      }
    })
    this.createInbox();
  }


  async chatOneToOne(name: string, image: string) {
    console.log("Chat with " + name + " Image " + image);
    this.inbox = await this.talkService.createOneToOneSession(name, image);
    this.inbox.mount(this.talkjsContainer.nativeElement);
  }
  
  private async createInbox() {
    const session = await this.talkService.createGroupSession(this.nickname, this.imageUrl);
    this.inbox = await this.talkService.createInbox(session);
    this.inbox.mount(this.talkjsContainer.nativeElement);
  }

}
