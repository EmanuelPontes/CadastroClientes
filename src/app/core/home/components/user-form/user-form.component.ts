import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../models/user';
import { formatDate } from '@angular/common';
import { phoneValidator } from './phoneValidator';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  form: any;

  public iconClass = "fa fa-user-plus"; 
  public modalTitle = "Novo Cliente";
  private client: Client = { id: 0,
                          name: "",
                          cpf: "",
                          birthDate: "",
                          phones: []
                        };
  private startDate = new Date(Date.now());
  
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              
              ) { 
                this.createUserForm();
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

  get phones() {
    return this.form.get('phones') as FormArray;
  }

  public setData(modalTitle: string, iconClass: string, client: Client) {
    this.iconClass = iconClass;
    this.modalTitle = modalTitle;
    if ((client !== undefined) && (client !== null)) {

      this.client = client;

      console.log("client id");
      console.log(this.client.id);
      this.name.setValue(client.name);
      this.cpf.setValue(client.cpf);
      let date = client.birthDate.split('/');
      let newDate = new Date(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0]))
      this.birthDate.setValue(formatDate(newDate, 'yyyy-MM-dd', 'en'));
      client.phones.forEach(phone => {
        this.phones.push(this.createNewPhone(phone));
      })
    } else {
      this.phones.push(this.createNewPhone(''));
    }
    
  }

  public onSave() {
    this.client.name = this.name.value;
    this.client.cpf = this.cpf.value;
    this.client.birthDate = this.birthDate.value;
    this.phones.controls.forEach(phone => {
      const phoneForm = phone as FormGroup;
      this.client.phones.push(phoneForm.get('phone').value);
      console.log(this.client.phones);
    });

    this.activeModal.close(this.client);
  }

  public deletePhone(index: number) {
    this.phones.removeAt(index);
  }
  public addPhone() {
    this.phones.push(this.createNewPhone(''));
  }

  closeModal() {
    this.activeModal.close('closed');
  }

  private createUserForm() {
    this.form = this.formBuilder.group({
      name: [,Validators.required],
      cpf: [,Validators.required],
      birthDate: [formatDate(this.startDate, 'yyyy-MM-dd', 'en'), Validators.required],
      phones: this.formBuilder.array([], phoneValidator())
    });
  }

  private createNewPhone(phoneNumber: string): FormGroup {
    return this.formBuilder.group({
      phone: [phoneNumber]
    })
  }

}
