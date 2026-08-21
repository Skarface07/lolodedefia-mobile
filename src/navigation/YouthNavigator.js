import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import YouthTabs from "./YouthTabs";
import MissionDetailScreen from "../screens/youth/MissionDetailScreen";
import CheckInOutScreen from "../screens/youth/CheckInOutScreen";
import SosScreen from "../screens/youth/SosScreen";
import EvaluationFamilyScreen from "../screens/youth/EvaluationFamilyScreen";
import AcademyScreen from "../screens/youth/AcademyScreen";
import ModuleDetailScreen from "../screens/youth/ModuleDetailScreen";

const Stack = createNativeStackNavigator();

export default function YouthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="YouthMain" component={YouthTabs} />
      <Stack.Screen name="MissionDetail" component={MissionDetailScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="CheckInOut" component={CheckInOutScreen} />
      <Stack.Screen name="Sos" component={SosScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="EvaluationFamily" component={EvaluationFamilyScreen} options={{ presentation: "modal" }} />
      <Stack.Screen name="Academy" component={AcademyScreen} />
      <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
    </Stack.Navigator>
  );
}
