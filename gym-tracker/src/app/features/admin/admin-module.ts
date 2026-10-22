import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule],
  exports: [AdminRoutingModule],
})
export class AdminModule {}
