import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { MatBottomSheetRef } from '@angular/material';
import { PinsService } from '../pins/pins.service';

class MatBottomSheetRefStub<T> {
  dismiss() {}
}

class PinsServiceStub {
  resolveActionObserver(action: string) {}
}

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsComponent ],
      providers: [
        { provide: MatBottomSheetRef, useClass: MatBottomSheetRefStub },
        { provide: PinsService, useClass: PinsServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a link', () => {
    const event = new MouseEvent('click');
    const mouseEvent = spyOn(event, 'preventDefault');
    const dismiss = spyOn((component as any).bottomSheetRef, 'dismiss');
    const resolve = spyOn((component as any).pinsService, 'resolveActionOberver');
    component.openLink(event, 'ok');
    expect(mouseEvent).toHaveBeenCalled();
    expect(dismiss).toHaveBeenCalled();
    expect(resolve).toHaveBeenCalledWith('ok');
  });
});
