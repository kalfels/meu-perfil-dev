import { useState, useEffect, useRef } from "react";
import {
  Animated, 
  Easing,
  Alert,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';

import Header from "./components/Header";

const COLORS = {
  primary: "#147db3",
  secondary: "#000000",
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
  delete: "#e74c3c",
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

const MAX_LENGTH_MESSAGE = 80;

export default function App() {
  //hooks useStates
  const [recomendations, setRecomendations] = useState(0);
  const [showSkills, setShowSkills] = useState(true); // true = começa aberto
  const [available, setAvailable] = useState(PROFILE.available);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); //array para os recados

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

  const handleContact = () => {
    Linking.openURL(`mailto:${PROFILE.email}`).catch(() =>
      Alert.alert("Contato", `Envie um e-mail para ${PROFILE.email}`)
    );
  };

  const handleSendMessage = () => {
    if(message.trim() === "") { //validar mensagem vazia
      Alert.alert("Atenção", "Escreva sua mensagem!");
      return;
    }
    setMessages([...messages, { id: Date.now(), texto: message }]); //adiciona mensagem ao array com identificador unico
    setMessage(""); //limpa o campo da mensagem.
  }

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

        {/* Seção de Skills */}
        <View style={styles.card}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: showSkills }}
            onPress={() => setShowSkills((prev) => !prev)}
            style={styles.sectionHeader}
            hitSlop={8}>
            <Text style={styles.sectionTitle}>📚 Habilidades</Text>
            <Ionicons
              name={showSkills ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={COLORS.neutral}
            />
          </Pressable>

          {showSkills && (
          <View style={styles.skillsWrap}>
            {SKILLS.map((skill) => (
              //key={Math.random}
              <View key={skill} style={styles.skill}>  
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
          )}
        </View>

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

        {/* Seção do TextInput e Contador e Botão Enviar recado */}
        <View>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Deixe uma mensagem"
            placeholderTextColor={COLORS.textMuted}
            multiline={true}
            numberOfLines={3}
            maxLength={MAX_LENGTH_MESSAGE}
            style={styles.textInput}
          />
          <Text style={styles.counterText}>
            {message.length}/{MAX_LENGTH_MESSAGE}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={handleSendMessage}
            style={({ pressed }) => [styles.contactButton, { marginTop: 12 }, pressed && styles.contactButtonPressed]}
          >
            <Text style={styles.contactButtonText}>Enviar recado</Text>
          </Pressable>
        </View>

        {/* Seção Mural de Recados */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            💬 Mural de recados ({messages.length})
          </Text>

          {messages.length === 0 ? (
            <Text style={styles.bio}>Nenhum recado ainda.</Text>
          ) : (
            messages.map((message) => (
              <View key={message.id} style={styles.messageItem}>
                <Text style={styles.messageText}>{message.texto}</Text>
                {/* Desafio Extra: Apagar com filter */}
                <Pressable
                  onPress={() => setMessages(messages.filter((r) => r.id !== message.id))}
                  style={styles.deleteButoton}
                >
                  <Ionicons name="trash-outline" size={18} color={COLORS.delete}/>
                </Pressable>
              </View>
            ))
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

  /* Habilidades */
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // chevron no canto direito do card
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

  /* Message */
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    height: 80,               // Garante espaço visual para as 3 linhas
    textAlignVertical: 'top',
    marginTop: 10,
  },
  counterText: {
    fontSize: 12,             // Estilo "small"
    color: COLORS.textMuted,
    textAlign: 'right',       // Alinhado à direita abaixo do campo
    marginTop: 2,
  },
  messageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.neutralSoft,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  messageText: {
    color: COLORS.textStrong,
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    padding: 6,
  },

  /* Contact */
  contactButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    marginBottom: 16,
  },
  contactButtonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  contactButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: "700",
  },
});