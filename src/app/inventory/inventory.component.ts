import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { InventoryService } from "./inventory.service";

interface question {
  id: number;
  topic: string;
  subtopic: string;
  question: string;
  answer: string;
}

@Component({
  selector: "inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.css"],
})
export class InventoryComponent implements OnInit {
  id = 1;
  topic = "Java";
  subtopic = "Gradle";
  question = "What are the benefits of working with Gradle";
  answer = "Best features of both Ant and Maven, highly scalable";
  selectedIndex = 1;
  inventory: question[] = [
    {
      id: 1,
      topic: "Java",
      subtopic: "Gradle",
      question: "What are the benefits of working with Gradle",
      answer: "Best features of both Ant and Maven, highly scalable",
    },
    {
      id: 2,
      topic: "C++",
      subtopic: "OOP",
      question: "How does virtual function dispatch work",
      answer: "Using vtable and ptr",
    },
    {
      id: 3,
      topic: "System Design",
      subtopic: "Architecture",
      question: "Benefits of client-server vs P2P",
      answer: "Client-server: less management overhead, P2P:more scalable",
    },
    {
      id: 4,
      topic: "Java",
      subtopic: "Spring",
      question: "What are the benefits of working with Spring",
      answer: "Lightweight, flexible and loose coupling",
    },
    {
      id: 5,
      topic: "Behavioural",
      subtopic: "Strengths",
      question: "What do you consider your biggest strengths",
      answer: "No fixed answer",
    },
    {
      id: 6,
      topic: "Managerial",
      subtopic: "Team Management",
      question: "Would you call yourself a team player",
      answer: "No fixed answer",
    },
  ];
  addQuestion = false;
  interview = true;

  done = {};
  relevance = {};
  right = {};
  wrong = {};
  right_q = [];
  wrong_q = [];

  myForm = new FormGroup({
    topic: new FormControl("", []),
    subtopic: new FormControl("", []),
    question: new FormControl("", []),
    answer: new FormControl("", []),
  });

  constructor() {}

  ngOnInit() {
    this.inventory.forEach((element) => {
      this.right[element.id] = 0;
      this.wrong[element.id] = 0;
      this.relevance[element.id] = true;
    });
  }
  view(id) {
    if (id === this.inventory.length + 1) {
      this.id = this.inventory.length + 1;
      this.addQuestion = true;
      return;
    }

    this.id = id;
    this.selectedIndex = id;
    this.inventory.forEach((element) => {
      if (element.id == id) {
        this.topic = element.topic;
        this.subtopic = element.subtopic;
        this.question = element.question;
        this.answer = element.answer;
      }
    });
  }

  prevview(id) {
    if (id === this.inventory.length + 1) {
      this.id = this.inventory.length + 1;
      this.addQuestion = true;
      return;
    }
    if (id < 1) {
      return;
    }

    while (this.relevance[id] == false && id > 1) {
      --id;
    }

    this.id = id;
    this.selectedIndex = id;
    this.inventory.forEach((element) => {
      if (element.id == id) {
        this.topic = element.topic;
        this.subtopic = element.subtopic;
        this.question = element.question;
        this.answer = element.answer;
      }
    });
  }

  nextview(id) {
    if (id === this.inventory.length + 1) {
      return;
    }
    if (id < 1) {
      return;
    }

    while (this.relevance[id] == false && id <= this.inventory.length) {
      ++id;
    }

    if (id === this.inventory.length + 1) {
      return;
    }

    this.id = id;
    this.selectedIndex = id;
    this.inventory.forEach((element) => {
      if (element.id == id) {
        this.topic = element.topic;
        this.subtopic = element.subtopic;
        this.question = element.question;
        this.answer = element.answer;
      }
    });
  }

  updateInv() {
    const obj: question = {
      id: this.inventory.length + 1,
      topic: this.myForm.value.topic,
      subtopic: this.myForm.value.subtopic,
      question: this.myForm.value.question,
      answer: this.myForm.value.answer,
    };
    this.inventory.push(obj);
    this.view(obj.id);
    this.addQuestion = false;
    this.done[obj.id] = 0;
  }

  present(val, arr) {
    arr.forEach((element) => {
      if (element === val) {
        return true;
      }
    });
    return false;
  }

  addRight() {
    this.right[this.id] = 1;
    this.wrong[this.id] = 0;
    if (!this.present(this.question, this.right_q)) {
      this.right_q.push(this.question);
    }
    const index = this.wrong_q.indexOf(this.question, 0);
    if (index > -1) {
      this.wrong_q.splice(index, 1);
    }
    this.nextview(this.id + 1);
  }

  addWrong() {
    this.wrong[this.id] = 1;
    this.right[this.id] = 0;
    if (!this.present(this.question, this.wrong_q)) {
      this.wrong_q.push(this.question);
    }
    const index = this.right_q.indexOf(this.question, 0);
    if (index > -1) {
      this.right_q.splice(index, 1);
    }
    this.nextview(this.id + 1);
  }
}
