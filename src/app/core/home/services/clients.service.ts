import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Client } from "../models/user";

@Injectable({ providedIn: 'root' })
export class ClientsService {
    API_URL = environment.apiUrl;
    
    constructor(private http: HttpClient) {}

    public postClient(client: Client) {
        return this.http.post(`${this.API_URL}/clients/new`, client).pipe(retry(1));
    }

    public putClient(client: Client) {
        return this.http.put(`${this.API_URL}/clients/update/${client.id}`, client).pipe(retry(1));
    }

    public getClientList() {
        return this.http.get<Array<Client>>(`${this.API_URL}/clients/list`).pipe(retry(1),
        map((data: Array<Client>) => {
            data.forEach((dataObj) => {
                if (dataObj.birthDate !== null) {
                    let newFormat = dataObj.birthDate.split('-');
                    dataObj.birthDate = newFormat[2] + "/" + newFormat[1] + "/" + newFormat[0];
                }
                
            })

            return data;
        }));
    }
}