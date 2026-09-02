import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";
import { useAuth } from "../../context/AuthContext";

const BADGE_LEVELS = ["Bronze", "Argent", "Or", "Diamant"];

export default function YouthHomeScreen({ navigation }) {
  const { user } = useAuth();
  const { missions } = useMissions();

  const myMissions = missions.filter((m) => m.youthId === user?.id);
  const toRespond = myMissions.filter(
    (m) => m.status === "en attente de confirmation"
  );
  const active = myMissions.filter((m) =>
    ["acceptée", "en_cours"].includes(m.status)
  );
  const completed = myMissions.filter((m) => m.status === "terminée");
  const earnings = completed.length * 2000;
  const levelIndex = BADGE_LEVELS.indexOf(user?.badge ?? "Bronze");
  const progress = ((levelIndex + 1) / BADGE_LEVELS.length) * 100;

  const quickActions = [
    {
      id: "planning",
      label: "Planning",
      icon: "calendar-outline",
      onPress: () => navigation.navigate("YouthMain", { screen: "Planning" }),
    },
    {
      id: "messages",
      label: "Messages",
      icon: "chatbubble-ellipses-outline",
      onPress: () => navigation.navigate("YouthMain", { screen: "Messages" }),
    },
    {
      id: "passport",
      label: "Passeport",
      icon: "qr-code-outline",
      onPress: () => navigation.navigate("YouthMain", { screen: "Passeport" }),
    },
    {
      id: "academy",
      label: "Académie",
      icon: "school-outline",
      onPress: () => navigation.navigate("Academy"),
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>
                Bonjour {user?.name?.split(" ")[0]} 👋
              </Text>
              <Text style={styles.subGreeting}>
                Voici votre activité du moment
              </Text>
            </View>
            <TouchableOpacity style={styles.bellBtn}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color={colors.dark}
              />
              {toRespond.length > 0 && <View style={styles.bellDot} />}
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons name="star" size={16} color={colors.accentGold} />
              <Text style={styles.statValue}>{user?.rating}</Text>
              <Text style={styles.statLabel}>Note</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons
                name="medal-outline"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.statValue}>{user?.badge}</Text>
              <Text style={styles.statLabel}>Statut</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons
                name="check-decagram-outline"
                size={16}
                color={colors.success}
              />
              <Text style={styles.statValue}>{completed.length}</Text>
              <Text style={styles.statLabel}>Missions</Text>
            </View>
          </View>

          <View style={styles.earningsCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.earningsLabel}>
                Gains cumulés (estimation)
              </Text>
              <Text style={styles.earningsValue}>
                {earnings.toLocaleString("fr-FR")} F
              </Text>
            </View>
            <View style={styles.progressWrap}>
              <Text style={styles.progressLabel}>
                Progression vers {BADGE_LEVELS[Math.min(levelIndex + 1, 3)]}
              </Text>
              <View style={styles.progressTrack}>
                <View
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.quickActionsRow}>
          {quickActions.map((a) => (
            <TouchableOpacity
              key={a.id}
              style={styles.quickAction}
              onPress={a.onPress}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name={a.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.quickActionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ paddingHorizontal: spacing.md }}>
          {toRespond.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Nouvelles propositions</Text>
              {toRespond.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.newCard}
                  onPress={() =>
                    navigation.navigate("MissionDetail", { missionId: item.id })
                  }
                >
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>Nouvelle demande</Text>
                  </View>
                  <Text style={styles.service}>{item.service}</Text>
                  <Text style={styles.meta}>
                    {item.zone} · {item.date} · {item.budget}
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          <Text style={[styles.sectionTitle, { marginTop: spacing.md }]}>
            Missions en cours
          </Text>
          {active.length === 0 ? (
            <View style={styles.emptyBox}>
              <MaterialCommunityIcons
                name="briefcase-outline"
                size={28}
                color={colors.grayLight}
              />
              <Text style={styles.emptyText}>
                Aucune mission en cours pour le moment.
              </Text>
            </View>
          ) : (
            active.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("CheckInOut", { missionId: item.id })
                }
              >
                <View style={styles.cardIconWrap}>
                  <MaterialCommunityIcons
                    name="briefcase-check-outline"
                    size={18}
                    color={colors.primary}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: spacing.sm }}>
                  <Text style={styles.service}>{item.service}</Text>
                  <Text style={styles.meta}>
                    {item.zone} · {item.date}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.grayLight}
                />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  header: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  greeting: { fontSize: 18, fontWeight: "800", color: colors.dark },
  subGreeting: { fontSize: 12, color: colors.gray, marginTop: 2 },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  bellDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.accentGold,
  },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    alignItems: "center",
    paddingVertical: spacing.sm,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.dark,
    marginTop: 4,
  },
  statLabel: { fontSize: 10, color: colors.gray, marginTop: 1 },
  earningsCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  earningsLabel: { fontSize: 11, color: colors.gray },
  earningsValue: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.primary,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  progressWrap: {},
  progressLabel: { fontSize: 10, color: colors.gray, marginBottom: 4 },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    backgroundColor: colors.accentGold,
    borderRadius: 3,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  quickAction: { alignItems: "center", flex: 1 },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  quickActionLabel: { fontSize: 10, color: colors.dark, fontWeight: "600" },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.dark,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  newCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  newBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.accentGold,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  newBadgeText: { color: colors.white, fontSize: 10, fontWeight: "700" },
  service: { fontSize: 14, fontWeight: "700", color: colors.white },
  meta: { fontSize: 11, color: "#DFF3E8", marginTop: 2 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyBox: { alignItems: "center", paddingVertical: spacing.lg },
  emptyText: { fontSize: 12, color: colors.gray, marginTop: spacing.sm },
});
