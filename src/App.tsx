import "./App.css";
import HomePage from "./pages/Home";
import {Routes,Route} from 'react-router-dom'


function App() {
  return (
    <>
      <Routes>
        <Route path="/:bucode" element={<HomePage />}/>
      </Routes>
    </>
  );
}

export default App;
