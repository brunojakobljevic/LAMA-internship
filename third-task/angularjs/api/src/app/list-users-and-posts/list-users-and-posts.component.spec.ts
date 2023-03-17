import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersAndPostsComponent } from './list-users-and-posts.component';

describe('ListUsersAndPostsComponent', () => {
  let component: ListUsersAndPostsComponent;
  let fixture: ComponentFixture<ListUsersAndPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsersAndPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsersAndPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
