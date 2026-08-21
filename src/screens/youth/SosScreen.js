import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";

export default function SosScreen({ navigation }) {
  const [sent, setSent] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>Assistance d'urgence</Text>
      </View>

      <View style={styles.content}>
        {!sent ? (
          <>
            <MaterialCommunityIcons name="alert-octagon-outline" size={56} color={colors.danger} />
            <Text style={styles.title}>Besoin d'aide immédiate ?</Text>
            <Text style={styles.subtitle}>
              En appuyant sur ce bouton, votre position et les détails de votre mission en cours seront envoyés à l'équipe de l'association.
            </Text>
            <TouchableOpacity style={styles.sosBtn} onPress={() => setSent(true)}>
              <Text style={styles.sosBtnText}>Envoyer l'alerte</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <MaterialCommunityIcons name="check-circle-outline" size={56} color={colors.success} />
            <Text style={styles.title}>Alerte envoyée</Text>
            <Text style={styles.subtitle}>
              L'équipe a été notifiée avec votre position. Restez si possible dans un lieu sûr en attendant d'être contacté(e).
            </Text>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.backBtnText}>Retour</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: "row", alignItems: "center", padding: spacing.md },
  content: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.xl },
  title: { fontSize: 18, fontWeight: "700", color: colors.dark, marginTop: spacing.md, textAlign: "center" },
  subtitle: { fontSize: 13, color: colors.gray, textAlign: "center", marginTop: spacing.sm, marginBottom: spacing.xl },
  sosBtn: { backgroundColor: colors.danger, borderRadius: radius.pill, paddingVertical: 16, paddingHorizontal: spacing.xl },
  sosBtnText: { color: colors.white, fontWeight: "700", fontSize: 15 },
  backBtn: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingVertical: 14, paddingHorizontal: spacing.xl },
  backBtnText: { color: colors.dark, fontWeight: "700" },
});
