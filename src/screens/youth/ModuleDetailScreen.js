import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";

export default function ModuleDetailScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>Module de formation</Text>
      </View>

      <View style={styles.videoPlaceholder}>
        <MaterialCommunityIcons name="play-circle-outline" size={56} color={colors.white} />
      </View>

      <View style={{ padding: spacing.md }}>
        <Text style={typography.body}>
          Contenu vidéo et quiz du module — à connecter plus tard à un vrai lecteur vidéo et à la base de contenus de formation.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cta} onPress={() => navigation.goBack()}>
          <Text style={styles.ctaText}>Marquer comme terminé</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  headerRow: { flexDirection: "row", alignItems: "center", padding: spacing.md },
  videoPlaceholder: {
    height: 200, marginHorizontal: spacing.md, borderRadius: radius.md, backgroundColor: colors.dark,
    alignItems: "center", justifyContent: "center",
  },
  footer: { padding: spacing.md, marginTop: "auto" },
  cta: { backgroundColor: colors.primary, borderRadius: radius.pill, paddingVertical: 15, alignItems: "center" },
  ctaText: { color: colors.white, fontWeight: "700" },
});
