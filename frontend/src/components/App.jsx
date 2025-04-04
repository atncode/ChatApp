import NotFoundPage from './NotFoundPage.jsx';
import Navbar from './Navbar.jsx';
import Mainpage from './Mainpage.jsx';
import { Routes, Route } from 'react-router';
import 'bootstrap/scss/bootstrap.scss';

function App() {
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Mainpage />} />
          <Route path="*" element={< NotFoundPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
