import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";

const modules = [
  { id: "1", title: "Accueil et sécurité de l'enfant", duration: "25 min", done: true },
  { id: "2", title: "Hygiène et entretien du domicile", duration: "20 min", done: false },
  { id: "3", title: "Premiers secours de base", duration: "30 min", done: true },
  { id: "4", title: "Relation client et communication", duration: "15 min", done: false },
  { id: "5", title: "Sécurité routière (chauffeurs)", duration: "20 min", done: false },
];

export default function AcademyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: spacing.md }}>
        <Text style={typography.h1}>Académie en ligne</Text>
        <Text style={[typography.caption, { marginTop: 4 }]}>
          {modules.filter((m) => m.done).length}/{modules.length} modules complétés
        </Text>
      </View>

      <FlatList
        data={modules}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("ModuleDetail", { moduleId: item.id })}>
            <View style={[styles.iconWrap, item.done && styles.iconWrapDone]}>
              <MaterialCommunityIcons
                name={item.done ? "check-bold" : "play"}
                size={18}
                color={item.done ? colors.white : colors.primary}
              />
            </View>
            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.duration}>{item.duration}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.grayLight} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  card: {
    flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm,
  },
  iconWrap: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.primaryLight,
    alignItems: "center", justifyContent: "center",
  },
  iconWrapDone: { backgroundColor: colors.success },
  title: { fontSize: 13, fontWeight: "600", color: colors.dark },
  duration: { fontSize: 11, color: colors.gray, marginTop: 2 },
});
