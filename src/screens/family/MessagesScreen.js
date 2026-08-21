import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useMissions } from "../../context/MissionsContext";

export default function MessagesScreen({ navigation }) {
  const { missions, candidates } = useMissions();
  const conversations = missions.filter((m) => m.youthId);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: spacing.md }}>
        <Text style={typography.h1}>Messages</Text>
      </View>

      {!conversations.length ? (
        <View style={styles.empty}>
          <MaterialCommunityIcons name="chat-outline" size={44} color={colors.primary} />
          <Text style={[typography.caption, { marginTop: spacing.sm, textAlign: "center" }]}>
            Vos conversations avec les prestataires apparaîtront ici une fois une mission confirmée.
          </Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ paddingHorizontal: spacing.md }}
          renderItem={({ item }) => {
            const youth = candidates.find((c) => c.id === item.youthId);
            return (
              <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate("Chat", { missionId: item.id })}
              >
                <View style={styles.avatar}>
                  <MaterialCommunityIcons name="account" size={22} color={colors.white} />
                </View>
                <View style={{ marginLeft: spacing.sm, flex: 1 }}>
                  <Text style={styles.name}>{youth?.name ?? "Prestataire"}</Text>
                  <Text style={styles.preview} numberOfLines={1}>À propos de : {item.service}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.lg },
  row: {
    flexDirection: "row", alignItems: "center", paddingVertical: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  name: { fontSize: 14, fontWeight: "700", color: colors.dark },
  preview: { fontSize: 12, color: colors.gray, marginTop: 2 },
});
