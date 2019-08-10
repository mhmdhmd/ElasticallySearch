import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ItemService {

    constructor(
        private http: HttpClient
    ){}

    getItems(searchPhrase: string) {
        let headers = this.createRequestHeader();

        // put elasticsearch server ip address (or your local machine for test)
        // remember don't use "localhost"! because the android or ios emulator couldn't detect your local machine
        return this.http.get("http://172.16.45.3:3001/search?searchText=" + searchPhrase, {headers: headers});
    }

    private createRequestHeader() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
         });

        return headers;
    }
}
