import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import FamilyNavigator from "./FamilyNavigator";
import YouthNavigator from "./YouthNavigator";
import { useAuth } from "../context/AuthContext";

export default function RootNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {!user ? <AuthNavigator /> : user.type === "family" ? <FamilyNavigator /> : <YouthNavigator />}
    </NavigationContainer>
  );
}
