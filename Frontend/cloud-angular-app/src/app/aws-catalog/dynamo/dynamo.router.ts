import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DynamoComponent } from "./dynamo.component";

const routes : Routes = [
    {
        path : "dynamodb", 
        component : DynamoComponent,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class DynamoRoutingModule{

}
