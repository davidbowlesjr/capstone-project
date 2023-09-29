import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SNSComponent } from "./sns.component";

const routes : Routes = [
    {
        path : "sns", 
        component : SNSComponent,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class SNSRoutingModule{

}