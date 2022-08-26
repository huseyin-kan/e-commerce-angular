import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductForm1Component } from './add-product-form1.component';

describe('AddProductForm1Component', () => {
  let component: AddProductForm1Component;
  let fixture: ComponentFixture<AddProductForm1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductForm1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
