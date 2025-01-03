import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessDataService } from '../business-data.service';
import { Business } from '../model';
import { Router } from '@angular/router';
import { selectBusiness, selectUser} from '@shared-libs/shared-lib'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';





@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor( private businessService: BusinessDataService,private router:Router,private store:Store,private authService:AuthService){}
  username:'' | undefined
  businessData?:Business
  business$?:Observable<Business>
  ngOnInit(): void {
    // this.store.dispatch(BusinessActions.loadBusiness())
    this.store.select(selectUser).subscribe(res=>{
      this.businessData=res.data.business
      this.username=res.data.name
    })
//  this.loadBusinessData()

  }
  // loadBusinessData(): void {
  //   this.businessService.getBusinessData().subscribe(data => {
  //     this.businessData = data;
  //   });
  // }
  showInsights(id:number){
    this.router.navigate([`/insights/${id}`])
  }
  logOut(){
    this.authService.logout()
  }

}
