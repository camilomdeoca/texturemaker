import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardMenuComponent } from './add-card-menu.component';

describe('AddCardMenuComponent', () => {
  let component: AddCardMenuComponent;
  let fixture: ComponentFixture<AddCardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCardMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
