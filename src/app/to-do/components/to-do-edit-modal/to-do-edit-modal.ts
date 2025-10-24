import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToDoStore } from '../../store/to-do.store';
import { ETodoPriority } from '../../model/to-do.model';

@Component({
  selector: 'app-to-do-edit-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './to-do-edit-modal.html',
  styleUrl: './to-do-edit-modal.css',
})
export class ToDoEditModal {
  protected readonly todoStore = inject(ToDoStore);

  name = signal('');
  priority = signal<ETodoPriority>(ETodoPriority.MED);
  ETodoPriority = ETodoPriority;

  constructor() {
    effect(() => {
      const sel = this.todoStore.selected();
      if (sel) {
        this.name.set(sel.name ?? '');
        this.priority.set(sel.priority ?? ETodoPriority.MED);
      }
    });
  }

  close() {
    this.todoStore.closeEdit();
  }

  editTodo() {
    this.todoStore.saveEdit(this.name(), this.priority());
  }

  getTodoById(id: string) {
    this.todoStore.openEdit(id)
  }
}
