import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { MissionsProvider } from "./src/context/MissionsContext";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <MissionsProvider>
        <RootNavigator />
      </MissionsProvider>
    </AuthProvider>
  );
}
