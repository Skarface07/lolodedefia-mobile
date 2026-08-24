import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import PromoBanner from "../../components/PromoBanner";
import ServiceGrid from "../../components/ServiceGrid";
import TrustBadges from "../../components/TrustBadges";
import { colors, spacing } from "../../theme/theme";
import { popularServices, trustBadges } from "../../data/demoData";
import { useAuth } from "../../context/AuthContext";

export default function FamilyHomeScreen({ navigation }) {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <Header location={user?.name ?? "Ma position"} subtitle="Prestataires disponibles près de vous" />
        <SearchBar />

        <PromoBanner
          onInstant={() => navigation.navigate("NewRequest", { mode: "instant" })}
          onSchedule={() => navigation.navigate("PlanSchedule")}
        />

        <ServiceGrid
          services={popularServices}
          onSeeAll={() => navigation.navigate("NewRequest", { mode: "instant" })}
          onServicePress={(service) => navigation.navigate("ProvidersByService", { service })}
        />

        <TrustBadges items={trustBadges} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
});