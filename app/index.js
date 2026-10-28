import { useState, useEffect, useRef } from "react";
import {
  Animated, 
  Easing,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

import Header from "../components/Header";

const COLORS = {
  primary: "#147db3",
  secondary: "#000000",
  primaryDark: "#0d5277",
  background: "#eef8ff",
  surface: "#ffffff",
  textStrong: "#16324f",
  textMuted: "#52677c",
  chip: "#e4f4ff",
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

const SKILLS = ["JavaScript", "React Native", "Git & GitHub", "UI/UX Design", "HTML & CSS", "Expo", "Tailwind CSS", "TypeScript", "Fastlane"];

const LIMITE_RECOMENDACOES = 10;

export default function App() {
  //hooks useStates
  const [recomendations, setRecomendations] = useState(0);
  const [available, setAvailable] = useState(PROFILE.available);

  const availabilityLabel = available 
    ? "Disponível para projetos"
    : "Indisponível para projetos";

  //Animação para a bolinha de disponibilidade de projetos
  //Hook useRef
  const blink = useRef(new Animated.Value(1)).current;

  //hook useEffect 
  useEffect(() => {
    // Só pisca quando disponível; indisponível fica fixo
    if (!available) {
      blink.setValue(1);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(blink, {
          toValue: 0.2,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(blink, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop(); // limpa ao desmontar ou mudar o status
  }, [available, blink]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Header title="Meu Perfil" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* Seção do Profile */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: PROFILE.avatarUrl }}
            style={styles.avatar}
            accessibilityLabel={`Foto de ${PROFILE.name}`}
          />
          <Text style={styles.name}>{PROFILE.name}</Text>
          <Text style={styles.role}>{PROFILE.role}</Text>
          <Text style={styles.location}>{PROFILE.city}</Text>

          <View style={[styles.badge, !available && styles.badgeOff]}>
            <Animated.View
              style={[styles.badgeDot, { 
                backgroundColor: available ? COLORS.success : COLORS.neutral,
                opacity: blink,
              }]}
            />
            <Text style={[styles.badgeText, !available && styles.badgeTextOff]}>
              {availabilityLabel}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🧔🏻‍♂️ Sobre mim</Text>
          <Text style={styles.bio}>{PROFILE.bio}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/recados")}
          style={({ pressed }) => [
            styles.recadosButton,
            pressed && styles.recadosButtonPressed,
          ]}
        >
          <Text style={styles.recadosButtonText}>Ver Recados</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() =>
            router.push({
              pathname: "/habilidades",
              params: { skills: JSON.stringify(SKILLS) },
            })
          }
          style={({ pressed }) => [
            styles.recadosButton,
            pressed && styles.recadosButtonPressed,
          ]}
        >
          <Text style={styles.recadosButtonText}>Ver Habilidades</Text>
        </Pressable>

        {/* Seção de Botões Recomandações e Disponibilidade */}
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => 
              recomendations < LIMITE_RECOMENDACOES
              ? setRecomendations(recomendations + 1)
              : Alert.alert('Limite atingido', `Você chegou ao limite de ${LIMITE_RECOMENDACOES} recomendações.`)}
            style={({ pressed }) => [styles.likeButton, pressed && styles.likeButtonPressed]}
          >
            <Text style={styles.likeButtonText}>
              {recomendations} {recomendations === 1 ? 'recomendação' : 'recomendações'}
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => setAvailable((prev) => !prev)}
            style={({ pressed }) => [
              styles.likeButton,
              styles.outlineButton,
              { borderColor: available ? COLORS.danger : COLORS.success },
              pressed && styles.likeButtonPressed,
            ]}
          >
            <Text
              style={[
                styles.likeButtonText,
                { color: available ? COLORS.danger : COLORS.success },
              ]}
            >
              {available ? 'Tornar indisponível' : 'Tornar disponível'}
            </Text>
          </Pressable>
        </View>

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
    borderWidth: 5,
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
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    marginTop: 10,
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
  recadosButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 16,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
  },
  recadosButtonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  recadosButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: "700",
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
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },

});