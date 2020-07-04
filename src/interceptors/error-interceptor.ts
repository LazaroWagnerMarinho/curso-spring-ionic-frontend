import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService, public alertCtrl: AlertController){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(request)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorObj = error;
                if(errorObj.error){
                    errorObj = errorObj.error;
                } 
                if (!errorObj.status){
                    errorObj = errorObj;
                }

                switch(error.status){
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;

                        default:
                            this.handleDefault(errorObj);

                }

                return throwError(errorObj);
            })
        ) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    async handle401(){ 
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Erro 401:',
            subHeader: 'falha de autenticação',
            message: 'Email ou senha incorretos.',
            backdropDismiss: false,
            buttons: ['OK']
        });
        await alert.present();
    }

    async handleDefault(errorObj){
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: `Erro ${errorObj.status}:`,
            subHeader: errorObj.error,
            message: errorObj.message,
            backdropDismiss: false,
            buttons: ['OK']
        });
        await alert.present();
        
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};