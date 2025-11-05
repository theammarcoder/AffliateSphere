import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// User Pages
import Home from './pages/user/Home';
import Categories from './pages/user/Categories';
import Contact from './pages/user/Contact';
import Services from './pages/user/Services';
import PrivacyPolicy from './pages/user/PrivacyPolicy';
import TermsOfService from './pages/user/TermsOfService';

// Layout
import UserLayout from './layouts/UserLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
