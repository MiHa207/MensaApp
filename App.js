import { StyleSheet, Image, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import mensa_logo from "./assets/mensa_logo.png";

const Stack = createNativeStackNavigator();

// NAVIGATION

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "MensaApp" }}
        />
        <Stack.Screen
          name="Kalender"
          component={CalenderScreen}
          options={{ title: "Kalenderwoche" }}
        />
        <Stack.Screen
          name="Gerichte"
          component={DishesScreen}
          options={{ title: "Gerichte" }}
        />
        <Stack.Screen
          name="Essensplan"
          component={PlanScreen}
          options={{ title: "Essenplan" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// SCREENS

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={mensa_logo} />
      <Button
        title="Kalender"
        onPress={() => navigation.navigate("Kalender")}
      />
      <Button
        style={styles.button}
        title="Gerichte"
        onPress={() => navigation.navigate("Gerichte")}
      />
      <Button
        title="Essensplan"
        onPress={() => navigation.navigate("Essensplan")}
      />
    </View>
  );
};

const CalenderScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Kalender</Text>
    </View>
  );
};

const DishesScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Gerichte</Text>
    </View>
  );
};

const PlanScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Essensplan</Text>
    </View>
  );
};

// STYLES

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

  button: {
    margin: 32,
    padding: 32,
    backgroundColor: "#24a0ed",
    borderWidth: 3,
    borderColor: "#24a0ed",
  },

  logo: {
    width: 360,
    margin: 32,
    borderWidth: 3,
    borderColor: "#24a0ed",
    borderRadius: 15,
  },
});
