import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LambdaComponent } from "./lambda.component";

const routes : Routes = [
    {
        path : "lambda", 
        component : LambdaComponent,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class LambdaRoutingModule{

}