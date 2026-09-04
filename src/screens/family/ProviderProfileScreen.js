import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";

const mockReviews = [
  {
    id: "r1",
    author: "Famille Kponou",
    note: 5,
    comment: "Très ponctuelle et attentionnée avec les enfants.",
  },
  {
    id: "r2",
    author: "Entreprise Sika",
    note: 4,
    comment: "Bon travail, communication facile.",
  },
];

export default function ProviderProfileScreen({ route, navigation }) {
  const { missionId, youthId } = route.params;
  const { candidates, chooseYouth } = useMissions();
  const youth = candidates.find((c) => c.id === youthId);

  const confirm = () => {
    navigation.navigate("Payment", { missionId, youthId });
  };

  const requestThisProvider = () => {
    navigation.navigate("NewRequest", {
      mode: "instant",
      preselectService: youth.skills[0],
    });
  };

  if (!youth) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>Profil</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons
              name="account"
              size={40}
              color={colors.white}
            />
          </View>
          <Text style={styles.name}>{youth.name}</Text>
          <View style={styles.row}>
            <Ionicons name="star" size={14} color={colors.accentGold} />
            <Text style={styles.rating}>
              {youth.rating} ({youth.reviews} avis)
            </Text>
          </View>
          <View style={styles.badgePill}>
            <MaterialCommunityIcons
              name="medal-outline"
              size={14}
              color={colors.primary}
            />
            <Text style={styles.badgeText}>Statut {youth.badge}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compétences</Text>
          <View style={styles.chipsRow}>
            {youth.skills.map((s) => (
              <View key={s} style={styles.chip}>
                <Text style={styles.chipText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formations suivies</Text>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="certificate-outline"
              size={16}
              color={colors.primary}
            />
            <Text style={styles.formationText}>
              Module 1 — Accueil et sécurité de l'enfant
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="certificate-outline"
              size={16}
              color={colors.primary}
            />
            <Text style={styles.formationText}>
              Module 3 — Premiers secours de base
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avis récents</Text>
          {mockReviews.map((r) => (
            <View key={r.id} style={styles.reviewCard}>
              <View style={styles.row}>
                <Text style={styles.reviewAuthor}>{r.author}</Text>
                <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                  {Array.from({ length: r.note }).map((_, i) => (
                    <Ionicons
                      key={i}
                      name="star"
                      size={11}
                      color={colors.accentGold}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>{r.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {missionId ? (
          <TouchableOpacity style={styles.cta} onPress={confirm}>
            <Text style={styles.ctaText}>Confirmer cette personne</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.cta} onPress={requestThisProvider}>
            <Text style={styles.ctaText}>Faire une demande</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
  },
  profileHeader: { alignItems: "center", marginBottom: spacing.lg },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  name: { fontSize: 18, fontWeight: "700", color: colors.dark },
  row: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  rating: { fontSize: 12, color: colors.gray, marginLeft: 4 },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
  },
  badgeText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: "700",
    marginLeft: 4,
  },
  section: { marginBottom: spacing.lg },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.dark,
    marginBottom: spacing.sm,
  },
  chipsRow: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { fontSize: 12, color: colors.dark },
  formationText: { fontSize: 12, color: colors.dark, marginLeft: 6 },
  reviewCard: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  reviewAuthor: { fontSize: 12, fontWeight: "700", color: colors.dark },
  reviewText: { fontSize: 12, color: colors.gray, marginTop: 4 },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cta: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: radius.pill,
    alignItems: "center",
  },
  ctaText: { color: colors.white, fontWeight: "700", fontSize: 14 },
});
