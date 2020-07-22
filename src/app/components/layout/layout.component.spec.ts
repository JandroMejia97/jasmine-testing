import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { MatBottomSheet } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActionsComponent } from '../actions/actions.component';

export class MatBottomSheetStub {
  open(): void { }
}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      providers: [
        { provide: MatBottomSheet, useClass: MatBottomSheetStub },
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: LayoutComponent
          },
          {
            path: 'app/add',
            component: LayoutComponent
          }
        ])
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should set the editMode to false', () => {
    const editMode = spyOn(component, 'verifyEditMode').and.callThrough();
    fixture.ngZone.run(() => {
      (component as any).router.navigate(['/']);
      fixture.whenStable().then(() => {
        expect(component.editMode).toBeFalsy();
        expect(editMode).toHaveBeenCalled();
      });
    });
  });

  fit('should set the editMode to true', () => {
    const editMode = spyOn(component, 'verifyEditMode').and.callThrough();
    fixture.ngZone.run(() => {
      (component as any).router.navigate(['/app/add']);
      fixture.whenStable().then(() => {
        expect(component.editMode).toBeTruthy();
        expect(editMode).toHaveBeenCalled();
      });
    });
  });

  fit('should open a bottomsheet', () => {
    const open = spyOn((component as any).bottomSheet, 'open');
    component.openBottomSheet();
    expect(open).toHaveBeenCalledWith(ActionsComponent);
  });
});
