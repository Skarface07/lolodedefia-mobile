import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.logoCircle}>
          <MaterialCommunityIcons name="hand-heart" size={44} color={colors.white} />
        </View>
        <Text style={styles.title}>Lɔlɔ̃dedefia Fe Do</Text>
        <Text style={styles.subtitle}>
          Le réseau qui met en relation les familles / entreprises et des jeunes prestataires formés et vérifiés.
        </Text>
      </View>

      <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate("RoleSelect")}>
        <Text style={styles.ctaText}>Commencer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white, justifyContent: "space-between" },
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  title: { ...typography.h1, fontSize: 26, textAlign: "center" },
  subtitle: { ...typography.body, color: colors.gray, textAlign: "center", marginTop: spacing.sm },
  cta: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    paddingVertical: 16,
    borderRadius: radius.pill,
    alignItems: "center",
  },
  ctaText: { color: colors.white, fontWeight: "700", fontSize: 15 },
});
