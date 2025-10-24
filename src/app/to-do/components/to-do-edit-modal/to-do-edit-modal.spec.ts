import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoEditModal } from './to-do-edit-modal';

describe('ToDoEditModal', () => {
  let component: ToDoEditModal;
  let fixture: ComponentFixture<ToDoEditModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoEditModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoEditModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
