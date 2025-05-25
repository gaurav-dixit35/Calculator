import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// ✅ Correct
import Calculator from "./component/Calculator/Calculator";
import Login from "./component/Auth/Login";
import ProtectedRoute from "./component/ProtectedRoute";
import { Suspense } from "react";


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/calculator"
          element={
            <ProtectedRoute>
              {(user) => <Calculator user={user} />}
            </ProtectedRoute>
          }
        />


      </Routes>
    </Router>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </BrowserRouter>

    </Suspense>
  );
}

export default App;
