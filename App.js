import { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import Header from "./components/Header";

const COLORS = {
  primary: "#147db3",
  primaryDark: "#0d5277",
  background: "#eef8ff",
  surface: "#ffffff",
  textStrong: "#16324f",
  textMuted: "#52677c",
  chip: "#e4f4ff",
  chipText: "#176b9c",
  success: "#2e9d6a",
  successSoft: "#e3f7ee",
  neutral: "#8a9bb0",
  neutralSoft: "#edf1f5",
};

const PROFILE = {
  name: "Luis Fernando Kalfels",
  role: "Desenvolvedor Mobile em Formação",
  city: "Navegantes - SC",
  email: "kalfels@outlook.com",
  available: true,
  avatarUrl: "https://avatars.githubusercontent.com/u/20600691?v=4",
  bio:
    "Desenvolvedor apaixonado por tecnologia e por criar experiências digitais simples e acessíveis. Estou sempre aprendendo e transformando ideias em aplicativos.",
};

const SKILLS = ["JavaScript", "React Native", "Git & GitHub", "UI/UX Design", "HTML & CSS"];

export default function App() {
  const [likes, setLikes] = useState(0);

  const availabilityLabel = PROFILE.available
    ? "Disponível para projetos"
    : "Indisponível para projetos";

  const handleLike = () => setLikes((prev) => prev + 1);

  const handleContact = () => {
    Linking.openURL(`mailto:${PROFILE.email}`).catch(() =>
      Alert.alert("Contato", `Envie um e-mail para ${PROFILE.email}`)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Header title="Meu Perfil" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: PROFILE.avatarUrl }}
            style={styles.avatar}
            accessibilityLabel={`Foto de ${PROFILE.name}`}
          />
          <Text style={styles.name}>{PROFILE.name}</Text>
          <Text style={styles.role}>{PROFILE.role}</Text>
          <Text style={styles.location}>{PROFILE.city}</Text>

          <View style={[styles.badge, !PROFILE.available && styles.badgeOff]}>
            <View
              style={[styles.badgeDot, { backgroundColor: PROFILE.available ? COLORS.success : COLORS.neutral }]}
            />
            <Text style={[styles.badgeText, !PROFILE.available && styles.badgeTextOff]}>
              {availabilityLabel}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sobre mim</Text>
          <Text style={styles.bio}>{PROFILE.bio}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          <View style={styles.skillsWrap}>
            {SKILLS.map((skill) => (
              <View key={skill} style={styles.skill}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={handleLike}
            style={({ pressed }) => [styles.likeButton, pressed && styles.likeButtonPressed]}
          >
            <Text style={styles.likeButtonText}>Curtir</Text>
          </Pressable>
          <Text style={styles.likesText}>
            {likes} {likes === 1 ? "curtida" : "curtidas"}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={handleContact}
          style={({ pressed }) => [styles.contactButton, pressed && styles.contactButtonPressed]}
        >
          <Text style={styles.contactButtonText}>Entre em contato</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  /* Perfil */
  profileHeader: {
    alignItems: "center",
    paddingVertical: 16,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.surface,
    marginBottom: 14,
  },
  name: {
    color: COLORS.textStrong,
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
  role: {
    marginTop: 4,
    color: COLORS.textMuted,
    fontSize: 16,
    textAlign: "center",
  },
  location: {
    marginTop: 2,
    color: COLORS.textMuted,
    fontSize: 14,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.successSoft,
  },
  badgeOff: {
    backgroundColor: COLORS.neutralSoft,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 13,
    fontWeight: "600",
  },
  badgeTextOff: {
    color: COLORS.neutral,
  },

  /* Cards */
  card: {
    width: "100%",
    padding: 20,
    marginBottom: 16,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    marginBottom: 12,
    color: COLORS.textStrong,
    fontSize: 18,
    fontWeight: "700",
  },
  bio: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 23,
  },

  /* Habilidades */
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skill: {
    borderRadius: 16,
    backgroundColor: COLORS.chip,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  skillText: {
    color: COLORS.chipText,
    fontSize: 14,
    fontWeight: "600",
  },

  /* Ações */
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  likeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  likeButtonPressed: {
    backgroundColor: COLORS.chip,
  },
  likeButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
  },
  likesText: {
    color: COLORS.textMuted,
    fontSize: 15,
    fontWeight: "600",
  },
  contactButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
  },
  contactButtonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  contactButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});