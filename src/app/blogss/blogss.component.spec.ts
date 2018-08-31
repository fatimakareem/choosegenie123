import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogssComponent } from './blogss.component';

describe('BlogssComponent', () => {
  let component: BlogssComponent;
  let fixture: ComponentFixture<BlogssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
