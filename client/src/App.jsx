import './App.scss';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Registration from './components/registration/Registration';
import Login from './components/registration/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './actions/user';
import Disk from './components/disk/Disk';

function App() {

  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="container">
          {!isAuth ?
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="*"
                element={<Navigate to="/login" replace />}
              />
            </Routes>
            :
            <Routes>
              <Route exact path="/" element={<Disk />} />
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          }

        </div>

      </div>
    </BrowserRouter>
  )
}

export default App;

