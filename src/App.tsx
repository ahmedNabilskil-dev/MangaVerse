// In App.tsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// In components using useSearchParams
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
