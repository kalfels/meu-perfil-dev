import { Stack, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";

const COLORS = {
  primary: "#147db3",
  primaryDark: "#0d5277",
  background: "#eef8ff",
  surface: "#ffffff",
  textMuted: "#52677c",
  chip: "#e4f4ff",
};

export default function Habilidade() {
  const { id } = useLocalSearchParams();
  const skill = typeof id === "string" ? id : "Habilidade";

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <Header title={skill} centered />
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.description}>
              Detalhes da habilidade selecionada.
            </Text>
          </View>
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.actionButton,
                styles.secondaryButton,
                pressed && styles.secondaryButtonPressed,
              ]}
            >
              <Text style={styles.secondaryButtonText}>Voltar</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.dismissAll()}
              style={({ pressed }) => [
                styles.actionButton,
                styles.homeButton,
                pressed && styles.homeButtonPressed,
              ]}
            >
              <Text style={styles.homeButtonText}>Ir para o Início</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    gap: 16,
    padding: 20,
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surface,
  },
  secondaryButtonPressed: {
    backgroundColor: COLORS.chip,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  homeButton: {
    backgroundColor: COLORS.primary,
  },
  homeButtonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  homeButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 23,
  },
});