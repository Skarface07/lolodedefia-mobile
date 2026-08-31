import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import { MissionsProvider } from "./src/context/MissionsContext";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MissionsProvider>
          <RootNavigator />
        </MissionsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
