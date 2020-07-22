import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { By } from '@angular/platform-browser';

fdescribe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(component).toBeTruthy();
    expect(title.nativeElement.innerHTML).toBe('eLearning Management System');
  });

  fit('should send an event', () => {
    const val = true;
    component.clicked.subscribe((value: boolean) => {
      expect(value).toBe(val);
    });
    component.clicked.next(val);
  });

  fit('should click a button', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(component.counter).toBe(0);
    button.triggerEventHandler('click', null);
    expect(component.counter).toBe(1);
  });
});
