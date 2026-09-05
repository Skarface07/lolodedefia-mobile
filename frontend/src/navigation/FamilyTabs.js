import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FamilyHomeScreen from "../screens/family/FamilyHomeScreen";
import FamilyBookingsScreen from "../screens/family/FamilyBookingsScreen";
import MessagesScreen from "../screens/family/MessagesScreen";
import FamilyAccountScreen from "../screens/family/FamilyAccountScreen";
import { colors } from "../theme/theme";

const Tab = createBottomTabNavigator();

const icons = {
  Accueil: "home",
  "Mes demandes": "calendar-outline",
  Messages: "chatbubble-ellipses-outline",
  Compte: "person-outline",
};

export default function FamilyTabs() {
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
      <Tab.Screen name="Accueil" component={FamilyHomeScreen} />
      <Tab.Screen name="Mes demandes" component={FamilyBookingsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Compte" component={FamilyAccountScreen} />
    </Tab.Navigator>
  );
}
