import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public searchedUsers: User[];
  private users: User[] = [];

  constructor(private api: ApiClientService) {
    this.api.getUsers().subscribe(users => {
      this.users = users;
      this.updateSearchedUsers('');
    });
  }

  ngOnInit() {
  }

  public onSearchInputKeydown(event: Event): void {
    this.updateSearchedUsers((event.target as HTMLInputElement).value);
  }

  private updateSearchedUsers(searchText: string): void {
    this.searchedUsers = /\S/.test(searchText) ?
      this.users.filter(user => this.searchName(user.name, searchText)) :
      this.users;
  }

  private searchName(name: string, searchText: string): boolean {
    const searchPattern = new RegExp(searchText.toLowerCase().replace(/\s/g, ''));
    const nameParts = name.toLowerCase().replace(/\s/g, '');
    return searchPattern.test(nameParts);
  }

}
