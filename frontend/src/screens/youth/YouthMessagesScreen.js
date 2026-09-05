import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";
import { useAuth } from "../../context/AuthContext";

export default function YouthMessagesScreen({ navigation }) {
  const { user } = useAuth();
  const { missions } = useMissions();
  const [search, setSearch] = useState("");

  const conversations = missions
    .filter((m) => m.youthId === user?.id)
    .map((m) => ({
      ...m,
      familyName: m.requesterName || "Famille",
      preview: `À propos de la mission « ${m.service} »`,
      time: m.status === "terminée" ? "Terminé" : "Aujourd'hui",
      unread: m.status === "en attente de confirmation",
    }))
    .filter((c) =>
      search ? c.familyName.toLowerCase().includes(search.toLowerCase()) : true
    );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: spacing.md, paddingBottom: spacing.sm }}>
        <Text style={typography.h1}>Messages</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={16} color={colors.grayLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une conversation"
          placeholderTextColor={colors.grayLight}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {!conversations.length ? (
        <View style={styles.empty}>
          <View style={styles.emptyIconWrap}>
            <MaterialCommunityIcons
              name="chat-outline"
              size={40}
              color={colors.primary}
            />
          </View>
          <Text style={styles.emptyTitle}>Aucune conversation</Text>
          <Text style={styles.emptyText}>
            Vos échanges avec les familles apparaîtront ici dès qu'une mission
            sera acceptée.
          </Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ paddingHorizontal: spacing.md }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                navigation.navigate("YouthChat", { missionId: item.id })
              }
            >
              <View style={styles.avatarRing}>
                <View style={styles.avatar}>
                  <MaterialCommunityIcons
                    name="home-account"
                    size={20}
                    color={colors.white}
                  />
                </View>
              </View>
              <View style={{ marginLeft: spacing.sm, flex: 1 }}>
                <Text style={[styles.name, item.unread && styles.nameUnread]}>
                  {item.familyName}
                </Text>
                <Text
                  style={[styles.preview, item.unread && styles.previewUnread]}
                  numberOfLines={1}
                >
                  {item.preview}
                </Text>
              </View>
              <View style={styles.rightCol}>
                <Text style={styles.time}>{item.time}</Text>
                {item.unread && <View style={styles.unreadDot} />}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: radius.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    height: 42,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 13,
    color: colors.dark,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  emptyIconWrap: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.dark,
    marginBottom: 4,
  },
  emptyText: { fontSize: 13, color: colors.gray, textAlign: "center" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  separator: { height: 1, backgroundColor: colors.background, marginLeft: 56 },
  avatarRing: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { fontSize: 14, fontWeight: "600", color: colors.dark },
  nameUnread: { fontWeight: "800" },
  preview: { fontSize: 12, color: colors.gray, marginTop: 2 },
  previewUnread: { color: colors.dark, fontWeight: "600" },
  rightCol: { alignItems: "flex-end" },
  time: { fontSize: 10, color: colors.grayLight },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accentGold,
    marginTop: 6,
  },
});
