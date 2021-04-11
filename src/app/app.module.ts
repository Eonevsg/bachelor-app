import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

//Bootsrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment';

import * as fromGuards from './guards';
import { LoginActivate } from './guards';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];


const appRoutes: Routes = [
  { path: "home", component: HomePageComponent },
  { path: "log-in", component: LogInComponent },
  { path: "registration", component: RegistrationPageComponent },
  { path: "menu", component: MenuComponent },
  { path: "services", component: ServicesPageComponent },
  { path: "blog", component: BlogComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "products", canActivate: [fromGuards.LoginActivate], loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "404" }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    RegistrationPageComponent,
    ContactComponent,
    AboutComponent,
    BlogComponent,
    ServicesPageComponent,
    MenuComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { anchorScrolling: 'enabled' }),
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgbModule
  ],
  providers: [...fromGuards.guards],
  bootstrap: [AppComponent]
})
export class AppModule { }
