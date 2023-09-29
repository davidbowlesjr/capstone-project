import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RDSComponent } from "./rds.component";

const routes : Routes = [
    {
        path : "rds", 
        component : RDSComponent,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class RDSRoutingModule{

}