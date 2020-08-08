import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import reducers from './reducers';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import 'materialize-css';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if(!ready) {
    return <Loader />
  }

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
