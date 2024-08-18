import React from "react";
import Approutes from "./routes/Approutes";
import { AuthProvider } from "./contexts/useAuthContext";

const App = () => {
  return (
    <div className="w-screen h-full bg-gray-100">
      <AuthProvider>
     <Approutes/>
     </AuthProvider>
    </div>
  );
};

export default App;
