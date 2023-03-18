import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { User, Post } from '../User-Post';

@Component({
  selector: 'app-list-users-and-posts',
  templateUrl: './list-users-and-posts.component.html',
  styleUrls: ['./list-users-and-posts.component.css']
})
export class ListUsersAndPostsComponent {

  constructor(private service: ApiService) {}

  users: User[] = [];
  posts: Post[] = [];
 
  ngOnInit() {
    this.service.getUsers().subscribe(
      res => this.users = res
    )
    this.service.getPosts().subscribe(
      res => this.posts = res
    )
  }
}
