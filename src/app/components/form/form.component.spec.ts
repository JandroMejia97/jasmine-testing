import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { RepositoryService } from 'src/app/services/repository.service';
import { of, Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { MatSnackBar } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormArray } from '@angular/forms';

export class RepositoryServiceStub {
  savePins(): Observable<boolean> {
    return of(true);
  }
}

export class NavigationServiceStub {
  goToPins(): void { }
}

export class MatSnackBarStub {
  open() {
    return {
      afterDismissed: (): Observable<boolean> => of(true)
    };
  }
}

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: NavigationService, useClass: NavigationServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
  fdescribe('ngOnInit', () => {
    fit('should create all forms', () => {
      expect(Object.keys(component.firstFormGroup.controls)).toEqual(['title', 'author', 'description']);
      expect(Object.keys(component.secondFormGroup.controls)).toEqual(['firstAsset', 'assets']);
    });
  });

  fdescribe('addAsset', () => {
    fit('should create an assets array', () => {
      const assets = <FormArray>component.secondFormGroup.get('assets');
      component.addAsset();
      component.addAsset();
      expect(assets).not.toBeNull();
      expect(assets.length).toBe(2);
    });
  });

  fdescribe('deleteAsset', () => {
    fit('should delete an asset form assets array', () => {
      const assets = <FormArray>component.secondFormGroup.get('assets');
      component.addAsset();
      component.deleteAsset(0);
      expect(assets.length).toBe(0);
    });
  });

  fdescribe('savePin', () => {
    fit('should save a pin and navigate to pins view', () => {
      const navigate = spyOn((component as any).navigate, 'goToPins');
      const open = spyOn((component as any).snackBar, 'open').and.callThrough();
      component.savePin();
      expect(navigate).toHaveBeenCalled();
      expect(open).toHaveBeenCalledWith('Your pin is saved, Redirecting ...', 'Cool!', {
        duration: 2000
      });
    });
  });
});
