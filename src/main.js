import { sessionService } from '@project/data';
import { router } from './router.js';

document.body.addEventListener('login-success', (e) => {
    const { token } = e.detail;
    document.cookie = `session_token=${token}; Path=/; SameSite=Strict; Secure`;
    router.navigate('/app');
});

sessionService.onChange((event) => {
    if (event === 'logged-out') {
        router.navigate('/login');
    }
});

router._handleRouteChange();