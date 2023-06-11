import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import jwt_decode from 'jwt-decode';
import { DecodedToken, MenuItem } from 'src/app/core/auth/auth.interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menus: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // decode the access token and assign the menus
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken: DecodedToken = jwt_decode(token);
      this.menus = decodedToken.menus;
    }
  }

  navigateTo(menuItem: MenuItem): void {
    if (menuItem.path === 'login') {
      this.authService.logout();
    } else {
      this.router.navigate([`${menuItem.path}`]);
    }
  }
}
