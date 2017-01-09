import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
/**
 * Created by Thomas on 07/01/2017.
 */
const appRoutes: Routes = [
  { path : 'home', component : HomeComponent},
  { path : '', redirectTo : 'home', pathMatch : 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
