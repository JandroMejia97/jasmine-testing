import { routes } from './app-routing.module';
import { PinsComponent } from './components/pins/pins.component';

fdescribe('AppRoutingModule', () => {
    fit('should have app as path', () => {
        expect(routes[0].path).toBe('app');
    });
    fit('should match with the childrens', () => {
        expect(routes[0].children).toContain({
            path: 'pins',
            component: PinsComponent
        });
    });
});
