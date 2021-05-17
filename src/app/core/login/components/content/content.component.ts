import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  form: any;
  
  public error: boolean = false;
  public message: string = '';

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private router: Router) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  public onSubmit() {
    this.error = false;
    this.authService.login(this.username.value, this.password.value).subscribe(
      (authToken: string) => {
        sessionStorage.setItem('authToken', authToken);
        this.router.navigate(['home']);
      }, 
      (err) => {
        if (err.status === 401) {
          this.message = 'Usuário e/ou senha inválidos';
          this.error = true;
        } else {
          this.message = 'Erro ao tentar autenticar usuário. Verifique a conexão e tente novamente.';
          this.error = true;
        }

        this.form.reset();
      });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      username: [],
      password: []
    });
  }



}
