import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  Pressable,
  RecyclerViewBackedScrollView,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import mensa_logo from "./assets/mensa_logo.png";
import WeeklyCalendar from "react-native-weekly-calendar";
import { FlatList, SafeAreaView } from "react-native-web";
import { Picker } from "@react-native-picker/picker";

const Stack = createNativeStackNavigator();

// <<<<<NAVIGATION>>>>>

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
          component={CalendarScreen}
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
        <Stack.Screen
          name="Neues Gericht"
          component={NewDishScreen}
          options={{ title: "Neues Gericht" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// <<<<<SCREENS>>>>>

// HOME_SCREEN
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

//CALENDAR_SCREEN
const CalendarScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <WeeklyCalendar style={styles.calendar} />
    </View>
  );
};

//DISHES_SCREEN
const DishesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Neues Gericht")}
      >
        <Text style={styles.buttontxt}>Hinzufügen</Text>
      </Pressable>
    </View>
  );
};

//NEW_DISH_SCREEN
const NewDishScreen = ({ navigation }) => {
  const [foodtype, setFoodtype] = useState("Fleisch");
  return (
    <View style={styles.container}>
      <View>
        <TextInput style={styles.formInput} placeholder="Name" />
        <TextInput style={styles.formInput} placeholder="Preis" />
        <Picker
          selectedValue={foodtype}
          onValueChange={(currentFoodtype) => setFoodtype(currentFoodtype)}
        >
          <Picker.Item label="Schwein" value="Fleisch" />
          <Picker.Item label="Vegetarisch" value="Vegetarisch" />
          <Picker.Item label="Vegan" value="Vegan" />
        </Picker>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gerichte")}
        >
          <Text style={styles.buttontxt}>Hinzufügen</Text>
        </Pressable>
      </View>
    </View>
  );
};

//PLAN_SCREEN
const PlanScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Essensplan</Text>
    </View>
  );
};

// <<<<<STYLES>>>>>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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

  calendar: {
    height: 600,
    themeColor: "#24a0ed",
    color: "#24a0ed",
  },

  formLabel: {
    fontSize: 20,
    color: "#fff",
  },

  formInput: {
    marginTop: 20,
    width: 300,
    height: 50,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#f1f1f7",
    fontSize: 20,
    borderColor: "#e7e7ec",
    borderRadius: 20,
  },
  formText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 20,
  },
});
