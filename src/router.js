import { sessionService } from '@project/data';

const routes = {
    '/login': () => import('@project/components/login-form'),
    '/app': () => import('@project/components/app-shell'),
    '/app/todos': () => import('@project/components/todo-screen')
};
const componentTags = {
    '/login': 'login-form',
    '/app': 'app-shell',
    '/app/todos': 'todo-screen'
};

class Router {
    constructor(appRoot) {
        this.appRoot = appRoot;
        window.addEventListener('popstate', () => this._handleRouteChange());
    }

    navigate(path) {
        window.history.pushState({}, path, path);
        this._handleRouteChange();
    }

    async _handleRouteChange() {
        let path = window.location.pathname;
        if (!sessionService.isAuthenticated() && path !== '/login') return this.navigate('/login');
        if (sessionService.isAuthenticated() && (path === '/login' || path === '/')) return this.navigate('/app/todos');
        if (path === '/app') return this.navigate('/app/todos');

        if (path.startsWith('/app')) {
            await routes['/app']();
            const contentLoader = routes[path];
            
            const shell = document.createElement(componentTags['/app']);
            if (contentLoader) {
                await contentLoader();
                const content = document.createElement(componentTags[path]);
                shell.appendChild(content);
            }
            this.appRoot.replaceChildren(shell);
        } else {
            await routes['/login']();
            this.appRoot.replaceChildren(document.createElement(componentTags['/login']));
        }
    }
}
export const router = new Router(document.getElementById('app-root'));