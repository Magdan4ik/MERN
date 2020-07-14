import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import 'materialize-css';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

function App() {
  const { token, login, logout, userId, ready } = useAuth();

  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if(!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <main>
          <div className="container mt-5">
            {routes}
          </div>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
