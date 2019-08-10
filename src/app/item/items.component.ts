import { Component, OnInit } from "@angular/core";
import { TextField } from 'tns-core-modules/ui/text-field';

import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    items: [];

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
    }

    public onTextChange(args) {
        let textField = <TextField>args.object;

        this.itemService.getItems(textField.text).subscribe((res: []) => {
            this.items = res;
        });
    }
}
