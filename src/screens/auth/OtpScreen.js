import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useAuth } from "../../context/AuthContext";

export default function OtpScreen({ navigation }) {
  const { phone, confirmOtp } = useAuth();
  const [code, setCode] = useState("");

  const submit = () => {
    // Démo : n'importe quel code à 4 chiffres valide la connexion
    confirmOtp();
    // La navigation racine (RootNavigator) bascule automatiquement vers
    // l'espace Famille ou Jeune dès que le contexte `user` est renseigné.
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: spacing.lg }}>
        <Ionicons name="arrow-back" size={22} color={colors.dark} />
      </TouchableOpacity>

      <Text style={typography.h1}>Code de vérification</Text>
      <Text style={[typography.body, { color: colors.gray, marginTop: 4, marginBottom: spacing.lg }]}>
        Entrez le code à 4 chiffres envoyé au +228 {phone}
      </Text>

      <TextInput
        style={styles.otpInput}
        placeholder="••••"
        placeholderTextColor={colors.grayLight}
        keyboardType="number-pad"
        maxLength={4}
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.cta} onPress={submit}>
        <Text style={styles.ctaText}>Valider</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: spacing.md, alignItems: "center" }}>
        <Text style={{ color: colors.primary, fontSize: 13, fontWeight: "600" }}>Renvoyer le code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white, padding: spacing.lg },
  otpInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    height: 56,
    fontSize: 24,
    letterSpacing: 12,
    textAlign: "center",
    color: colors.dark,
  },
  cta: {
    backgroundColor: colors.primary,
    marginTop: spacing.lg,
    paddingVertical: 16,
    borderRadius: radius.pill,
    alignItems: "center",
  },
  ctaText: { color: colors.white, fontWeight: "700", fontSize: 15 },
});
