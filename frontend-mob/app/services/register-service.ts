/**
 * Created by EleanorLeung on 19/03/2017.
 */

import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {GlobalVariable} from "../global";
import {Carer} from "../models/carer";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class RegisterService {
    
    constructor (private http: Http) {
    }

    private registerCarer(carer: Carer) {
        let url = GlobalVariable.BASE_API_URL + "/registerCarer";
        let headers = this.createRequestHeader();
        return this.http.post(url, JSON.stringify(carer), {headers: headers}).map(res => res.json());
    }

    private createRequestHeader() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }
}