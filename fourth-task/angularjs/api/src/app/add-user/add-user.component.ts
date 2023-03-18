import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../User-Post';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  users: User[] = [];

  constructor(private service:ApiService) {}

  onSubmit(form: NgForm){
    this.service.addUser(form.value.name, form.value.email);
  }
}
