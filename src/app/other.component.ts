import { Component, ViewChild, ViewContainerRef } from "@angular/core";
import { ICellEditorAngularComp } from "ag-grid-angular/main";

@Component({
    selector: "radio-cell",
    template: `
        <button class="container" tabindex="0" (click)="onMouseDown($event)">
        tructruc
        </button>
`,
    styles: [
        `
            .container {
                width: 190px;
                height: 48px;
            }

            .container:focus {
                outline: none;
            }
        `
    ]
})
export class OtherComponent implements ICellEditorAngularComp {
    private params: any;

    private vegetables: string[];
    private favouriteVegetable: string;
    private selectedIndex: number;

    // @ViewChild("group", { read: ViewContainerRef })
    public group;

    agInit(params: any): void {
        this.params = params;
        console.log('params', params)

        
    }

    // // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    // ngAfterViewInit() {
    //     setTimeout(() => {
    //         this.group.element.nativeElement.focus();
    //     });
    //     this.selectFavouriteVegetableBasedOnSelectedIndex();
    // }

    // private selectFavouriteVegetableBasedOnSelectedIndex() {
    //     this.favouriteVegetable = this.vegetables[this.selectedIndex];
    // }

    getValue() {
        return this.favouriteVegetable;
    }

    isPopup(): boolean {
        return true;
    }

    /*
     * A little over complicated for what it is, but the idea is to illustrate how you might navigate through the radio
     * buttons with up & down keys (instead of finishing editing)
     */
    onMouseDown(event): void {
        console.log()
        let key = event.which || event.keyCode;
        if (key === 38 || key === 40) {
            this.preventDefaultAndPropagation(event);

            if (key == 38) {
                // up
                this.selectedIndex = this.selectedIndex === 0 ? this.vegetables.length - 1 : this.selectedIndex - 1;
            } else if (key == 40) {
                // down
                this.selectedIndex = this.selectedIndex === this.vegetables.length - 1 ? 0 : this.selectedIndex + 1;
            }
            //this.selectFavouriteVegetableBasedOnSelectedIndex();
        }
    }

    private preventDefaultAndPropagation(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}