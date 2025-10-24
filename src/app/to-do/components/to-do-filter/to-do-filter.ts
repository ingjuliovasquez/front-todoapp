import { Component, inject } from '@angular/core';
import { ToDoStore } from '../../store/to-do.store';
import { Filters } from '../../model/to-do.model';
import { ListTodo, LayoutList, ListChecks, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-to-do-filter',
  imports: [LucideAngularModule],
  templateUrl: './to-do-filter.html',
  styleUrl: './to-do-filter.css',
})
export class ToDoFilter {
  readonly ListTodo = ListTodo
  readonly LayoutList  = LayoutList
  readonly ListChecks  = ListChecks
  protected readonly todoStore = inject(ToDoStore);
  readonly filter = this.todoStore.filters;

  setFilter(filter: Filters) {
    this.todoStore.setFilter(filter)
  }
}
