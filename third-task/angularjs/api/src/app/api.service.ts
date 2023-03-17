import { Injectable } from '@angular/core';
import { User, Post } from './User-Post';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly url = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url + "users");
  }
  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.url + "posts");
  }
  editUser(id: Number, name: string, email: string){
    return this.http.put(this.url + "users/editUser", {id, name, email}).subscribe();
  }
  addUser(name: string, email:string){
    return this.http.post(this.url + "users/addUser", {name, email}).subscribe();
  }
}
