import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from "@angular/material";
import { HttpClientModule } from '@angular/common/http';
import {BlogssRoutes } from './blogss.routing';
import { BlogssComponent } from './blogss.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BlogssRoutes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        HttpClientModule
    ],
    declarations: [
        BlogssComponent
    ],
    providers: [

    ]
})

export class BecomeapartnerModule {}
