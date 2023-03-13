import { Component } from '@angular/core';
import { UserAndPostService } from './services/user-and-post.service';
import { User, Post } from './models/users-and-posts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'users-and-posts';

  users: User[] = [];

  constructor(private UserAndPostService: UserAndPostService) {}

  ngOnInit() : void {
    this.UserAndPostService.getUsers().subscribe((result: User[]) => this.users = result);
  }
}
