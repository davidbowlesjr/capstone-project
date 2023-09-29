import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SQSComponent } from "./sqs.component";

const routes : Routes = [
    {
        path : "sqs", 
        component : SQSComponent,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class SQSRoutingModule{

}