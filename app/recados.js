import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const COLORS = {
  primary: "#147db3",
  primaryDark: "#0d5277",
  background: "#eef8ff",
  surface: "#ffffff",
  textStrong: "#16324f",
  textMuted: "#52677c",
  neutralSoft: "#edf1f5",
  delete: "#e74c3c",
};

const MAX_LENGTH_MESSAGE = 80;

export default function Recados() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const wordCount = message.trim()
    ? message.trim().split(/\s+/).length
    : 0;

  const handleSendMessage = () => {
    if (message.trim() === "") {
      Alert.alert("Atenção", "Escreva sua mensagem!");
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), texto: message },
    ]);
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            💬 Mural de recados ({messages.length})
          </Text>

          {messages.length === 0 ? (
            <Text style={styles.bodyText}>Nenhum recado ainda.</Text>
          ) : (
            messages.map((item) => (
              <View key={item.id} style={styles.messageItem}>
                <Text style={styles.messageText}>{item.texto}</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Apagar recado"
                  onPress={() =>
                    setMessages((currentMessages) =>
                      currentMessages.filter((messageItem) => messageItem.id !== item.id)
                    )
                  }
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={18} color={COLORS.delete} />
                </Pressable>
              </View>
            ))
          )}
        </View>

        <View style={styles.form}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Deixe uma mensagem"
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={3}
            maxLength={MAX_LENGTH_MESSAGE}
            style={styles.textInput}
          />
          <Text style={styles.counterText}>
            {wordCount} {wordCount === 1 ? "palavra" : "palavras"} ·{" "}
            {message.length}/{MAX_LENGTH_MESSAGE} caracteres
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={handleSendMessage}
            style={({ pressed }) => [
              styles.sendButton,
              pressed && styles.sendButtonPressed,
            ]}
          >
            <Text style={styles.sendButtonText}>Enviar recado</Text>
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
  form: {
    width: "100%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    height: 80,
    textAlignVertical: "top",
    marginTop: 10,
  },
  counterText: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: "right",
    marginTop: 2,
  },
  sendButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    marginTop: 12,
    marginBottom: 16,
  },
  sendButtonPressed: {
    backgroundColor: COLORS.primaryDark,
  },
  sendButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: "700",
  },
});