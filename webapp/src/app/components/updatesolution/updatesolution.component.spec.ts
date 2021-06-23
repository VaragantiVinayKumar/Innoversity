import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesolutionComponent } from './updatesolution.component';

describe('UpdatesolutionComponent', () => {
  let component: UpdatesolutionComponent;
  let fixture: ComponentFixture<UpdatesolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatesolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
