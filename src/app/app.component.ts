import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { GridOptions } from 'ag-grid';
import { convertToParamMap } from '@angular/router';
import { OtherComponent } from "./other.component";
import { TestComponent } from "./test/test.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  title = 'app';
  private gridOptions: GridOptions;
  public rowData: any[];
  private columnDefs: any[];
  // public mousePointer: any;


  constructor(private http: HttpClient) {
    // this.mousePointer = {
    //   x1: 0,
    //   y1: 0,
    //   x2: 0,
    //   y2: 0
    // };

    let _this = this;
    this.columnDefs = [
      { headerName: 'Make', field: 'make', checkboxSelection: true, editable: true, cellRenderer: null },
      { headerName: 'Model', field: 'model', editable: true, cellRenderer: null },
      {
        headerName: 'Price', field: 'price',
        editable: true,
        //onCellDoubleClicked: this.onCellDoubleClicked, 
        //onCellClicked: this.onCellClicked, 
        cellClass: ['duplicable'],
        cellRenderer: this.addDuplicateButton
      },
      {
        headerName: 'Test', field: 'test', editable: true, cellRenderer: "testRenderer"
      }
    ];
    this.gridOptions = {
      // angularCompileRows: true,
      rowData: null,
      //onCellMouseDown: this.mouseDown,
      columnDefs: this.columnDefs,
      //navigateToNextCell: this.myNavigation,
      frameworkComponents: {
        testRenderer: TestComponent,        
    },
      defaultColDef: {
        // set every column width
        width: 100,
        // make every column editable
        editable: true,

      },


    }
  }

  mouseDown(e) {
    console.log('mousedown', e);
    let div = document.getElementById('selection');
    //TODO : add class "duplicable" test for column restriction
    div.hidden = false; //Unhide the div
    console.log(this)
    let mousePointer ={
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    };

    mousePointer.x1 = e.clientX; //Set the initial X
    mousePointer.y1 = e.clientY; //Set the initial Y
    console.log('this', this)
    this.reCalc(mousePointer);
    document.onmousemove = (data) => {
      console.log('this2', this)
      mousePointer.x2 = e.clientX; //Update the current position X
      mousePointer.y2 = e.clientY; //Update the current position Y
      this.reCalc(mousePointer);
    }
    document.onmouseup = (data) => {
      console.log('mouseup', this);
      let div = document.getElementById('selection');
      div.hidden = true; //Hide the div
    }
  }
  reCalc(mousePointer) { //This will restyle the div
    let div = document.getElementById('selection');
    let x3 = Math.min(mousePointer.x1, mousePointer.x2); //Smaller X
    let x4 = Math.max(mousePointer.x1, mousePointer.x2); //Larger X
    let y3 = Math.min(mousePointer.y1, mousePointer.y2); //Smaller Y
    let y4 = Math.max(mousePointer.y1, mousePointer.y2); //Larger Y
    div.style.left = x3 + 'px';
    div.style.top = y3 + 'px';
    div.style.width = x4 - x3 + 'px';
    div.style.height = y4 - y3 + 'px';
  }

  addDuplicateButton(params) {
    return params.value;
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  onCellClicked(e) {
    console.log('e', e);
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");
      switch (actionType) {
        case "view":
          return this.test(e);
        case "remove":
        //return this.test2(data);
      }
    }

  }

  onCellDoubleClicked() {
    console.log('test')
  }
  test(e) {
    alert('pk,pmkp');
    var dropper = e.event.srcElement;

    dropper.addEventListener('dragenter', function () {
      console.log('dragenter');
    });

    dropper.addEventListener('dragleave', function () {
      console.log('dragout');
    });
  }

  test3() {
    console.log('mousedowxn')
  }

  onGridReady(params) {

    this.http.get('../assets/example.json')
      .subscribe(data => {
        params.api.setRowData(data);
      });
  }
  myNavigation(params) {
    console.log(params)
    var previousCell = params.previousCellDef;
    var suggestedNextCell = params.nextCellDef;
    var _this = this
    var KEY_UP = 38;
    var KEY_DOWN = 40;
    var KEY_LEFT = 37;
    var KEY_RIGHT = 39;

    switch (params.key) {
      case KEY_DOWN:
        previousCell = params.previousCellDef;
        console.log(previousCell)
        // set selected cell on current cell + 1
        this.agGrid.api.forEachNode((node) => {
          if (previousCell.rowIndex + 1 === node.rowIndex) {
            node.setSelected(true);
          }
        });
        return suggestedNextCell;
      case KEY_UP:
        previousCell = params.previousCellDef;
        console.log(previousCell)
        // set selected cell on current cell - 1
        this.agGrid.api.forEachNode((node) => {
          if (previousCell.rowIndex - 1 === node.rowIndex) {
            node.setSelected(true);
          }
        });
        return suggestedNextCell;
      case KEY_LEFT:
      case KEY_RIGHT:
        return suggestedNextCell;
      default:
        throw "this will never happen, navigation is always on of the 4 keys above";
    }
  }
}
