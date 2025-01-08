import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessDataService } from '../business-data.service';
import { Business } from '../model';
import { Router } from '@angular/router';
import { BusinessActions, selectBusiness, selectToken, selectUser, userAction} from '@shared-libs/shared-lib'
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
  userId=0
  username:'' | undefined
  businessData?:Business|null
  business$?:Observable<Business>
  ngOnInit(): void {
    // this.store.dispatch(BusinessActions.loadBusiness())
    // this.store.select(selectUser).subscribe(res=>{
    //   this.userId=this.username=res.data.id
    //   this.username=res.data.name
    //   this.store.dispatch(BusinessActions.loadBusiness({userId:res.data.id}))
    // })
 this.loadData()

  }
  loadData(){
    this.store.select(selectUser).subscribe(res=>{
      this.userId=this.username=res.data.id
      this.username=res.data.name
      this.store.dispatch(BusinessActions.loadBusiness({userId:res.data.id}))
    })
    this.store.select(selectBusiness).subscribe(res=>{
      this.businessData=res
      // this.business$=res
    })
  }

  showInsights(id:number){
    this.router.navigate([`/insights/${id}`])
  }
  removeSubbrand(subbrandId:any){
    this.store.dispatch(BusinessActions.removeBusiness({userId:this.userId,subbrandId:subbrandId}))
    this.store.select(selectBusiness).subscribe(res=>{
      this.businessData=res
      // this.business$=res
    })
    
  }
  logOut(){
    // this.authService.logout()
    this.store.dispatch(userAction.logout())
    this.store.dispatch(BusinessActions.emptyBusiness())
    this.router.navigate(['/'])
  }

}
