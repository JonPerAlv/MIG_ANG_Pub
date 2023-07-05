import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVMSNCCatPreguntasComponent } from './cvms-nc-cat-preguntas.component';

describe('CVMSNCCatPreguntasComponent', () => {
  let component: CVMSNCCatPreguntasComponent;
  let fixture: ComponentFixture<CVMSNCCatPreguntasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CVMSNCCatPreguntasComponent]
    });
    fixture = TestBed.createComponent(CVMSNCCatPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
