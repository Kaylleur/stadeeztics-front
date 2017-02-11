import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
/**
 * Created by Thomas on 07/01/2017.
 */
const appRoutes: Routes = [
  { path : 'home', component : HomeComponent},
  { path : 'dashboard', component : DashboardComponent},
  { path : '', redirectTo : 'home', pathMatch : 'full' },
  {path : '**', component : PageNotFoundComponent}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
