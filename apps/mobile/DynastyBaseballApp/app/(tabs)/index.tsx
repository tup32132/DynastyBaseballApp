import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View
      style={styles.container}>
        <Text style={styles.text}>Home screen</Text>
        <Link href="/about" style={styles.button}>
          About</Link>
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
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  }
});
