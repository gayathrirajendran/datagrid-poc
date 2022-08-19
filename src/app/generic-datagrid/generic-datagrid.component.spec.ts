import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDatagridComponent } from './generic-datagrid.component';

describe('GenericDatagridComponent', () => {
  let component: GenericDatagridComponent;
  let fixture: ComponentFixture<GenericDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericDatagridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
