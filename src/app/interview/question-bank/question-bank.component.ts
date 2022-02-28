import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { InterviewService } from "../interview.service";

interface question {
  id: number;
  topic: string;
  //subtopic: string;
  question: string;
  answer: string;
}

@Component({
  selector: "app-question-bank",
  templateUrl: "./question-bank.component.html",
  styleUrls: ["./question-bank.component.scss"],
})
export class QuestionBankComponent implements OnInit {
  @Output() exitInterview: EventEmitter<{
    answeredList: string[];
    unAnsweredList: string[];
  }> = new EventEmitter<{
    answeredList: string[];
    unAnsweredList: string[];
  }>();
  id = 1;
  topic = "";
  subtopic = "";
  question = "";
  answer = "";
  selectedIndex = 1;
  // inventory: question[] = [
  //   {
  //     id: 1,
  //     topic: "Java",
  //     //subtopic: "Gradle",
  //     question: "What are the benefits of working with Gradle",
  //     answer: "Best features of both Ant and Maven, highly scalable",
  //   },
  //   {
  //     id: 2,
  //     topic: "C++",
  //     //subtopic: "OOP",
  //     question: "How does virtual function dispatch work",
  //     answer: "Using vtable and ptr",
  //   },
  //   {
  //     id: 3,
  //     topic: "System Design",
  //     //subtopic: "Architecture",
  //     question: "Benefits of client-server vs P2P",
  //     answer: "Client-server: less management overhead, P2P:more scalable",
  //   },
  //   {
  //     id: 4,
  //     topic: "Java",
  //     //subtopic: "Spring",
  //     question: "What are the benefits of working with Spring",
  //     answer: "Lightweight, flexible and loose coupling",
  //   },
  //   {
  //     id: 5,
  //     topic: "Behavioural",
  //     //subtopic: "Strengths",
  //     question: "What do you consider your biggest strengths",
  //     answer: "No fixed answer",
  //   },
  //   {
  //     id: 6,
  //     topic: "Managerial",
  //     //subtopic: "Team Management",
  //     question: "Would you call yourself a team player",
  //     answer: "No fixed answer",
  //   },
  // ];
  inventory: question[] = [];
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

  constructor(
    private service: InterviewService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.service.getRecommendedQuestions("P34570").subscribe(
      (res) => {
        var temp = [];
        var id = 1;
        res.forEach((element) => {
          var temp1 = {
            id: id,
            topic: element.kbTopic,
            question: element.kbQu,
            answer: element.kbSln,
          };
          id++;
          temp.push(temp1);
        });
        this.inventory = temp;
        this.topic = this.inventory[0].topic;
        this.question = this.inventory[0].question;
        this.answer = this.inventory[0].answer;

        this.inventory.forEach((element) => {
          this.right[element.id] = 0;
          this.wrong[element.id] = 0;
          this.relevance[element.id] = true;
        });
      },
      (err) => {
        this.toast.error(err);
      }
    );
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
        //this.subtopic = element.subtopic;
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
        //this.subtopic = element.subtopic;
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
        //this.subtopic = element.subtopic;
        this.question = element.question;
        this.answer = element.answer;
      }
    });
  }

  updateInv() {
    const obj: question = {
      id: this.inventory.length + 1,
      topic: this.myForm.value.topic,
      //subtopic: this.myForm.value.subtopic,
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

  endInterview() {
    const data = {
      answeredList: this.right_q,
      unAnsweredList: this.wrong_q,
    };
    this.exitInterview.emit(data);
  }
}
