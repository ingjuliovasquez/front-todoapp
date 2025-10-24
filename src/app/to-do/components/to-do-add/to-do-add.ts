import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ETodoPriority } from '../../model/to-do.model';
import { ToDoStore } from '../../store/to-do.store';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-to-do-add',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './to-do-add.html',
  styleUrl: './to-do-add.css',
})
export class ToDoAdd {
  readonly Plus = Plus;
  protected readonly todoStore = inject(ToDoStore);

  newTitle = '';
  newPriority: ETodoPriority = ETodoPriority.LOW;
  ETodoPriority = ETodoPriority;

  addTodo(name: string, priority: ETodoPriority) {
    this.todoStore.addTodo(name, priority);
  }
}
