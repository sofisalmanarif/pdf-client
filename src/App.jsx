import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ViewPdf from "./pages/ViewPdf";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-pdf/:filename" element={<ViewPdf/>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
