import { StyleSheet, Text, View } from "react-native";

export default function Header({ title = "Perfil", centered = false }) {
  return (
    <View style={styles.container} accessibilityRole="header">
      {centered ? (
        <View style={styles.centeredTitleContainer}>
          <Text style={[styles.title, styles.titleCentered]}>{title}</Text>
        </View>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#147db3",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  title: {
    marginTop: 18,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  centeredTitleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleCentered: {
    marginTop: 0,
    textAlign: "center",
  },
});