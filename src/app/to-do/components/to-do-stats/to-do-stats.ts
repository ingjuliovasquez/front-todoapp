import { Component, inject } from '@angular/core';
import { ToDoStore } from '../../store/to-do.store';

@Component({
  selector: 'app-to-do-stats',
  imports: [],
  templateUrl: './to-do-stats.html',
  styleUrl: './to-do-stats.css',
})
export class ToDoStats {
  private readonly todoStore = inject(ToDoStore);
  protected readonly stats = this.todoStore.stats;
}
