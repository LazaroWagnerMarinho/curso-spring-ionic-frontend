import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PickEnddressPage } from './pick-enddress.page';

describe('PickEnddressPage', () => {
  let component: PickEnddressPage;
  let fixture: ComponentFixture<PickEnddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickEnddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PickEnddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
