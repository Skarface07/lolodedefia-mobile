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
import lomeZones from "../../data/lomeZones";
import SelectModal from "../../components/SelectModal";
import MultiSelectModal from "../../components/MultiSelectModal";
import { useAuth } from "../../context/AuthContext";

const SKILL_OPTIONS = [
  "Garde d'enfants",
  "Ménage",
  "Chauffeur",
  "Aide aux aînés",
  "Cours particuliers",
  "Jardinage",
  "Bricolage",
];

export default function RegisterScreen({ navigation }) {
  const { role, register, error, loading } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zone, setZone] = useState(null);
  const [skills, setSkills] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordsMatch = password.length >= 6 && password === confirmPassword;
  const canSubmit =
    name.trim().length > 1 &&
    phone.trim().length >= 8 &&
    zone &&
    passwordsMatch &&
    (role !== "youth" || skills.length > 0);

  const submit = async () => {
    if (!canSubmit) return;
    await register({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      password,
      role: role === "family" ? "FAMILY" : "YOUTH",
      zone,
      skills: role === "youth" ? skills.join(",") : null,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>
        <Text style={[typography.h2, { marginLeft: spacing.sm }]}>
          Créer un compte
        </Text>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          padding: spacing.md,
          paddingBottom: spacing.xl,
        }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.badge}>
          {role === "family" ? "Famille / Entreprise" : "Jeune prestataire"}
        </Text>

        <Text style={styles.label}>Nom complet</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex. Ama Koffi"
          placeholderTextColor={colors.grayLight}
          value={name}
          onChangeText={setName}
        />

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

        <Text style={styles.label}>Email (optionnel)</Text>
        <TextInput
          style={styles.input}
          placeholder="exemple@email.com"
          placeholderTextColor={colors.grayLight}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>
          {role === "family" ? "Zone" : "Zone principale d'intervention"}
        </Text>
        <SelectModal
          label="Choisir un quartier"
          value={zone}
          options={lomeZones}
          onSelect={setZone}
          placeholder="Sélectionner un quartier de Lomé"
        />

        {role === "youth" && (
          <>
            <Text style={styles.label}>Compétences</Text>
            <MultiSelectModal
              label="Choisir vos compétences"
              values={skills}
              options={SKILL_OPTIONS}
              onChange={setSkills}
              placeholder="Sélectionner vos compétences"
            />
          </>
        )}

        <Text style={styles.label}>Mot de passe</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.phoneInput}
            placeholder="6 caractères minimum"
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

        <Text style={styles.label}>Confirmer le mot de passe</Text>
        <TextInput
          style={[
            styles.input,
            confirmPassword.length > 0 && !passwordsMatch && styles.inputError,
          ]}
          placeholder="Retapez le mot de passe"
          placeholderTextColor={colors.grayLight}
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {confirmPassword.length > 0 && !passwordsMatch && (
          <Text style={styles.errorText}>
            Les mots de passe ne correspondent pas (6 caractères minimum).
          </Text>
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.cta, (!canSubmit || loading) && styles.ctaDisabled]}
          disabled={!canSubmit || loading}
          onPress={submit}
        >
          <Text style={styles.ctaText}>
            {loading ? "Création en cours..." : "Créer mon compte"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: spacing.md, alignItems: "center" }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{ color: colors.primary, fontSize: 13, fontWeight: "600" }}
          >
            Déjà un compte ? Se connecter
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
  badge: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 12,
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.dark,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 46,
    fontSize: 14,
    color: colors.dark,
  },
  inputError: { borderColor: colors.danger },
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
  errorText: { color: colors.danger, fontSize: 11, marginTop: 4 },
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
