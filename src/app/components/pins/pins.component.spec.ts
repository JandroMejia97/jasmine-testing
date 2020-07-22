import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinsComponent } from './pins.component';
import { RepositoryService } from 'src/app/services/repository.service';
import { PinsService } from './pins.service';
import { MatSnackBar } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Observable, Subject } from 'rxjs';
import { PINS } from 'src/app/services/mocks/pins';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

class RepositoryServiceStub {
  observer = new Subject<any>();

  getPins(): Observable<any> {
    return this.observer.asObservable();
  }

  resolvePins() {
    this.observer.next([...PINS]);
  }

  updatePin(): Observable<any> {
    return of(true);
  }
}
class PinsServiceStub {
  observer = new Subject<string>();
  $actionObserver = this.observer.asObservable();

  resolveActionObserver(action: string) {
    return this.observer.next(action);
  }
}

class MatSnackBarStub {
  open() {}
}

fdescribe('PinsComponent', () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinsComponent ],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: PinsService, useClass: PinsServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub }
      ],
      imports: [
        ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should open new tab in blank', () => {
    const open = spyOn(window, 'open');

    component.openUrl('https://calculatumenu.com');
    expect(open).toHaveBeenCalledWith('https://calculatumenu.com', '_blank');
  });

  fit('should update progress', () => {
    component.pins = PINS;
    const pin = PINS[0];
    const updatePin = spyOn((component as any).repository, 'updatePin').and.returnValue(of(true));

    const open = spyOn((component as any).snackBar, 'open');
    const pinService = TestBed.get(PinsService);
    (component as any).repository.resolvePins();
    (component as any).repository.updatePin(pin._id, pin);
    pinService.resolveActionObserver('save');

    expect(open).toHaveBeenCalledWith('Progress updated!', 'OK', {
      duration: 2000
    });
    expect(updatePin).toHaveBeenCalledWith(pin._id, pin);
  });
});
