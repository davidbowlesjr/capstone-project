import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SesComponent } from "./ses.component";

const routes : Routes = [
    {
        path : "ses", 
        component : SesComponent,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class SesRoutingModule{

}