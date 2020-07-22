import { TestBed, getTestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

fdescribe('ApiService', () => {
  let service: ApiService;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(ApiService);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterAll(() => {
    injector = null;
    service = null;
    httpMock = null;
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fdescribe('GET', () => {
    fit('should excute a GET petition', () => {
      const result = 'testing';
      service.get('/test').subscribe((resp) => {
        expect(resp).toBe(result);
      });
      const req = httpMock.expectOne(`${environment.apiEndpoint}/test`);
      expect(req.request.method).toBe('GET');
      req.flush(result);
    });

    fit('should excute a GET petition with headers', () => {
      const result = 'testing';
      const headers = new HttpHeaders({test: 'prueba'});
      service.get('/test', headers).subscribe((resp) => {
        expect(resp).toBe(result);
      });
      const req = httpMock.expectOne(`${environment.apiEndpoint}/test`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('test')).toBe('prueba');
      req.flush(result);
    });
  });

  fdescribe('POST', () => {
    fit('should excute a POST petition', () => {
      const result = 'testing';
      service.post('/test', {}).subscribe((resp) => {
        expect(resp).toBe(result);
      });
      const req = httpMock.expectOne(`${environment.apiEndpoint}/test`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({});
      req.flush(result);
    });
  });

  fdescribe('PUT', () => {
    fit('should excute a PUT petition', () => {
      const result = 'testing';
      service.put('/test', {}).subscribe((resp) => {
        expect(resp).toBeTruthy();
      });
      const req = httpMock.expectOne(`${environment.apiEndpoint}/test`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({});
      req.flush(result);
    });
  });

  fdescribe('DELETE', () => {
    fit('should excute a DELETE petition', () => {
      const result = 'testing';
      service.delete('/test').subscribe((resp) => {
        expect(resp).toBeTruthy();
      });
      const req = httpMock.expectOne(`${environment.apiEndpoint}/test`);
      expect(req.request.method).toBe('DELETE');
      req.flush(result);
    });
  });
});
