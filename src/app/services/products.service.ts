import { Injectable } from '@angular/core';  
import { Http, Response } from '@angular/http';  
import { Observable } from 'rxjs/Rx';  

import { Product } from '../Product';  
@Injectable()  
export class ProductService {  
    private jsonFileURL: string = "./assets/jsonDB/";  
    constructor(private http: Http) {}  
    //    
    getProducts(jsonFile: string ): Observable < Product[] > {  
        return this.http.get(this.jsonFileURL+jsonFile).map((response: Response) => {  
            return <Product[] > response.json()  
        }).catch(this.handleError);  
    }  
    //    
    private handleError(errorResponse: Response) {  
        console.log(errorResponse.statusText);  
        return Observable.throw(errorResponse.json().error || "Server error");  
    }  
}  