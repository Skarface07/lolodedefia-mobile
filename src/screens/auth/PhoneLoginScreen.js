import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useAuth } from "../../context/AuthContext";

export default function PhoneLoginScreen({ navigation }) {
  const { role, login } = useAuth();
  const [phone, setPhone] = useState("");

  const roleLabel = role === "family" ? "Famille / Entreprise" : "Jeune prestataire";

  const submit = () => {
    if (phone.trim().length < 8) return;
    login(phone.trim());
    navigation.navigate("Otp");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={22} color={colors.dark} />
      </TouchableOpacity>

      <Text style={styles.badge}>{roleLabel}</Text>
      <Text style={typography.h1}>Votre numéro</Text>
      <Text style={[typography.body, { color: colors.gray, marginTop: 4, marginBottom: spacing.lg }]}>
        Nous vous enverrons un code de vérification par SMS.
      </Text>

      <View style={styles.inputRow}>
        <Text style={styles.prefix}>+228</Text>
        <TextInput
          style={styles.input}
          placeholder="90 00 00 00"
          placeholderTextColor={colors.grayLight}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <TouchableOpacity style={styles.cta} onPress={submit}>
        <Text style={styles.ctaText}>Recevoir le code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white, padding: spacing.lg },
  badge: { color: colors.primary, fontWeight: "700", fontSize: 12, marginBottom: 6 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  prefix: { fontSize: 15, color: colors.dark, marginRight: spacing.sm, fontWeight: "600" },
  input: { flex: 1, fontSize: 15, color: colors.dark },
  cta: {
    backgroundColor: colors.primary,
    marginTop: spacing.lg,
    paddingVertical: 16,
    borderRadius: radius.pill,
    alignItems: "center",
  },
  ctaText: { color: colors.white, fontWeight: "700", fontSize: 15 },
});
