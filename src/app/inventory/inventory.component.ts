import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, FormGroup, NgForm, Validators} from '@angular/forms';


interface question{
  id:number
  topic:string,
  subtopic:string,
  question:string,
  answer:string
}





@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {
  id=1;
  topic="Java";
  subtopic="Gradle";
  question="What are the benefits of working with Gradle";
  answer="Best features of both Ant and Maven, highly scalable";
  selectedIndex = 1;
  inventory:question[] = [{id:1,topic:"Java",subtopic:"Gradle",question:"What are the benefits of working with Gradle",answer:"Best features of both Ant and Maven, highly scalable"},
  {id:2,topic:"C++",subtopic:"OOP",question:"How does virtual function dispatch work",answer:"Using vtable and ptr"},
  {id:3,topic:"System Design",subtopic:"Architecture",question:"Benefits of client-server vs P2P",answer:"Client-server: less management overhead, P2P:more scalable"}]
  addQuestion=false;

  done = {}

  ngOnInit() {
    this.inventory.forEach(element => {
      this.done[element.id] = 0
    });
  }

  myForm = new FormGroup({
    topic: new FormControl('', []),
    subtopic: new FormControl('', []),
    question: new FormControl('', []),
    answer: new FormControl('', [])
  });


view(id) {
  if (id===this.inventory.length + 1)
  {
    this.id = this.inventory.length + 1;
    this.addQuestion = true
    return
  }
  if(id<1){return}

 
this.id = id;
this.selectedIndex = id;
this.inventory.forEach(element => {
  if(element.id == id)
  {
    this.topic = element.topic;
    this.subtopic = element.subtopic;
    this.question = element.question;
    this.answer = element.answer;
  }
});

}


nextview(id) {
  if (id===this.inventory.length + 1)
  {
    return
  }
  if(id<1){return}

 
this.id = id;
this.selectedIndex = id;
this.inventory.forEach(element => {
  if(element.id == id)
  {
    this.topic = element.topic;
    this.subtopic = element.subtopic;
    this.question = element.question;
    this.answer = element.answer;
  }
});

}

updateInv() {
 let obj:question = {id:this.inventory.length+1,topic: this.myForm.value.topic,subtopic: this.myForm.value.subtopic,question: this.myForm.value.question,answer:this.myForm.value.answer}
 this.inventory.push(obj)
 this.view(obj.id)
 this.addQuestion = false
 this.done[obj.id] = 0
}

}
