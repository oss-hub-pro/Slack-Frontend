import { Route, Routes } from "react-router-dom";
import Icons from "./pages/Icons";
import Slack from "./pages/slack/Index"

import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/icons" element={<Icons />} />
        <Route path="/slack/*" element={<Slack />} />
      </Routes>
    </div>
  );
}

export default App;
