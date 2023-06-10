import {Home, Login, SignUp, Settings, UserProfile} from '../pages';
import {Loader, Navbar} from './';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

//Private route component for which is rendered only if user is logged in
function PrivateRoute({children}) {  // children => Component(passed as props)
  const auth = useAuth();

  //if logged in return the component
  if(auth.user){
    return children;
  }

  return <Navigate replace to='/login' />
}

function App() {
  const auth = useAuth();

  //if loader is set to true, the page keeps loading 
  if(auth.loading){
    return <Loader />
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/sign-up' element={<SignUp />} />
        <Route  //using a private route
          exact 
          path='/user/settings' 
          element={<PrivateRoute>
            <Settings />
          </PrivateRoute>} />
        <Route  //using a private route
          exact 
          path='/users/:userId' 
          element={<PrivateRoute>
            <UserProfile />
          </PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;