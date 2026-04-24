import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'navbar',
  template: `<h1>test navbar</h1>`,
})
class MockNavbar {}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    })
      .overrideComponent(App, {
        add: {
          imports: [MockNavbar],
        },
        remove: {
          imports: [Navbar],
        },
      })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render navbar and outlet-router`, () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.nativeElement.querySelector('navbar')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('router-outlet')).toBeTruthy();
  });

  it('should match snapshot', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.nativeElement).toMatchSnapshot();
  });
  
});
