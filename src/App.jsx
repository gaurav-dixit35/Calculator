import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Calculator from "./component/Calculator/Calculator";
import Login from "./component/Auth/Login";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/calculator"
          element={
            <ProtectedRoute>
              {(user) => <Calculator user={user} />}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
