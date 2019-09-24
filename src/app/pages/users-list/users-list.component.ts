import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users: User[] = [
    { id: 1, name: 'user1', username: 'usr1' },
    { id: 2, name: 'user2', username: 'usr2' },
    { id: 3, name: 'user3', username: 'usr3' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
