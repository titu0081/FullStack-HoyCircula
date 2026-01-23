import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioVehiculo } from './formulario-vehiculo';

describe('FormularioVehiculo', () => {
  let component: FormularioVehiculo;
  let fixture: ComponentFixture<FormularioVehiculo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioVehiculo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioVehiculo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
