import { Component, ViewChild } from "@angular/core";
import { IDateParams, PopupSelectCellEditor, EventService } from "ag-grid/main";
import { GridOptions } from "ag-grid/main";
import { COMPONENT_VARIABLE } from "@angular/platform-browser/src/dom/dom_renderer";


@Component({
    selector: 'ag-full-width-grid',
    templateUrl: 'test.component.html',
    styleUrls: ['test.component.css'],
})

export class TestComponent {

    public gridOptions: GridOptions;
    //private params: IDateParams;
    public dd: string = '';
    public mm: string = '';
    public yyyy: string = '';
    public hisDuplicating: boolean = false;
    public mousePointer = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
    }

    public cellDuplication = {
        cellToDuplicate: {},
        cellSelection:[]
    }

    agInit(params: any): void {
        this.params = params;
    }

    ngOnDestroy() {
        console.log(`plouf`);
    }

    test() {
        alert()
    }
    
    // mousemoveaction(e)
    // {
    //     console.log('this2', this)
    //     this.mousePointer.x2 = e.clientX; //Update the current position X
    //     this.mousePointer.y2 = e.clientY; //Update the current position Y
    //     console.log('AZEREZRGZERGZERG', this.mousePointer)

    //     this.reCalc();
    // }

    

    mousedown(e) {

        this.hisDuplicating = true;
        console.log('mousedown', e);
        let div = document.getElementById('selectionArray');
        let currentCell = {};
        currentCell['id'] = e.target.closest('div[role=gridcell]').getAttribute('col-id');
        currentCell['rowId'] = e.target.closest('div[role=row]').getAttribute('row-id');
        this.cellDuplication.cellToDuplicate = currentCell;
        let rowInfos = {};
        rowInfos['id'] = e.target.closest('div[role=row]').getAttribute('row-id');
        rowInfos['index'] = e.target.closest('div[role=row]').getAttribute('row-index');
        this.cellDuplication.cellSelection.push(rowInfos)
        //TODO : add class "duplicable" test for column restriction
        div.hidden = false; //Unhide the div
        console.log(this)


        this.mousePointer.x1 = e.clientX; //Set the initial X
        this.mousePointer.y1 = e.clientY; //Set the initial Y
        console.log('mouspojnter', this.mousePointer)
        console.log('this', this)
        this.reCalc();
        let mousemoveaction = (e) => {
            //console.log('this2', this)
            this.mousePointer.x2 = e.clientX; //Update the current position X
            this.mousePointer.y2 = e.clientY; //Update the current position Y
            //console.log('AZEREZRGZERGZERG', this.mousePointer)

            this.reCalc();
        }
        let mouseupaction = (e) => {
            console.log('mouseup', this);
            if(this.hisDuplicating){
                // this.params.api.forEachNode(function(node){
                //     console.log(node);
                // })
                document.removeEventListener('mousemove', mousemoveaction);
                let div = document.getElementById('selectionArray');
                div.style.left = '0px';
                div.style.top = '0px';
                div.style.width = '0px';
                div.style.height = '0px';
                div.hidden = true; //Hide the div
                this.mousePointer = {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                }
                document.removeEventListener('mouseup', mouseupaction);
                document.removeEventListener('mouseover', mouseover)
                this.applyDuplication();
                //this.mouseOverDetection(e);
            }
        };
        let mouseover = (e) => {
            console.log('thisover', e)
            if(this.hisDuplicating && e.target.classList.contains('overable')){
                let rowInfos = {};
                rowInfos['id'] = e.target.closest('div[role=row]').getAttribute('row-id');
                rowInfos['index'] = e.target.closest('div[role=row]').getAttribute('row-index');
                this.cellDuplication.cellSelection.push(rowInfos);
                console.log('e ', this.cellDuplication );
                console.log('tesst ', rowInfos );


            }
    
        }
        document.addEventListener('mousemove', mousemoveaction);
        document.addEventListener('mouseup', mouseupaction);
        document.addEventListener('mouseover', mouseover)

    }
    reCalc() { //This will restyle the div
        let div = document.getElementById('selectionArray');
        if (this.mousePointer.x2 != 0 && this.mousePointer.y2 != 0) {
            let x3 = Math.min(this.mousePointer.x1, this.mousePointer.x2); //Smaller X
            let x4 = Math.max(this.mousePointer.x1, this.mousePointer.x2); //Larger X
            let y3 = Math.min(this.mousePointer.y1, this.mousePointer.y2); //Smaller Y
            let y4 = Math.max(this.mousePointer.y1, this.mousePointer.y2); //Larger Y
            console.log("oenkrvmnzervbnzeùrnbmzenrb", x3, x4, y3, y4)
            div.style.left = x3 + 'px';
            div.style.top = y3 + 'px';
            div.style.width = x4 - x3 + 'px';
            div.style.height = y4 - y3 + 'px';
        }
    }

    applyDuplication(){
        console.log('le this', this)
        //let row = this.
    }

    // mouseOverDetection(event){
    //     console.log('levent', event)
    //     let x = event.clientX, y = event.clientY,
    //         elementMouseIsOver = document.elementFromPoint(x, y);
    //         console.log('currentElement', elementMouseIsOver    );
    //         let parent = elementMouseIsOver.parentNode.parentNode;
    //         console.log('go for the id',parent)
    // }
}