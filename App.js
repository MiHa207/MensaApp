import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headTxt}>Mensa App</Text>
      </View>
      <View>
        <Button style={styles.buttontxt} title="Kalender" />
        <Button title="Essensplan" />
        <Button title="Gerichte" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#24a0ed",
    margin: 16,
    padding: 16,
  },

  headTxt: {
    color: "#fff",
    fontSize: 32,
    padding: 16,
  },

  buttontxt: {
    margin: 32,
    padding: 32,
    borderWidth: 3,
    borderColor: "#24a0ed",
  },
});
