import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private auth: AuthService, private router: Router) { }

  onLogout(): void{
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.logout(token)
      .then((user) => {
        console.log(user);
        if (user.status === 'success') {
          this.router.navigateByUrl('/login');
          localStorage.removeItem('token');
        }
      })
    }
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token){
      this.auth.ensureAuthenticated(token)
        .then((user) => {
          console.log(user);
          if (user.status === 'success') {
            this.isLoggedIn = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

}
