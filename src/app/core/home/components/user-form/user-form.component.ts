import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  form: any;

  

  public iconClass = "fa fa-user-plus"; 
  public modalTitle = "Novo Cliente";
  private client: User;
  
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              
              ) { 
                this.CreateUserForm();
  }

  ngOnInit(): void {
    
    
  }

  get name() {
    return this.form.get('name');
  }

  get cpf() {
    return this.form.get('cpf');
  }

  get birthDate() {
    return this.form.get('birthDate');
  }

  public setData(modalTitle: string, iconClass: string, client: User) {
    this.iconClass = iconClass;
    this.modalTitle = modalTitle;
    if ((client !== undefined) && (client !== null)) {
      this.name.setValue(client.name);
      this.cpf.setValue(client.cpf);
      let date = client.birthDate.split('/');
      
      this.birthDate.setValue(new Date(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0])));
    }
    
  }

  public onSubmit() {
    this.client.name = this.name.value;
    this.client.cpf = this.cpf.value;
    this.client.birthDate = this.birthDate.value;

    this.activeModal.close(this.client);
  }

  closeModal() {
    this.activeModal.dismiss('Modal Closed');
  }

  private CreateUserForm() {
    this.form = this.formBuilder.group({
      name: [],
      cpf: [],
      birthDate: [new Date()]
    });
  }

}
