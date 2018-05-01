import { Component, OnInit } from '@angular/core';
import { CollaborationService } from '../../services/collaboration.service';
declare const ace: any;


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  language: any = 'Java';
  languages: String[] = ['Java', 'Python'];

  output: String = '';

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
  constructor(private collaboration: CollaborationService) { }

  ngOnInit(): void {
    this.initEditor();
    this.collaboration.init();
  }

  initEditor() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.resetEditor();
    document.getElementsByTagName('textarea')[0].focus();
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
