import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirm } from 'src/app/shared/Modal/modal-confirm.component';

@Component({
  selector: 'home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public logout() {
    const modalRef = this.modalService.open(ModalConfirm);

    modalRef.componentInstance.setMessage('Deseja fechar o sistema?', 'Logout', true);

    modalRef.result.then(
      result => {
        if (result === 'OK') {
          sessionStorage.removeItem('authToken');
          this.router.navigate(['login']);
        }

        if (result === 'CANCEL') {
        }
      },
      () => {}
    );
    
  }

}
