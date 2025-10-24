import { withState, signalStore, withMethods, patchState, withComputed, withHooks } from '@ngrx/signals'
import { ETodoPriority, Filters, Todo } from "../model/to-do.model";
import { effect, inject } from '@angular/core';
import { ToDoApi } from '../data/to-do-api';
import { firstValueFrom } from 'rxjs';
import { isAbortOrHmrCancel, toErrorMessage } from '../utils/to-error-message';
import { TokenService } from '../../auth/services/token.service';

export interface TodoState {
  todos: Todo[];
  filters: Filters;
  loading: boolean;
  loadingTodos: boolean;
  error: string | null;
  selected: Todo | null;
  modalOpen: boolean;
}

export const initialState: TodoState = {
  todos: [],
  filters: 'all',
  loading: false,
  loadingTodos: true,
  error: null,
  selected: null,
  modalOpen: false,
};

export const ToDoStore = signalStore(
  withState(initialState),

  withComputed((store) => ({
    filteredTodos: () => {
      const f = store.filters();
      const items = store.todos();
      if (f === 'active') return items.filter((i) => !i.finished);
      if (f === 'finished') return items.filter((i) => i.finished);
      return items;
    },
    stats: () => {
      const items = store.todos();
      return {
        total: items.length,
        active: items.filter((i) => !i.finished).length,
        finished: items.filter((i) => i.finished).length,
      };
    },
  })),

  withMethods((store) => {
    const todoApi = inject(ToDoApi);
    return {
      fetchTodos: async () => {
        patchState(store, {loading: true, loadingTodos: true, error: null});
        try {
          const todos = await firstValueFrom(todoApi.list());
          const data = (todos?.data ?? []) as Todo[];
          patchState(store, {todos: data, loading: false, loadingTodos: false, error: null });
        } catch (error) {
          if (isAbortOrHmrCancel(error)) {
            patchState(store, { loading: false, loadingTodos: false, });
            return;
          }
          patchState(store,
            {
              error: toErrorMessage(error),
              loading: false,
              loadingTodos: false,
            });
        }
      },

      openEdit: async (id: string) => {
        patchState(store, { loading: true, error: null });
        try {
          const res = await firstValueFrom(todoApi.getTaskById(id));
          patchState(store, {
            selected: res.data,
            modalOpen: true,
            loading: false,
          });
        } catch (error) {
          patchState(store, {
            error: toErrorMessage(error),
            loading: false,
          });
        }
      },

      closeEdit: () => {
        patchState(store, { modalOpen: false, selected: null });
      },

      saveEdit: async (name: string, priority: ETodoPriority) => {
        const current = store.selected();
        if (!current) return;

        const id = current.id;
        const prevTodos = store.todos();

        const patched: Todo = { ...current, name, priority };
        patchState(store, {
          selected: patched,
          todos: prevTodos.map(t => (t.id === id ? patched : t)),
          loading: true,
          error: null,
        });

        try {
          await firstValueFrom(todoApi.update(id, { name, priority }));
          patchState(store, { loading: false, modalOpen: false, selected: null });
        } catch (error) {
          patchState(store, {
            todos: prevTodos,
            selected: current,
            loading: false,
            error: toErrorMessage(error),
          });
        }
      },

      addTodo: async (name: string, priority: ETodoPriority) => {
        const n = name.trim();
        if (n === '') return;

        const exists = store.todos().some(
          (todo) => todo.name.trim().toLowerCase() === n.toLowerCase()
        );
        if (exists) {
          patchState(store, { error: 'Ya existe una tarea con ese nombre' });
          return;
        }

        const tempId = `temp-${crypto.randomUUID?.() ?? Date.now()}`;
        const todo: Todo = {
          id: tempId,
          name,
          finished: false,
          priority
        }
        patchState(store, { todos: [...store.todos(), todo ]});

        try {
          await firstValueFrom(todoApi.create(n, priority));
          patchState(store, { todos: store.todos().filter(t => t.id !== tempId) });

          const res = await firstValueFrom(todoApi.list());
          patchState(store, { todos: res.data, error: null });
        } catch (error) {
          patchState(store, {
            todos: store.todos().filter((todo) => todo.id !== tempId),
            error: toErrorMessage(error),
            loading: false,
          })
        }
      },

      renameTodo: async (id: string, name: string) => {
        const todo = store.todos().find((todo) => todo.id === id)
        if(!todo) return;

        patchState(store, {todos: store.todos().map((todo) =>
        (todo.id === id ?
            { ...todo, name }
            : todo
        ))})

        try {
          await firstValueFrom(todoApi.update(id, {name}))
        } catch (error) {
           patchState(store, {
            todos: [...store.todos(), todo],
            error: toErrorMessage(error),
            loading: false,
          })
        }
      },

      removeTodo: async (id: string) => {
        const todo = store.todos().find((todo) => todo.id === id);
        if(!todo) return;
        patchState(store, {todos: store.todos().filter((todo) => (todo.id !== id))})

        try {
          await firstValueFrom(todoApi.delete(id));
        } catch (error) {
          patchState(store, {
            todos: [...store.todos(), todo],
            error: toErrorMessage(error),
            loading: false,
          })
        }
      },

      toggleTodo: async (id: string) => {
        const todo = store.todos().find((todo) => todo.id === id);
        if(!todo) return;
        patchState(store, {
          todos: store
          .todos()
          .map((todo) => (todo.id === id ?
            {
              ...todo, finished: !todo.finished
            }
            : todo
        ))
        })

        try {
          await firstValueFrom(todoApi.update(id, {finished: !todo.finished}))
        } catch (error) {
          patchState(store, {
            todos: [...store.todos(), todo],
            error: toErrorMessage(error),
            loading: false,
          })
        }
      },

      setFilter: (filter: Filters) => {
        patchState(store, { filters: filter });
      },
    }
  }),

  withHooks((store) => ({
    onInit() {
      const tokenSvc = inject(TokenService);
      effect(() => {
        const token = tokenSvc.tokenSignal()();
        if (!token) {
          patchState(store, { loading: false, error: null });
          return;
        }

        const _ = store.filters();
        patchState(store, {error: null});
        store.fetchTodos();
      });
    },
  }))
)
