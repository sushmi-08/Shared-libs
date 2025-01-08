// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { DashboardComponent } from './dashboard.component';

// describe('DashboardComponent', () => {
//   let component: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [DashboardComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BusinessDataService } from '../business-data.service';
import { AuthService } from '../auth.service';
import { Business } from '../model';
import { BusinessActions, selectBusiness, selectUser, userAction } from '@shared-libs/shared-lib';
import { CommonModule } from '@angular/common';


class MockBusinessDataService {
}

class MockAuthService {
  logout() {}
}

class MockRouter {
  navigate(path: string[]) {}
}

class MockStore {
  select = jest.fn();
  dispatch = jest.fn();
}

describe('DashboardComponent (Standalone)', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;
  let router: MockRouter;
  let authService: MockAuthService;
  let businessService: MockBusinessDataService;

  beforeEach(async () => {
    store = new MockStore();
    router = new MockRouter();
    authService = new MockAuthService();
    businessService = new MockBusinessDataService();

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule,DashboardComponent],  
      providers: [
        { provide: BusinessDataService, useValue: businessService },
        { provide: Router, useValue: router },
        { provide: Store, useValue: store },
        { provide: AuthService, useValue: authService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the Dashboard component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load user data and dispatch business data loading', () => {
      const user = { data: { id: 1, name: 'John Doe' } };
      store.select.mockReturnValue(of(user)); 

      component.ngOnInit();

      expect(store.select).toHaveBeenCalledWith(selectUser);
      expect(store.dispatch).toHaveBeenCalledWith(BusinessActions.loadBusiness({ userId: 1 }));
    });

    it('should load business data and update businessData property', () => {
      const business: Business = {
        id: 1, name: 'Business 1',
        industry: '',
        revenue: 0,
        profit: 0,
        users: 0,
        subbrands: []
      };
      store.select.mockReturnValue(of(business)); 

      component.loadData();

      expect(store.select).toHaveBeenCalledWith(selectBusiness);
      expect(component.businessData).toEqual(business);
    });
  });

  describe('Methods', () => {
    it('should navigate to insights on showInsights', () => {
      const id = 1;
      const navigateSpy = jest.spyOn(router, 'navigate');
      
      component.showInsights(id);

      expect(navigateSpy).toHaveBeenCalledWith([`/insights/${id}`]);
    });

    it('should dispatch removeBusiness on removeSubbrand', () => {
      const subbrandId = 2;
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      
      component.removeSubbrand(subbrandId);

      expect(dispatchSpy).toHaveBeenCalledWith(BusinessActions.removeBusiness({ userId: 0, subbrandId }));
    });

    it('should dispatch logout action on logOut', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      const navigateSpy = jest.spyOn(router, 'navigate');
      
      component.logOut();

      expect(dispatchSpy).toHaveBeenCalledWith(userAction.logout());
      expect(dispatchSpy).toHaveBeenCalledWith(BusinessActions.emptyBusiness());
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });
  });
});

