import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('NavigationService', () => {
  let service: NavigationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationService],
      imports: [RouterTestingModule]
    });
    service = TestBed.get(NavigationService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should navigate go to pins', () => {
    const navigate = spyOn((service as any).router, 'navigate');
    service.goToPins();
    expect(navigate).toHaveBeenCalledWith(['/app/pins']);
  });

  fit('should navigate go to editMode', () => {
    const navigate = spyOn((service as any).router, 'navigate');
    service.goToEditMode();
    expect(navigate).toHaveBeenCalledWith(['/app/add']);
  });
});
