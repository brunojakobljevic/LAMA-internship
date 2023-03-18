import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { User } from '../User-Post';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  users: User[] = [];

  constructor(private service:ApiService) {}

  ngOnInit(){
    this.service.getUsers().subscribe(res => {
      this.users = res;
    })
  }
  onSubmit(form: NgForm){
    this.service.editUser(form.value.user_id, form.value.name, form.value.email);
  }
}
