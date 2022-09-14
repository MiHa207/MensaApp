import React, { useEffect,useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView, TextInput, TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import mensa_logo from "./assets/background.jpg";
import WeeklyCalendar from "react-native-weekly-calendar";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/core'
import { auth } from './firebase'

const Stack = createNativeStackNavigator();

// <<<<<NAVIGATION>>>>>

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#1e1e1e" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "MensaApp",
            headerTitleStyle: { color: "#efaa47" },
            headerTitleAlign: "center",
          }}
        />
         <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
            headerTitleStyle: { color: "#efaa47" },
            headerTitleAlign: "center",
          }}
        />
         <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{
            title: "MensaApp",
            headerTitleStyle: { color: "#efaa47" },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Kalender"
          component={CalendarScreen}
          options={{
            title: "Kalenderwoche",
            headerTitleStyle: { color: "#efaa47" },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Gerichte"
          component={DishesScreen}
          options={{
            title: "Gerichte",
            headerTitleStyle: { color: "#efaa47" },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Neues Gericht"
          component={NewDishScreen}
          options={{
            title: "Neues Gericht",
            headerTitleStyle: { color: "#efaa47" },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Essenspläne"
          component={PlansScreen}
          options={{
            title: "Essenspläne",
            headerTitleStyle: { color: "#efaa47" },
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="Neuer Plan"
          component={NewPlanScreen}
          options={{
            title: "Neuer Plan",
            headerTitleStyle: { color: "#efaa47" },
            headerTitleAlign: "center",
          }}
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
        onPress={() => navigation.navigate("Kalender")}
      >
        <Text style={styles.buttontxt}>Kalender</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttontxt}>Login</Text>
      </Pressable>
    </View>
  );
};
// admin screen 
const AdminScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={mensa_logo} />
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Essenspläne")}
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
// Login>_SCREEN
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Admin")
      }
    })

    return unsubscribe
  }, [])



  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
       
          
        
      </View>
    </KeyboardAvoidingView>
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
const dummyArray = [
  { id: "1", value: "Dish1" },
  { id: "2", value: "Dish2" },
  { id: "3", value: "Dish3" },
];

const DishesScreen = ({ navigation }) => {
  const [listItems, setListItems] = useState(dummyArray);

  const ItemView = ({ item }) => {
    return (
      // FlatList Item
      <View>
        <Text style={styles.item} onPress={() => getItem(item)}>
          {item.value}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,

          width: "100%",

          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    //Function for click on an item

    alert("Id: " + item.id + " Value: " + item.value);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listItems}
        //data defined in constructor

        ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View

        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
      />
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
          <Picker.Item label="Fleisch" value="Fleisch" />
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
const PlansScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Neuer Plan")}
      >
        <Text style={styles.buttontxt}>Hinzufügen</Text>
      </Pressable>
    </View>
  );
};
const NewPlanScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.formText}>Montag</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gerichte")}
        >
          <Text style={styles.buttontxt}>+</Text>
        </Pressable>
        <Text style={styles.formText}>Dienstag</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gerichte")}
        >
          <Text style={styles.buttontxt}>+</Text>
        </Pressable>
        <Text style={styles.formText}>Mittowch</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gerichte")}
        >
          <Text style={styles.buttontxt}>+</Text>
        </Pressable>
        <Text style={styles.formText}>Donnerstag</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gerichte")}
        >
          <Text style={styles.buttontxt}>+</Text>
        </Pressable>
        <Text style={styles.formText}>Freitag</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gerichte")}
        >
          <Text style={styles.buttontxt}>+</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Essenspläne")}
        >
          <Text style={styles.buttontxt}>Hinzufügen</Text>
        </Pressable>
      </View>
    </View>
  );
};
// <<<<<STYLES>>>>>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
  },

  button: {
    width: 180,
    margin: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#efaa47",
  },

  buttontxt: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#f3f3f3",
  },

  logo: {
    width: 360,
    height: 180,
    margin: 32,
    borderWidth: 3,
    borderColor: "#efaa47",
    borderRadius: 15,
  },

  calendar: {
    height: 600,
    themeColor: "#efaa47",
    color: "#efaa47",
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
    backgroundColor: "#f1f1f7",
    fontSize: 20,
    borderColor: "#e7e7ec",
    borderRadius: 20,
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "#b9e4c9",
  },
  formText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
