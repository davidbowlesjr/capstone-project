import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Ec2Component } from "./ec2.component";

const routes : Routes = [
    {
        path : "ec2", 
        component : Ec2Component,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class Ec2RoutingModule{

}