import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'login-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  form: any;

  constructor(private formBuilder: FormBuilder) { 
    this.createForm();
  }


  ngOnInit(): void {
  }

  public onSubmit() {

  }
  private createForm() {
    this.form = this.formBuilder.group({
      username: [],
      password: []
    });
  }

}
