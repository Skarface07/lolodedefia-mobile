import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius, typography } from "../../theme/theme";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login, error, loading } = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = phone.trim().length >= 8 && password.length >= 6;

  const submit = async () => {
    if (!canSubmit) return;
    await login({ phone: phone.trim(), password });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ margin: spacing.md, marginBottom: 0 }}
      >
        <Ionicons name="arrow-back" size={22} color={colors.dark} />
      </TouchableOpacity>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          padding: spacing.lg,
          flexGrow: 1,
          justifyContent: "center",
        }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={typography.h1}>Content de vous revoir</Text>
        <Text
          style={[
            typography.body,
            { color: colors.gray, marginTop: 4, marginBottom: spacing.lg },
          ]}
        >
          Connectez-vous pour continuer.
        </Text>

        <Text style={styles.label}>Numéro de téléphone</Text>
        <View style={styles.inputRow}>
          <Text style={styles.prefix}>+228</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="90 00 00 00"
            placeholderTextColor={colors.grayLight}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <Text style={styles.label}>Mot de passe</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.phoneInput}
            placeholder="Votre mot de passe"
            placeholderTextColor={colors.grayLight}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={colors.gray}
            />
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.cta, (!canSubmit || loading) && styles.ctaDisabled]}
          disabled={!canSubmit || loading}
          onPress={submit}
        >
          <Text style={styles.ctaText}>
            {loading ? "Connexion..." : "Se connecter"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: spacing.md, alignItems: "center" }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={{ color: colors.primary, fontSize: 13, fontWeight: "600" }}
          >
            Pas encore de compte ? S'inscrire
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.dark,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 46,
  },
  prefix: {
    fontSize: 14,
    color: colors.dark,
    marginRight: spacing.sm,
    fontWeight: "600",
  },
  phoneInput: { flex: 1, fontSize: 14, color: colors.dark },
  errorText: { color: colors.danger, fontSize: 12, marginTop: spacing.sm },
  cta: {
    backgroundColor: colors.primary,
    marginTop: spacing.lg,
    paddingVertical: 16,
    borderRadius: radius.pill,
    alignItems: "center",
  },
  ctaDisabled: { backgroundColor: colors.grayLight },
  ctaText: { color: colors.white, fontWeight: "700", fontSize: 15 },
});
