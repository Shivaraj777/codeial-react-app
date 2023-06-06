import {Home, Login, SignUp, Settings} from '../pages';
import {Loader, Navbar} from './';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks';

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
        <Route excat path='/sign-up' element={<SignUp />} />
        <Route exact path='/user/settings' element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
