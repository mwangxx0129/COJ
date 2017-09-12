import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Problem } from "app/data-structure/problem";

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
  problem: Problem;
  constructor(
    private route: ActivatedRoute,
    @Inject('data') private dataService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      // this.problem = this.dataService.getProblem(+params['id']);
      this.dataService.getProblem(+params['id'])
      .then(problem => this.problem = problem);
    })
  }

}
