import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DynamicServiceComponent } from "./dynamic-service.component";

//Written By David Bowles

const routes : Routes = [
    {
        path : "dynamic-service", 
        component : DynamicServiceComponent,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class DynamicServiceRoutingModule{

}