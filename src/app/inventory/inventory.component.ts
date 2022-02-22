import { Component } from '@angular/core';


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

export class InventoryComponent {
  id=1;
  topic="";
  subtopic="";
  question="";
  answer="";
  inventory:question[] = [{id:1,topic:"Java",subtopic:"Gradle",question:"What are the benefits of working with Gradle",answer:"Best features of both Ant and Maven, highly scalable"},
  {id:2,topic:"C++",subtopic:"OOP",question:"How does virtual function dispatch work",answer:"Using vtable and ptr"},
  {id:3,topic:"System Design",subtopic:"Architecture",question:"Benefits of client-server vs P2P",answer:"Client-server: less management overhead, P2P:more scalable"}]

view(id) {
this.id = id;
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

}
