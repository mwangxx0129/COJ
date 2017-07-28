import { RouterModule } from '@angular/router';

import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

export const routing = RouterModule.forRoot([
    {
        path:'',
        redirectTo: 'problem',
        pathMatch: 'full'
    }, 
    {
        path:'problem',
        component: ProblemListComponent
    },
    {
        path:'problem/:id',
        component: ProblemDetailComponent
    },
    {
        path: '**',
        redirectTo: 'problem'
    }
]);