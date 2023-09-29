import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FinanceComponent } from "./finance-app";

const routes : Routes = [
    {
        path : "finance", 
        component : FinanceComponent,
        
    }
]
@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ],
    exports : [RouterModule]
})
export class financeRoutingModule{

}