import { Link, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const COLORS = {
  background: "#eef8ff",
  surface: "#ffffff",
  textStrong: "#16324f",
  textMuted: "#52677c",
  chip: "#e4f4ff",
  chipText: "#176b9c",
};

function parseSkills(value) {
  if (typeof value !== "string") {
    return null;
  }

  try {
    const parsedSkills = JSON.parse(value);
    if (
      Array.isArray(parsedSkills) &&
      parsedSkills.every((skill) => typeof skill === "string")
    ) {
      return parsedSkills;
    }
  } catch {
    return null;
  }

  return null;
}

export default function Habilidades() {
  const { skills: skillsParam } = useLocalSearchParams();
  const skills = parseSkills(skillsParam);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📚 Habilidades</Text>
          {skills ? (
            <View style={styles.skillsWrap}>
              {skills.map((skill) => (
                <Link
                  key={skill}
                  href={{
                    pathname: "/habilidades/[id]",
                    params: { id: skill },
                  }}
                  asChild
                >
                  <Pressable
                    accessibilityRole="link"
                    style={({ pressed }) => [
                      styles.skill,
                      pressed && styles.skillPressed,
                    ]}
                  >
                    <Text style={styles.skillText}>{skill}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          ) : (
            <Text style={styles.bodyText}>
              Não foi possível carregar as habilidades.
            </Text>
          )}
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
  card: {
    width: "100%",
    padding: 20,
    marginBottom: 16,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    shadowColor: "#000000",
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
  bodyText: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 23,
  },
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  skill: {
    borderRadius: 16,
    backgroundColor: COLORS.chip,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  skillPressed: {
    opacity: 0.7,
  },
  skillText: {
    color: COLORS.chipText,
    fontSize: 14,
    fontWeight: "600",
  },
});