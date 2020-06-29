import { Injectable } from '@angular/core';
import { CredenciaisDTO } from 'src/models/credencias.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/config/api.config';

@Injectable()
export class AuthService {

    constructor(
        public http: HttpClient
    ){}

    authenticate(creds : CredenciaisDTO){
        let resp = this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            });
            console.log(resp);
            return resp;
    }

}