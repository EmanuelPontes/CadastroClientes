import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from '../../models/user';

@Component({
  selector: 'home-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  user: User = { name: "",
                  cpf: "",
                birthDate: "",
              phones: []};

  constructor(private modalService: NgbModal) { 
  }

  ngOnInit(): void {
  }

  public openFormModal(isEditing: boolean) {
    const modalRef = this.modalService.open(UserFormComponent);

    if (isEditing) {
      this.user.name = "Ivan";
      this.user.cpf = "111.444.777.35";
      this.user.birthDate = "26/06/1999";
      this.user.phones = ["(41)99241-0365", "(41)99168-1947"];
      modalRef.componentInstance.setData( "Editar informações do cliente", "fa fa-user-edit", this.user);

    } else {
      modalRef.componentInstance.setData( "Adicionar novo Cliente", "fa fa-user-plus", null);
    }
    
    
    modalRef.result.then((result) => {
      Object.assign(this.user, result);
    }).catch((error) => {
      console.log(error);
    });
  }

}
