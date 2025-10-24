import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoStats } from './to-do-stats';

describe('ToDoStats', () => {
  let component: ToDoStats;
  let fixture: ComponentFixture<ToDoStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
