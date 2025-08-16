import React, { useState, useEffect, useRef } from 'react';
import '@project/components/login-form';
import '@project/components/app-shell';
import '@project/components/todo-screen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loginFormRef = useRef(null);

  const handleLoginSuccess = (event) => {
    console.log('React App: Login OK', event.detail);
    document.cookie = `session_token=${event.detail.token}; Path=/;`;
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const loginForm = loginFormRef.current;
    loginForm?.addEventListener('login-success', handleLoginSuccess);
    return () => {
      loginForm?.removeEventListener('login-success', handleLoginSuccess);
    };
  }, []);

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Aplicação React</h1>
      {isAuthenticated ? (
        <app-shell>
            <todo-screen></todo-screen>
        </app-shell>
      ) : (
        <login-form ref={loginFormRef}></login-form>
      )}
    </div>
  );
}

export default App;