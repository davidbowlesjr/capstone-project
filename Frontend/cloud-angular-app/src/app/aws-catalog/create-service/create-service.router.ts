import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateServiceComponent } from "./create-service.component";

//Written By David Bowles

const routes : Routes = [
    {
        path : "create-service", 
        component : CreateServiceComponent,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class CreateServiceRoutingModule{

}