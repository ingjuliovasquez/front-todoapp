import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoAdd } from './to-do-add';

describe('ToDoAdd', () => {
  let component: ToDoAdd;
  let fixture: ComponentFixture<ToDoAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
