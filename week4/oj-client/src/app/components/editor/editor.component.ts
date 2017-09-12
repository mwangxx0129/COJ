import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CollaborationService } from '../../services/collaboration.service';

declare const ace: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  languages: string[] = ['Java', 'Python'];
  language: string = 'Java';
  sessionId: string;
  output: string = '';
  
  defaultContent = {
    'Java': `public class Example {
    public static void main(String[] args) { 
        // Type your Java code here 
        } 
    }`,
    'Python': `class Solution: 
   def example(): 
       # Write your Python code here`
  };
  constructor(private collaboration: CollaborationService,
              private route: ActivatedRoute,
              @Inject('data') private dataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // get the problem id from ActivatedRoute params
      this.sessionId = params['id'];
      this.initEditor();
    });
  }

  initEditor(): void {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();

    // set mouse focus in ace editor
    document.getElementsByTagName('textarea')[0].focus();

    // handshake socket.io
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    // register change event handler
    this.editor.on('change', e => {
      console.log('editor changed: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });

    // register changeCursor event handler
    this.editor.getSession().getSelection().on('changeCursor', () => {
      const cursor = this.editor.getSession().getSelection().getCursor();
      console.log('curser move', JSON.stringify(cursor) );
      this.collaboration.cursorMove(JSON.stringify(cursor));
    });

    // call restore buffer to get history/cached instructions
    this.collaboration.restoreBuffer();
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  resetEditor(): void {
    console.log('Resseting editor...');
    this.editor.getSession().setMode(`ace/mode/${this.language.toLowerCase()}`);
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = '';
  }

  submit() {    
    this.output = '';
    const userCodes = this.editor.getValue();
    console.log(userCodes);
    
    const codes = {
      userCodes: userCodes,
      lang: this.language.toLocaleLowerCase()
    };
    this.dataService.buildAndRun(codes)
    .then(res => this.output = res.text);
  }
}