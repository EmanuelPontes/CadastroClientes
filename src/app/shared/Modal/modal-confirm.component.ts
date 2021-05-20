import { Component } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header" [ngClass]="{'bg-warning': warning}">
    <h4 class="modal-title text-font-default" id="modal-title"><i *ngIf="warning" class="fa fa-exclamation-triangle"></i>{{title}}</h4>
  </div>
  <div class="modal-body">
    <p>{{message}}</p>

  </div>
  <div class="modal-footer">
    <div class="btn-group text-font-default">
      <button type="button" ngbAutofocus class="btn btn-outline-dark"  (click)="modal.close('OK')"><i class="fas fa-check"></i><span class="px-2">{{ok}}</span></button>
      <button type="button" class="btn btn-outline-dark" (click)="modal.close('CANCEL')"><i class="fas fa-times"></i> <span class="px-2">{{cancel}}</span></button>
    </div>
  </div>
  `
})
export class ModalConfirm {
  title = 'Excluir Registro';
  message = 'Tem certeza que deseja excluir este item?';
  ok = 'Sim';
  cancel = 'Não';
  warning = false;

  constructor(public modal: NgbActiveModal, private config: NgbModalConfig) {
    config.backdrop = 'static';
   }

  setMessage(message: string, title: string, yesNo: boolean = true, warning?: boolean) {
    this.message = message;
    this.title = title;
    if (!yesNo) {
      this.ok = 'Ok';
      this.cancel = 'Cancelar';
    }

    if (warning) {
      this.warning = warning;
    }
  }
}