import { Injectable } from '@angular/core';
import Talk from 'talkjs';

@Injectable({
  providedIn: 'root'
})
export class TalkService {

  private currentUser: Talk.User;
  private currentSession: Talk.Session;

  constructor() { }

  async createUser(applicationUser: any) {
    await Talk.ready;
    return new Talk.User({
      id: applicationUser.id,
      name: applicationUser.username,
      photoUrl: applicationUser.photoUrl,
      role: applicationUser.role
    });
  }

  async createGroupSession(name: string, image: string) {
    await Talk.ready;
    const user = {
      id: name,
      username: name,
      photoUrl: image,
      email: name + '@example.net',
      role: 'default'
    };
    const currentUser = await this.createUser(user);
    this.currentSession = new Talk.Session({
      appId: 'tN8sUhGL',
      me: currentUser
    });
    this.currentUser = currentUser;
    return this.currentSession;
  }

  async createOneToOneSession(name: string, image: string) {
    await Talk.ready;
    const user = {
      id: name,
      username: name,
      photoUrl: image,
      email: name + 'example.net',
      role: 'default'
    };
    const otherUser = await this.createUser(user);
    const conversation = this.currentSession.getOrCreateConversation(Talk.oneOnOneId(this.currentUser, otherUser));
    conversation.setParticipant(this.currentUser);
    conversation.setParticipant(otherUser);
    return this.currentSession.createInbox({selected: conversation});
  }

  // async createCurrentSession() {
  //   await Talk.ready;
  //   const user = {
  //     id: 1,
  //     username: 'Alice',
  //     email: 'alice@example.com',
  //     photoUrl: 'https://demo.talkjs.com/img/alice.jpg',
  //     welcomeMessage: 'Hey there! How are you? :-)',
  //     role: 'default'
  //   };
  //   const currentUser = await this.createUser(user);
  //   const session = new Talk.Session({
  //        appId: 'tN8sUhGL',
  //        me: currentUser
  //   });
  //   this.currentUser = currentUser;
  //   return session;
  // }

  private async getOrCreateConversation(session: Talk.Session, otherApplicationUser: any) {
    const otherUser = await this.createUser(otherApplicationUser);
    const conversation = session.getOrCreateConversation(Talk.oneOnOneId(this.currentUser, otherUser));
    conversation.setParticipant(this.currentUser);
    conversation.setParticipant(otherUser);
    return conversation;
  }

//   async createInbox(session: Talk.Session) {
//     const otherApplicationUser = {
//       id: 5,
//       username: 'Lo',
//       email: 'sebastian@example.com',
//       photoUrl: 'https://demo.talkjs.com/img/sebastian.jpg',
//       welcomeMessage: 'Hey, how can I help?',
//       role: 'default'
//     };

//     const conversation = await this.getOrCreateConversation(session, otherApplicationUser);
//     return session.createInbox({selected: conversation});
//  }

async createInbox(session: Talk.Session) {
  const conversation = session.getOrCreateConversation('GROUP_ID');
  conversation.setParticipant(this.currentUser);
  conversation.setAttributes({
    photoUrl: "https://tierragamer.com/wp-content/uploads/2017/12/Pong.jpg",
    subject: "Group chat!"
  });
  return session.createInbox({selected: conversation});
}
}
