import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PocketBaseService } from '../pocketbase.service'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pocketBaseService: PocketBaseService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    try{
      await this.pocketBaseService.login(this.loginForm.value.email, this.loginForm.value.password)
      this.router.navigate(['/upload']);
    } catch (error) {
      console.error(error);
    }

  }
}
