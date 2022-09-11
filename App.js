import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
    <View>
      <Button
        title="Kalender"
        onPress={() => navigation.navigate("Kalender")}
      />
      <Button
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

  buttontxt: {
    margin: 32,
    padding: 32,
    borderWidth: 3,
    borderColor: "#24a0ed",
  },
});
