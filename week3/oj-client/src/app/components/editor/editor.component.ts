import { Component, OnInit } from '@angular/core';
import { CollaborationService } from '../../services/collaboration.service';
import { ActivatedRoute, Params } from '@angular/router';
declare const ace: any;


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  sessionId: string;
  editor: any;
  language: any = 'Java';
  languages: string[] = ['Java', 'Python'];

  output: string = '';

  defaultContent = {
'Java': `public class Solution {
    public static void main(String[] args) {
      System.out.println("Hello Java");
    }
}`,
'Python': `class Solution:
  def example:
    print('Hello Python')`
  };
  constructor(private collaboration: CollaborationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.initEditor();
      this.collaboration.restoreBuffer();
    })
    
  }

  initEditor() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    document.getElementsByTagName('textarea')[0].focus();
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    this.editor.on("change", (e) => {
      console.log('editor change: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    })
    
  }

  resetEditor(): void {
    console.log('Resseting editor...');
    this.editor.session.setMode(`ace/mode/${this.language.toLowerCase()}`);
    this.editor.setValue(this.defaultContent[this.language]);
    this.output = '';
  }

  setLanguage(): void {
    this.resetEditor();
  }

  submit(): void {
    this.output = '';
    const userCode = this.editor.session.getValue();
    console.log(userCode);
  }
}
