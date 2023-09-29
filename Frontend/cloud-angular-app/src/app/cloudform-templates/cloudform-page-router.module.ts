import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CloudFormationTemplateComponent } from "./cloudform-templates.component";

const routes : Routes = [
    {
        path : "cloudform", 
        component : CloudFormationTemplateComponent,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class CloudFormRoutingModule{

}