import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component41Component } from './component41.component';

describe('Component41Component', () => {
  let component: Component41Component;
  let fixture: ComponentFixture<Component41Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Component41Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Component41Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
