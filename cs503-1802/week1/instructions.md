# CS503-1801 Week1 实战课1 

1. Git clone the repository

   ```bash 
   git clone https://github.com/zhewangjoe/BitTiger-CS503-1802.git
   ```

2. Create your own branch using your github username

   ```bash
   cd BitTiger-CS503-1802
   git checkout -b your-github-username
   ```

   Then check branch is created

   ```bash
   git status
   ```

3. Create week1 folder

   ```bash
   mkdir week1
   ```

4. If angular-cli is not installed, use the following command to install the angular-cli

   ```bash
   sudo npm install -g @angular/cli
   ```

5. Create oj-client using ng command

   ```bash
   cd week1
   ng new oj-client
   ```

6. To see hwo oj-client looks like, use

   ```bash
   cd oj-client
   ng serve 
   ```

   If you get error when execute ‘ng server’,

   ```bash
   npm install --save-dev @angular-devkit/core
   ```

7. The files and folders created in oj-client:

   * **package.json**: contains all dependency packages

     * devDependencies: dependencies we need when developing
     * dependencies: dependencies when public our project
     * scripts: scripts we can run on command line

   * **package_lock.json**: indicate the exact version of the packages we need

   * **.gitignore**: list files we do not upload to github

   * **node_modules**: contains all dependency packages downloaded by executing ‘npm install’

   * **.angular-cli.json**: Angular CLI Config Schema

     * root: The root directory of the app
     * ourDir: The output directory for build results
     * the detail of the file, see [here](https://github.com/angular/angular-cli/wiki/angular-cli)

   * **src**: conains all the source code. We write codes in this folder.

     * index.html: entry point. In the body of the index.html:

       ```typescript
       <body>
       	<app-root></app-root>
       </body>
       ```

       It will find a - whose selector is “app-root”.

8. When create a component, 4 files are created. For expamle

   * **app.component.ts**: component file
   * **app.component.html**: template html file 
   * **app.component.spec.ts**: this file is for testing
   * **app.component.css**: css style

9. Create problem-list component

   ```bash
   cd src/app
   mkdir components
   cd components
   ng g c problem-list
   ```

   4 files are created and 'app.module.ts' file will be modified. 

10. To see the problem-list component, modify 'app.component.html' to use 'problem-list'

   ```typescript
   <app-problem-list></app-problem-list>
   ```

   Then go to the browser to see the change. 

11. Create a folder, under ‘app’ folder,  to store the problem list

    ```bash
    cd ..
    mkdir models
    cd models
    ```

12. Create file ‘problem.model.ts’ under ‘models’ folder.

13. Define ‘Problem’ class in ‘problem.model.ts’

    ```typescript
    export class Problem {
      id: number;
      name: string;
      desc: string;
      difficulty: string;
    }
    ```

14. Import 'Problem' class into 'problem-list.component.ts' file

    ```typescript
    import { Problem } from '../../models/problem.model';
    ```

15. Then create a list contains all problems in 'problem-list.component.ts'

    ```typescript
    const PROBLEMS: Problem[] = []
    ```

    Then copy and paste all problems into the list. 

16. Use "PROBLEMS" list inside "ProblemListComponent"

    ```typescript
    export class ProblemListComponent implements OnInit {
      // private problems list inside the component
      problems: Problem[];
      
      constructor() {}
      
      ngOnInit() {
        // init problems list
        this.getProblems();
      }
      
      getProblems() {
        this.problems = PROBELMS;
      }
    }
    ```

17. Show the problems list in UI, modify the 'problem-list.component.html'. Use Bootstrap.

    ```typescript
    <div class="container">
      <div class="list-group">
      	<a class="list-group-item" *ngFor="let problem of problems">
          <span class="{{'pull-left label difficulty diff-' + problem.difficulty.toLocaleLower()}}">
            {{problem.difficulty}}
          </span>
    	  <strong class="title">{{problem.id}}. {{problem.name}}></strong>
        </a>
      </div>
     </div>
    ```

    *ngFor: loop through the problems list.

    {{}}: binding

18. Modify css style in 'problem-list.component.css' file

    ```css
    .difficult {
      min-width: 65px;
      margin-right: 18px;
    }
    .label.difficulty {
      padding-top: 0.6em;
      color: #fbfdfa;
      font-size: 12px;
    }
    .title {
      font-size: 1.2em;
    }
    .diff-easy {
      background-color: #42ebf4;
    }
    .diff-medium {
      background-color: #92cf5c;
    }
    .diff-hard {
      backgroud-color: #dd8dle;
    }
    .diff-super{
      background-color: #8d16e2;
    }
    ```

19. Don't forget to commit your code, go to the 'BitTiger-CS503-1801' directory

    ```bash
    git add .
    git commit -m 'add problem-list component'
    ```

20. Install Bootstrap and import, go to the directory where contains 'package.json'. In this case, go to 'oj-client' directory

    ```b
    npm i bootstrap@3 --save
    ```

    i: install

    save: update 'package.json' 

21. Install jquery that is the dependency of Bootstrap

    ```bas
    npm i jquery --save
    ```

22. Update '.angular-cli.json' to include jquery and bootstrap

    ```json
    "styples": [
      "styple.css",
      "../node_modules/bootstrap/dist/css/bootstrap.min.css"
    ],
    "scripts": [
      "../node_modules/jquery/dist/jquery.js",
      "../node_modules/bootstrap/dist/js/bootstrap.js"
    ]
    ```

    jquery.js should be appeared before bootstrap.js because bootstrap.js depends on jquery.js.

23. Once we modify '.anuglar-cli.json', we should restart 'ng serve' to see the changes.

    click 'ctrl + c' to kill 'ng serve', then restart 'ng serve'

    ```ba
    ng serve
    ```

24. Next steps:

    * code refactor
    * another two components
    * server side



