import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedChallengeDesComponent } from './detailed-challenge-des.component';

describe('DetailedChallengeDesComponent', () => {
  let component: DetailedChallengeDesComponent;
  let fixture: ComponentFixture<DetailedChallengeDesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedChallengeDesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedChallengeDesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
