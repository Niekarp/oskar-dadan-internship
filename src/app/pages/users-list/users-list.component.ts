import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users: User[];

  constructor(private api: ApiClientService) {
    this.api.getUsers().subscribe(users => this.users = users);
  }

  ngOnInit() {
  }

}
