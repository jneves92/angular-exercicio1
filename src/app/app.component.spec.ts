import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  describe('when list contains 5 items', () => {
    beforeEach(() => {
      component.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
      fixture.detectChanges();
    });

    it('should display the correct number of items', () => {
      const totalItems = fixture.debugElement.query(By.css('#counter')).nativeElement.textContent;
      expect(totalItems.trim()).toBe('5');
    });

    it('should toggle visibility of items when button is clicked', () => {

      const button = fixture.debugElement.query(By.css('button'));
      button.triggerEventHandler('click', null);
      fixture.detectChanges();

      let itemsContainer = fixture.debugElement.queryAll(By.directive(ChildComponent));
      expect(itemsContainer.length).toBe(0);

      button.triggerEventHandler('click', null);
      fixture.detectChanges();

      itemsContainer = fixture.debugElement.queryAll(By.directive(ChildComponent));
      expect(itemsContainer.length).toBe(5);
    });

    it('should render app-child components with correct inputs', () => {
      const children = fixture.debugElement.queryAll(By.directive(ChildComponent));
      expect(children.length).toBe(component.items.length);

      children.forEach((child, index) => {
        const childComponent = child.componentInstance as ChildComponent;
        expect(childComponent.item).toBe(component.items[index]);

        const childElement = child.nativeElement;
        expect(childElement.textContent).toContain(component.items[index]);
      });
    });

    it('should apply background color to odd-indexed children', () => {
      const children = fixture.debugElement.queryAll(By.directive(ChildComponent));

      children.forEach((child, index) => {
        const childElement = child.nativeElement;
        const hasClass = childElement.classList.contains('odd');
        expect(hasClass).toBe(index % 2 !== 0);
      });
    });
  });

  describe('when items list is empty', () => {
    beforeEach(() => {
      component.items = [];
      fixture.detectChanges();
    });

    it('should display "No items" when the list is empty', () => {
      const children = fixture.debugElement.queryAll(By.directive(ChildComponent));
      expect(children.length).toBe(1); // Deve apresentar apenas um app-child
      const firstChild = children[0].componentInstance as ChildComponent;
      expect(firstChild.item).toBe('No items'); // O texto do app-child deve ser "No items"
    });
  });

});
