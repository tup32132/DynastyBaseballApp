import { View, Text, StyleSheet } from "react-native";

export default function MatchupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Matchup screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});