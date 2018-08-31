import { Routes } from '@angular/router';

import { BlogssComponent } from './blogss.component';


export const BlogssRoutes: Routes = [
    {

        path: '',
        children: [ {
            path: '',
            component: BlogssComponent 
        }]
    }
];
