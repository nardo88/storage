import './App.scss';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Registration from './components/registration/Registration';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
