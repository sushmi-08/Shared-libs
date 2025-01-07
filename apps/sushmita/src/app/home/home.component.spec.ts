// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HomeComponent } from './home.component';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HomeComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { userAction } from '@shared-libs/shared-lib';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: Store;
  let mockRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HomeComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store);
    mockRouter = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty email and password initially', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
  });

  it('should dispatch userLogin action on form submission', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    component.email = 'test@example.com';
    component.password = 'password123';

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      userAction.userLogin({ email: 'test@example.com', password: 'password123' })
    );
  });

  it('should navigate to /grocery after form submission', () => {
    const navigateSpy = jest.spyOn(mockRouter, 'navigate');
    component.email = 'test@example.com';
    component.password = 'password123';

    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith(['/grocery']);
  });

  it('should bind email and password inputs correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const emailInput = compiled.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordInput = compiled.querySelector('input[name="password"]') as HTMLInputElement;

    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.email).toBe('test@example.com');
    expect(component.password).toBe('password123');
  });
});
