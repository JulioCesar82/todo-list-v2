import React, { useState, useEffect, useRef } from 'react';
import '@project/components/login-form';
import '@project/components/app-shell';
import '@project/components/todo-screen';
import { sessionService } from '@project/data';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionService.isAuthenticated());
  const loginFormRef = useRef(null);
  const appShellRef = useRef(null);

  const handleLoginSuccess = (event) => {
    console.log('React App: Login OK', event.detail);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log('React App: Logout');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const loginForm = loginFormRef.current;
    const appShell = appShellRef.current;
    const handleSessionChange = (event) => {
      if (event === 'logged-out') {
        handleLogout();
      }
    };
    
    loginForm?.addEventListener('login-success', handleLoginSuccess);
    const unsubscribe = sessionService.onChange(handleSessionChange);

    return () => {
      loginForm?.removeEventListener('login-success', handleLoginSuccess);
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Aplicação React</h1>
      {isAuthenticated ? (
        <app-shell ref={appShellRef}>
            <todo-screen></todo-screen>
        </app-shell>
      ) : (
        <login-form ref={loginFormRef}></login-form>
      )}
    </div>
  );
}

export default App;
