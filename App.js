import React from "react";
import { StyleSheet, Image, Text, View, Button, Pressable } from "react-native";
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
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Essensplan")}
      >
        <Text style={styles.buttontxt}>Essensplan</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Kalender")}
      >
        <Text style={styles.buttontxt}>Kalender</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Gerichte")}
      >
        <Text style={styles.buttontxt}>Gerichte</Text>
      </Pressable>
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

  headTxt: {
    color: "#fff",
    fontSize: 32,
    padding: 16,
  },

  button: {
    width: 180,
    margin: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#24a0ed",
  },

  buttontxt: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#fff",
  },

  logo: {
    width: 360,
    height: 180,
    margin: 32,
    borderWidth: 3,
    borderColor: "#24a0ed",
    borderRadius: 15,
  },
});
