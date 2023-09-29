import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VpcComponent } from "./vpc.component";

const routes : Routes = [
    {
        path : "vpc", 
        component : VpcComponent,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class VpcRoutingModule{

}