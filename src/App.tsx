import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import { DetailPage } from "./pages/DetailPage";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/car/:id" element={<DetailPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
