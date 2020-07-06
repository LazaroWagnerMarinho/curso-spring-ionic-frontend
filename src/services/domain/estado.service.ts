import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoDTO } from 'src/models/estado.dto';
import { API_CONFIG } from 'src/config/api.config';
import { Injectable } from '@angular/core';

@Injectable()
export class EstadoService {
    constructor(
        public http: HttpClient
    ){}

    findAll(): Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`)
    }
}