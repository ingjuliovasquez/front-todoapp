import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, List } from 'lucide-angular';
import { AuthStore } from '../../store/auth.store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly List = List;
  private router = inject(Router);

  store = inject(AuthStore);
  route = inject(ActivatedRoute);

  email = '';
  password = '';

  loading = this.store.loading;
  error = this.store.error;

  async onClickLogin() {
    if (!this.email?.length || !this.password?.length || this.loading()) return;
    this.store.clearError();
    await this.store.login(this.email, this.password);
  }

  register() {
    this.store.clearError();
    this.router.navigate(['/register']);
  }
}
