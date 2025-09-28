
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Signup} from "./pages/Signup.jsx";
function App() {
  return (
    <div>
      <BrowserRouter>
       
        <Routes>
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/Signin" element={<Signin />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Send" element={<SendMoney />} /> */}
        </Routes>
      </BrowserRouter>

    </div>
    
  )
}

export default App
