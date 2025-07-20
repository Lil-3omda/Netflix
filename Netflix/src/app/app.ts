import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from "./features/auth/signup/signup";
import { Login } from "./features/auth/login/login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, SignupComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Netflix';
}
