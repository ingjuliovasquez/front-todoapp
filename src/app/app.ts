import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ETodoPriority } from './to-do/model/to-do.model';
import { CommonModule } from '@angular/common';
import { Header } from './to-do/components/header/header';
import { ToDoAdd } from './to-do/components/to-do-add/to-do-add';
import { ToDoFilter } from './to-do/components/to-do-filter/to-do-filter';
import { ToDoList } from './to-do/components/to-do-list/to-do-list';
import { ToDoStore } from './to-do/store/to-do.store';

@Component({
  selector: 'app-page',
  imports: [
    FormsModule,
    CommonModule,
    Header,
    ToDoAdd,
    ToDoFilter,
    ToDoList,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [ToDoStore]
})
export class App {
  protected readonly title = signal('To-Do List');

}
