import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarOperacionComponent } from './registrar-operacion.component';

describe('RegistrarOperacionComponent', () => {
  let component: RegistrarOperacionComponent;
  let fixture: ComponentFixture<RegistrarOperacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarOperacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarOperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
