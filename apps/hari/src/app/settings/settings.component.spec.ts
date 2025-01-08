// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { SettingsComponent } from './settings.component';

// describe('SettingsComponent', () => {
//   let component: SettingsComponent;
//   let fixture: ComponentFixture<SettingsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [SettingsComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(SettingsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { CommonModule } from '@angular/common';

describe('SettingsComponent (Standalone)', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [], // Declare the standalone component
      imports: [CommonModule,SettingsComponent], // Import necessary modules (CommonModule is required for built-in directives like ngIf, ngFor)
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection to render the component
  });

  it('should create the SettingsComponent', () => {
    expect(component).toBeTruthy(); // Ensure the component instance is created successfully
  });
});

