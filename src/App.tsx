import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SignupScreen from "./components/app/SignupScreen";
import LoginScreen from "./components/app/LoginScreen";
import DaySetupScreen from "./components/app/DaySetupScreen";
import MeetMoriScreen from "./components/app/MeetMoriScreen";
import DashboardScreen from "./components/app/DashboardScreen";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/onboarding/setup" element={<DaySetupScreen />} />
          <Route path="/onboarding/meet-mori" element={<MeetMoriScreen />} />
          <Route path="/app" element={<DashboardScreen />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
