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
  public pageSize = 1;
  public pagedList: Array<Client> = [];

  clientList: Array<Client> = [];
  client: Client = { name: "",
                  cpf: "",
                birthDate: "",
              phones: []};

  constructor(private modalService: NgbModal,
              private clientsService: ClientsService) { 
                let client1: Client ={ name: "Ivan",
                              cpf: "11144477735",
                            birthDate: "26/06/1999",
                          phones: ["41992410365", "41991681947"]
                };

                let client2: Client ={ name: "Emanuel",
                              cpf: "11144400035",
                            birthDate: "26/06/1998",
                          phones: ["41992410365", "41991681947"]
                };
                this.clientList.push(client1);
                this.clientList.push(client2);
                this.setCurrentPageList(1);
  }

  ngOnInit(): void {
    
  }

  public openFormModal(isEditing: boolean, clientIdx: number) {
    const modalRef = this.modalService.open(UserFormComponent);

    if (isEditing) {
      let clientEdit = this.clientList[(this.page - 1) + clientIdx];
      modalRef.componentInstance.setData( "Editar informações do cliente", "fa fa-user-edit", clientEdit);

    } else {
      modalRef.componentInstance.setData( "Adicionar novo Cliente", "fa fa-user-plus", null);
    }
    
    modalRef.result.then((result) => {
      if ((result !== 'closed') && (result['name'] || result['cpf']))  {
        const cpfInvalid = this.clientList.find((clientObj) => clientObj.cpf === result.cpf);
        if (cpfInvalid === undefined) {
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
