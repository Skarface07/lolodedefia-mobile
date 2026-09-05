import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";

export default function ProvidersByServiceScreen({ route, navigation }) {
  const { service } = route.params;
  const { candidates } = useMissions();
  const filtered = candidates.filter((c) => c.skills.includes(service));

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>
          {service}
        </Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ProviderProfile", { youthId: item.id })
            }
          >
            <View style={styles.avatar}>
              <MaterialCommunityIcons
                name="account"
                size={28}
                color={colors.white}
              />
            </View>
            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.zone}</Text>
              <View style={styles.row}>
                <Ionicons name="star" size={12} color={colors.accentGold} />
                <Text style={styles.rating}>
                  {item.rating} ({item.reviews} avis)
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.grayLight}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              color: colors.gray,
              marginTop: spacing.xl,
            }}
          >
            Aucun prestataire disponible pour ce service pour le moment.
          </Text>
        }
      />
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { fontSize: 14, fontWeight: "700", color: colors.dark },
  meta: { fontSize: 11, color: colors.gray, marginTop: 2 },
  row: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  rating: { fontSize: 11, color: colors.gray, marginLeft: 4 },
});
