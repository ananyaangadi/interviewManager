import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';
import { JobService } from '../job.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";
import { ISchedule } from './schedule.interface';


export interface RowElement {
  jbId: number;
  jbDept: string;
  jbDesig: string;
  jbPostDate: string;
  jbSubDept: string;
  jbHmName: string;
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
  jbId: number
 jbDesig: string
 jbDept: string
 jbSubDept: string
 jbHmName: string
 jbPostDate:string

  newreq = false
  expandView = false
  expandUpload = false
  expandPanelistDBoard = false
  showPortal = false
  openJobList: RowElement[];
  panelists = ['Jane Austen', 'Virginia Woolf', 'Ruth Ware']
  candidateTimeSlot={};
  candidates = {}
  availablePanelists = []
  selectedPanelist={}
  selectedSlot={}

  slots = {'Jane Austen': ['21/02/22: 10:30 to 11:15', '21/02/22: 14:30 to 15:15'], 'Virginia Woolf': ['21/02/22: 13:00 to 13:45', '22/02/22: 16:30 to 17:15'], 'Ruth Ware': ['22/02/22: 9:00 to 9:45', '23/02/22: 16:30 to 17:15']}
  slotsDisplayed = [];
  displayedColumns: string[] = ['jbId', 'jbDept', 'jbSubDept', 'jbDesig', 'jbPostDate','jbHmName'];
  displayedColumns2: string[] = ['select', 'canId', 'canName', 'canQual', 'canStatus', 'R1', 'R2', 'R3', 'to_be_scheduled', 'panelist', 'slot'];

  foods = ['1:Java Developer', '2:UI/UX Designer', '3:Data Engineer']
  dataSource: MatTableDataSource<RowElement>;
  dataSource2: MatTableDataSource<any>;
time:""
panelistSlots = {}

  menuItems = [
    { path: '/dashboard', title: 'View',  icon: 'dashboard', class: '' },
    { path: '/dashboard', title: 'Upload',  icon: 'add', class: '' },
  ];
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private JobService:JobService, private toast:ToastrService) { }
  ngOnInit() {
    this.openJobList = []
    // var headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');
    this.selection = new SelectionModel<Candidate>(allowMultiSelect, initialSelection);
    this.getOpenJobPositions();
    var hello = [{'jbId':1,'jbDept':'A','jbSubDept':'A','jbDesig':'A','jbPostDate':'A','jbHmName':'A'}]
    //this.dataSource = new MatTableDataSource(hello);
    console.log("ere2")
    console.log(this.dataSource)

    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onJobSelect(id) {
    this.showDetails = true;
    this.showJobTable = false;
    this.selectedJob = id;
    this.openJobList.forEach(element => {
      if(id == element.jbId)
      {
        this.jbId = id
        this.jbDept = element.jbDept
        this.jbDesig = element.jbDesig
        this.jbSubDept = element.jbSubDept
        this.jbHmName = element.jbHmName
        this.jbPostDate = element.jbPostDate
      }
    });

    var temp = []
    
    

    this.candidates[id].forEach(element => {
      var row = {can:{canId:1},panelistId:[],panelistNames:[]}
      row.can = element.can
      console.log("here1")
      console.log(row.can.canId)
      this.candidateTimeSlot[row.can.canId] = ""
      console.log("here2")
      element.pnlDetList.forEach(ele => {
        row.panelistId.push(ele.pnl.pnlId)
        row.panelistNames.push(ele.pnl.pnlName)

        var slots = []
        var json = JSON.parse(ele.pnl.pnlTimeSlot);
        json["TIMESLOT"].forEach(element => {
          element["TIME"].forEach(ele => {
              var str="" +element["DATE"] +" " +ele["START_TIME"]+" " + json["TIMEZONE"]
              slots.push(str)
          });
        });
        this.panelistSlots[ele.pnl.pnlId] = slots
      });
      temp.push(row)
    });
    this.availablePanelists = temp
    console.log(this.availablePanelists)
    this.dataSource2 = new MatTableDataSource(temp)


  }

  setPanelist(value,names, ids,element) {
    // this.slotsDisplayed = this.slots[value]

    console.log("value=",value)
    console.log(names)
    console.log(ids)
      var index = names.indexOf(value);
      var id = ids[index]
      this.candidateTimeSlot[element.can.canId] = this.panelistSlots[id]
    console.log(this.candidateTimeSlot)
    this.selectedPanelist[element.can.canId] = value
  }

  setSlot(value,names, ids,element) {
    // this.slotsDisplayed = this.slots[value]
    this.selectedSlot[element.can.canId] = value
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

getOpenJobPositions() {
  this.JobService.getJobs().subscribe(
    (res) => {
      console.log(res)
      res.forEach(element => {
        var obj:RowElement = {
          jbId: 0,
          jbDept: '',
          jbDesig: '',
          jbPostDate: '',
          jbSubDept: '',
          jbHmName: ''
        }
        obj.jbId= element.job.jbId
        obj.jbDept = element.job.jbDept
        obj.jbDesig = element.job.jbDesig
        obj.jbPostDate = element.job.jbPostDate
        obj.jbSubDept = element.job.jbSubDept
        obj.jbHmName = element.job.jbHmName

        this.candidates[obj.jbId] = element.canDetList
        console.log("here")

        this.openJobList.push(obj)
        console.log(this.openJobList)

        this.dataSource = new MatTableDataSource(this.openJobList);



      });
      
    },
    (error) => {
      console.log(error);
    }
  );
}

schedule() {
  var to_be_scheduled = this.selection.selected
  console.log(to_be_scheduled)

  to_be_scheduled.forEach(element => {
    var req={"candidateId":0,"round":"2","panelistId":"P34570","status":"SCHEDULE","interviewTime":""}
    req["candidateId"] = element["can"]["canId"]
    req["panelistId"] = this.selectedPanelist[element["can"]["canId"]]
    req["interviewTime"] = this.selectedSlot[element["can"]["canId"]]


    req = JSON.parse(JSON.stringify(req))
    console.log(req)

    // const payload:ISchedule = {
    //   candidateId:req["candidateId"],
    //   round:req["round"],
    //   panelistId:req['panelistId'],
    //   status:req['status'],
    //   interviewTime:req['interviewTime']
    // }
    const payload:ISchedule = {
      candidateId:3,
      round:"2",
      panelistId:"P34570",
      status:"SCHEDULE",
      interviewTime:"2022-02-01 14:00:00.000"
    }
    this.JobService.schedule(payload).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        this.toast.error(err);
      }
    );

  });
}

}


