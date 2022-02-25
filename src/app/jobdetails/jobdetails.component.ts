import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface RowElement {
  ID: number;
  Job_Title: string;
  Date_Posted: string;
  HR_HM: string;
}

interface Candidate {
  id: number
  name: string,
  status: string,
  r1_feedback: string,
  r2_feedback: string,
  r3_feedback: string,
  to_be_scheduled: string
}
interface Application {
  id: number,
  title: string,
  description: string,
  HR_HM: string,
  candidates: Array<Candidate>,
}

const ROWDATA: RowElement[] = [
  {ID: 1, Job_Title: 'Java Developer', Date_Posted: '12/01/2022', HR_HM: 'Melissa Allen'},
  {ID: 2, Job_Title: 'Data Engineer', Date_Posted: '15/02/2022', HR_HM: 'Melissa Allen'},
  {ID: 3, Job_Title: 'UI/UX Designer', Date_Posted: '23/12/2021', HR_HM: 'Melissa Allen'}
]

const applications: Application[] = [
  {id: 1, title: 'Java Developer', description: 'Skilled Java professional with Spring experience', HR_HM: 'Melissa Allen', candidates: [{id: 1, name: 'Dakota Rice', status: 'R1 completed', r1_feedback: 'Good java basics', r2_feedback: '', r3_feedback: '', to_be_scheduled: 'R2'}, {id: 2, name: 'Philip Chaney', status: 'New', r1_feedback: '', r2_feedback: '', r3_feedback: '', to_be_scheduled: 'R1'}]},
  {id: 2, title: 'Data Engineer', description: 'Industry experience in working with large amounts of data', HR_HM: 'Melissa Allen', candidates: [{id: 3, name: 'Minerva Hooper', status: 'R2 completed', r1_feedback: 'Fundamentals are clear', r2_feedback: 'Lacks depth of knowledge', r3_feedback: '', to_be_scheduled: 'R3'}, {id: 4, name: 'Sheldon McGonagall', status: 'R1 completed', r1_feedback: 'Adequate SQL Knowledge', r2_feedback: '', r3_feedback: '', to_be_scheduled: 'R2'}]},
  {id: 3, title: 'UI/UX Engineer', description: 'Experience designing responsive and user-friendly UI', HR_HM: 'Melissa Allen', candidates: [{id: 5, name: 'Sage Rodriguez', status: 'R3 completed', r1_feedback: 'Knowledgable', r2_feedback: 'Experienced', r3_feedback: 'In-depth knowledge of frontend technologies', to_be_scheduled: 'NA'}, {id: 6, name: 'Ryan McCarthy', status: 'R2 completed', r1_feedback: 'Good React knowledge', r2_feedback: 'Articulate', r3_feedback: '', to_be_scheduled: 'R3'}]},
]


const initialSelection = [];
const allowMultiSelect = true;

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.scss']
})

export class JobDetailsComponent implements OnInit {
  selection: SelectionModel<any>;
  panelOpenState = false
  showDetails = false
  showJobTable = true
  selectedJob = 1
  details = applications
  id: number
  title: string
  description: string
  HR_HM: string
  newreq = false
  expandView = false
  expandUpload = false
  expandPanelistDBoard = false
  showPortal = false
  panelists = ['Jane Austen', 'Virginia Woolf', 'Ruth Ware']

  slots = {'Jane Austen': ['21/02/22: 10:30 to 11:15', '21/02/22: 14:30 to 15:15'], 'Virginia Woolf': ['21/02/22: 13:00 to 13:45', '22/02/22: 16:30 to 17:15'], 'Ruth Ware': ['22/02/22: 9:00 to 9:45', '23/02/22: 16:30 to 17:15']}
  slotsDisplayed = [];
  displayedColumns: string[] = ['ID', 'Job_Title', 'Date_Posted', 'HR_HM'];
  displayedColumns2: string[] = ['select', 'id', 'Candidate_Name', 'Status', 'R1', 'R2', 'R3', 'to_be_scheduled', 'panelist', 'slot'];

  foods = ['1:Java Developer', '2:UI/UX Designer', '3:Data Engineer']
  dataSource: MatTableDataSource<RowElement> = new MatTableDataSource(ROWDATA);
  dataSource2: MatTableDataSource<Candidate> = new MatTableDataSource(applications[0]['candidates']);


  menuItems = [
    { path: '/dashboard', title: 'View',  icon: 'dashboard', class: '' },
    { path: '/dashboard', title: 'Upload',  icon: 'add', class: '' },
  ];
  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  ngOnInit() {

    // var headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');
    this.selection = new SelectionModel<Candidate>(allowMultiSelect, initialSelection);



    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onJobSelect(id) {
    this.showDetails = true;
    this.showJobTable = false;
    this.selectedJob = id;

    applications.forEach(element => {
      if (element.id == id) {
        this.dataSource2 = new MatTableDataSource(element.candidates)
        console.log(element.candidates[0].id)
        this.id = id
        this.title = element.title
        this.description = element.description
        this.HR_HM = element.HR_HM
      }
    });
  }

  setPanelist(value) {
    this.slotsDisplayed = this.slots[value]
  }

  /** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected == numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}


call_backend() {
  this.http.get("https://msim-services.azurewebsites.net")
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          console.log(response)
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          console.log(error)
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed 
        })
}

}


