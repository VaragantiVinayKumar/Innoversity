import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadchallengeComponent } from './uploadchallenge.component';

describe('UploadchallengeComponent', () => {
  let component: UploadchallengeComponent;
  let fixture: ComponentFixture<UploadchallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadchallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadchallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
