import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FamilyTabs from "./FamilyTabs";
import NewRequestScreen from "../screens/family/NewRequestScreen";
import ProposalsScreen from "../screens/family/ProposalsScreen";
import ProviderProfileScreen from "../screens/family/ProviderProfileScreen";
import MissionTrackingScreen from "../screens/family/MissionTrackingScreen";
import EvaluationScreen from "../screens/family/EvaluationScreen";
import ChatScreen from "../screens/family/ChatScreen";

const Stack = createNativeStackNavigator();

export default function FamilyNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FamilyMain" component={FamilyTabs} />
      <Stack.Screen name="NewRequest" component={NewRequestScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="Proposals" component={ProposalsScreen} />
      <Stack.Screen name="ProviderProfile" component={ProviderProfileScreen} />
      <Stack.Screen name="MissionTracking" component={MissionTrackingScreen} />
      <Stack.Screen name="Evaluation" component={EvaluationScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
