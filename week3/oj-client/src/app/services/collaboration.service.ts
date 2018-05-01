import { Injectable } from '@angular/core';

declare var io: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;
  
  constructor() { }

  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, {query: 'sessionId=' + sessionId});
    this.collaborationSocket.on("change", (delta: string) => {
      console.log('collabration: editor changes by ' + delta);
      delta = JSON.parse(delta); // delta is json format
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    })
  }

  change(delta: string): void {
    this.collaborationSocket.emit('change', delta);
  }

  restoreBuffer(): void {
    this.collaborationSocket.emit('restoreBuffer');
  }
}
