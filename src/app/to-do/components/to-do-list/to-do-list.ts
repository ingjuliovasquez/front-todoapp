import { Component, inject } from '@angular/core';
import { ToDoStats } from '../to-do-stats/to-do-stats';
import { CommonModule } from '@angular/common';
import { ToDoStore } from '../../store/to-do.store';
import { LucideAngularModule, SquarePenIcon, X } from 'lucide-angular';
import { ToDoEditModal } from '../to-do-edit-modal/to-do-edit-modal';

@Component({
  selector: 'app-to-do-list',
  imports: [ToDoStats, CommonModule, ToDoEditModal, LucideAngularModule],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
})
export class ToDoList {
  readonly SquarePenIcon = SquarePenIcon
  readonly X = X
  protected readonly todoStore = inject(ToDoStore);
  readonly todos = this.todoStore.filteredTodos;
  readonly stats = this.todoStore.stats;
  readonly loading = this.todoStore.loadingTodos;

  renameTodo(id: string, name: string) {
    this.todoStore.renameTodo(id, name);
  }

  removeTodo(id: string) {
    this.todoStore.removeTodo(id);
  }

  toggleTodo(id: string) {
    this.todoStore.toggleTodo(id)
  }

  editTodo(id: string) { this.todoStore.openEdit(id); }
}
