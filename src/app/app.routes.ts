import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'upload', component: UploadComponent, canActivate: [authGuard] },
    { path: 'access-denied', component: ErrorComponent } 
];
