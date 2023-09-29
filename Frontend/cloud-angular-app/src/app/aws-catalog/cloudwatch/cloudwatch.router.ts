import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CloudwatchComponent } from "./cloudwatch.component";

const routes : Routes = [
    {
        path : "cloudwatch", 
        component : CloudwatchComponent,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class CloudwatchRoutingModule{

}