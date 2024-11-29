import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCertificateComponent } from './global-certificate.component';

describe('GlobalCertificateComponent', () => {
  let component: GlobalCertificateComponent;
  let fixture: ComponentFixture<GlobalCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
