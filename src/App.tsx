// In App.tsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// In components using useSearchParams
import LandingPage from "./pages/LandingPage";
import LicenseAgreement from "./pages/LicenseAgreementPage";
import PrivacyPolicy from "./pages/PrivacyPolicyPage";
import TermsOfService from "./pages/TermsOfServicePage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/license" element={<LicenseAgreement />} />
          <Route path="//terms-of-service" element={<TermsOfService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
