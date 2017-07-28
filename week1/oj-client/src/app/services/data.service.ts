import { Injectable } from '@angular/core';
import { Problem } from "app/data-structure/problem";
import { PROBLEMS } from "app/mock-problems";

@Injectable()
export class DataService {
  problems: Problem[] = PROBLEMS;
  constructor() { }

  // get all problems
  getProblems(): Problem[] {
    return this.problems;
  }

  // get one problem 
  getProblem(id: number): Problem {
    // ES6 Feature
    return this.problems.find((problem) => problem.id === id);
  }

 }
