import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactRound, LucideAngularModule } from 'lucide-angular';
import { AuthStore } from '../../store/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly ContactRound = ContactRound;
  store = inject(AuthStore);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  confirm = '';

  loading = this.store.loading;

  login() {
    this.router.navigate(['/login']);
  }

  async onSubmit() {
    this.store.clearError();
    if (this.password !== this.confirm) {
      this.store.setError('Las contraseñas no coinciden');
      return;
    }
    await this.store.register(this.name, this.email, this.password);
  }
}
