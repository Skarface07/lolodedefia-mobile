import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import YouthHomeScreen from "../screens/youth/YouthHomeScreen";
import AvailabilityScreen from "../screens/youth/AvailabilityScreen";
import PassportScreen from "../screens/youth/PassportScreen";
import YouthAccountScreen from "../screens/youth/YouthAccountScreen";
import { colors } from "../theme/theme";

const Tab = createBottomTabNavigator();

const icons = {
  Accueil: "home",
  Planning: "calendar-outline",
  Passeport: "qr-code-outline",
  Compte: "person-outline",
};

export default function YouthTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grayLight,
        tabBarLabelStyle: { fontSize: 11 },
        tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size ?? 20} color={color} />,
      })}
    >
      <Tab.Screen name="Accueil" component={YouthHomeScreen} />
      <Tab.Screen name="Planning" component={AvailabilityScreen} />
      <Tab.Screen name="Passeport" component={PassportScreen} />
      <Tab.Screen name="Compte" component={YouthAccountScreen} />
    </Tab.Navigator>
  );
}
