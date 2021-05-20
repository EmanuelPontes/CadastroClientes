import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../user-form/user-form.component';
import { Client } from '../../models/user';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'home-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public error: boolean = false;
  public message: string = '';
  public searchText: string;
  public filteredList: Array<Client> = [];

  public page = 1;
  public pageSize = 5;
  public pagedList: Array<Client> = [];

  public clientList: Array<Client> = [];
  client: Client = { id: 0,
                    name: "",
                    cpf: "",
                    birthDate: "",
                    phones: []};

  constructor(private modalService: NgbModal,
              private clientsService: ClientsService) { 
                
  }

  ngOnInit(): void {
    this.getClientList();
  }

  public openFormModal(isEditing: boolean, clientId: number) {
    const modalRef = this.modalService.open(UserFormComponent);

    if (isEditing) {
      let clientEdit = this.clientList.find(client => client.id === clientId);
      if (clientEdit !== undefined) {
          modalRef.componentInstance.setData( "Editar informações do cliente", "fa fa-user-edit", clientEdit);
      }
      

    } else {
      modalRef.componentInstance.setData( "Adicionar novo Cliente", "fa fa-user-plus", null);
    }
    
    modalRef.result.then((result) => {
      if ((result !== 'closed') && (result['name'] || result['cpf']))  {
        const cpfInvalid = this.clientList.find((clientObj) => clientObj.cpf === result.cpf);
        if ((cpfInvalid === undefined) || isEditing) {
          Object.assign(this.client, result);
          isEditing ? this.updateClient(this.client) : this.saveClient(this.client);
        } else {
          this.mostraMensagemErro("Falha ao salvar o usuário, cpf já cadastrado");  
        }
        
      }
      
    }).catch((error) => {
      
      this.mostraMensagemErro("Falha ao salvar o usuário");
      console.log(error);
    });
  }

  public onPageChange(page: number) { 
    this.setCurrentPageList(page);
  }

  public getCurrentClientsPage(): Array<Client> {
    return this.pagedList;
  }

  private setCurrentPageList(page: number) {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.pagedList = this.clientList.slice(start, end);
  }

  private saveClient(client: Client) {
    this.clientsService.postClient(client).subscribe(() => {
        this.getClientList();
    }, (err) => {

    })
  }

  private updateClient(client: Client) {
    this.clientsService.putClient(client).subscribe(() => {
        this.getClientList();
    }, (err) => {
      
    })
  }

  private getClientList() {
    this.clientsService.getClientList().subscribe((data: Array<Client>) => {
        
      this.clientList = data;
      this.setCurrentPageList(1);
      

    },
    (error) => {
      console.log(error);
    });
  }

  private mostraMensagemErro(msg: string) {
    this.error = true;
    this.message = msg;
    setTimeout(() => {
      this.error = false;
      this.message = '';
    }, 3000);
  }

}
