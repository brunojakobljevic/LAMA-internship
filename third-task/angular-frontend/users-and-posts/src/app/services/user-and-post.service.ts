import { Injectable } from '@angular/core';
import { User, Post } from '../models/users-and-posts'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAndPostService {

  private url = environment.url;
  constructor(private http: HttpClient) { }

  public getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }
}
