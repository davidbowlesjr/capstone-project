import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { S3Component } from "./s3.component";

const routes : Routes = [
    {
        path : "s3", 
        component : S3Component,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class S3RoutingModule{

}