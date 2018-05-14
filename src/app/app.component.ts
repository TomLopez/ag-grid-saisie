import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { convertToParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  title = 'app';
  columnDefs = [
    { headerName: 'Make', field: 'make', checkboxSelection: true, editable: true, cellRenderer: null },
    { headerName: 'Model', field: 'model', editable: true, cellRenderer: null },
    {
      headerName: 'Price', field: 'price',
      editable: true,
      //onCellDoubleClicked: this.onCellDoubleClicked, 
      //onCellClicked: this.onCellClicked,   
      cellRenderer: this.addDuplicateButton
    }
  ];
  gridOptions = {
    //angularCompileRows: true,
    columnDefs: this.columnDefs,
    navigateToNextCell: this.myNavigation,
    defaultColDef: {
      // set every column width
      width: 100,
      // make every column editable
      editable: true,

    },


  }


  rowData: any;

  constructor(private http: HttpClient) {

  }



  addDuplicateButton(params) {
    return '<a data-action-type="drag" ng-click="test3()">' + params.value + '</button>';
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
