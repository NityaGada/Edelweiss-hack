import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Pages from "./pages/index.js";

function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages.Home />}></Route>
          <Route path="/table1" element={<Pages.Table1 />}></Route>
          <Route path="/table2" element={<Pages.Table2 />}></Route>
          <Route path="/table3" element={<Pages.Table3 />}></Route>
          <Route path="/learn" element={<Pages.Learn />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;