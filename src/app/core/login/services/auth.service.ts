import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {

    API_URL = environment.apiUrl;
    
    constructor(private http: HttpClient) {

    }

    public login(username: string, password: string) {
        
        return this.http.post<any>(`${this.API_URL}/logme`,{ user: username, pwd: password });

    }
}