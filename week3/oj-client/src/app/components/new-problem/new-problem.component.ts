import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from 'app/data-structure/problem';
import { DataService } from '../../services/data.service';

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  name: '',
  desc: '',
  difficulty: 'easy'
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {
  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);
  difficulties: string[] = ['easy', 'medium', 'hard', 'super'];
  constructor(private data: DataService) { }

  ngOnInit() {
  }

  addProblem() {
    // this.data.addProblem(this.newProblem);    
    this.data.addProblem(this.newProblem)
      .catch(error => console.log(error.body));
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }

}