import { HttpClient } from '@angular/common/http';
import { PedidoDTO } from 'src/models/pedido.dto';
import { API_CONFIG } from 'src/config/api.config';
import { Injectable } from '@angular/core';

@Injectable()
export class PedidoService {
    constructor(
        public http: HttpClient
    ){}

    insert(obj: PedidoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}