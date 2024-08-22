import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';




@NgModule({
  providers: [
    provideHttpClient(withFetch()), // Configura HttpClient para usar fetch
  ],
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
     RouterModule,
    MatToolbarModule,
    MatMenuModule,
    
   
    

  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
  MatToolbarModule,
  MatMenuModule,

  ]
})
export class MaterialModule { }
