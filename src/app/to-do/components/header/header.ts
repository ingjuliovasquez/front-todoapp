import { Component, inject, Input } from '@angular/core';
import { AuthApi } from '../../../auth/data/auth-api';
import { Router } from '@angular/router';
import { List, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Input() title = "ToDo List"
  readonly List = List;

  private auth = inject(AuthApi);
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
