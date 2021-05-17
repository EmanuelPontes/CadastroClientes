import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Client } from "../models/user";

@Injectable({ providedIn: 'root' })
export class ClientsService {
    API_URL = environment.apiUrl;
    
    constructor(private http: HttpClient) {}

    public postClient(client: Client) {
        return this.http.post(`${this.API_URL}/newclient`, client).pipe(retry(1));
    }

    public putClient(client: Client) {
        return this.http.put(`${this.API_URL}/updateclient`, client).pipe(retry(1));
    }

    public getClientList() {
        return this.http.get<Array<Client>>(`${this.API_URL}/clientlist`).pipe(retry(1));
    }
}