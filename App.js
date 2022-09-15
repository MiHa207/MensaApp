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
  KeyboardAvoidingView,
   TouchableOpacity,
   Button,
   Alert,
   
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Calendar from 'expo-calendar';
import mensa_logo from "./assets/background.jpg";
import { useNavigation } from '@react-navigation/core';
import { auth } from "./firebase";
import SwitchSelector from 'react-native-switch-selector';
import i18next from "./languages/i18n";
import {I18nextProvider} from 'react-i18next';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from "i18next";
import DropDownPicker from 'react-native-dropdown-picker';


const Stack = createNativeStackNavigator();
const options = [
  {label: "Deutsch", value: "de"},
  {label: "English", value: 'en'},
  
  ];
  const COLORS = { back: '#1e1e1e', primary: '#efaa47', was: 'yellow' };
// <<<<<NAVIGATION>>>>>

export default function App() {
  
  return (
    <I18nextProvider i18n={i18next}>
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
    </I18nextProvider>
  );
}

// <<<<<SCREENS>>>>>

// HOME_SCREEN
const HomeScreen = ({ navigation }) => {
  const {t,i18n}=useTranslation();
  return (
    <View style={styles.container}>
      
      <Image style={styles.logo} source={mensa_logo} />
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Kalender")}
      >
        <Text style={styles.buttontxt}>{t("Kalender")}</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttontxt}>{t("Anmelden")}</Text>
      </Pressable>
      <View style={ styles.selector

}> 
      <SwitchSelector options={options} hasPadding inital={0}
      onPress={(language)=> {
        i18n.changeLanguage(language);
        }}
        textColor={"#efaa47"} 
  selectedColor={"#000000"}
  buttonColor={"#efaa47"}
  borderColor={"#efaa47"} 
  backgroundColor={"#1e1e1e"} 
        />
        </View>
    </View>
  );
};
// admin screen 
const AdminScreen = ({ navigation }) => {
  
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  

  const {t,i18n}=useTranslation();
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={mensa_logo} />
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Essenspläne")}
      >
        <Text style={styles.buttontxt}>{t("Essensplan")}</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Kalender")}
      >
        <Text style={styles.buttontxt}>{t("Kalender")}</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Gerichte")}
      >
        <Text style={styles.buttontxt}>{t("Gerichte")}</Text>
      </Pressable>

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{t("Abmelden")}</Text>
      </TouchableOpacity>
      <View style={styles.selector}> 
      <SwitchSelector options={options} hasPadding inital={0}
      onPress={(language)=> {i18n.changeLanguage(language);}}
        textColor={"#efaa47"} 
        selectedColor={"#000000"}
        buttonColor={"#efaa47"}
        borderColor={"#efaa47"} 
        backgroundColor={"#1e1e1e"} 
  />
  </View>
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
        navigation.navigate("Admin")
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
  const {t,i18n}=useTranslation();
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
          <Text style={styles.buttonText}>{t("Anmelden")}</Text>
        </TouchableOpacity>
       
          
        
      </View>
    </KeyboardAvoidingView>
  );
};


//CALENDAR_SCREEN
function CalendarScreen({ navigation }) {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

//DISHES_SCREEN
const DishesScreen = ({ navigation }) => {
  
  const [dishes, setDishes] = React.useState([]);
  const [textInput, setTextInput] = React.useState('');
  const [priceInput, setPriceInput] = React.useState('');
  const [artInput, setArtInput] = React.useState('');

  React.useEffect(() => {
    getDishesFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveDishToUserDevice(dishes);
  }, [dishes]);

  const addDish = () => {
    if (textInput & priceInput  == '') {
      Alert.alert('Error', 'Please input item');
    } else {
      const newDish = {
        id: Math.random(),
        task: textInput,
        price: priceInput,
        art:artInput,
        completed: false,
      };
      setDishes([...dishes, newDish]);
      setTextInput('');
      setPriceInput('');
      setArtInput('');
    }
  };

  const saveDishToUserDevice = async dishes => {
    try {
      const stringifyDishes = JSON.stringify(dishes);
      await AsyncStorage.setItem('dishes', stringifyDishes);
    } catch (error) {
      console.log(error);
    }
  };

  const getDishesFromUserDevice = async () => {
    try {
      const dishes = await AsyncStorage.getItem('dishes');
      if (dishes != null) {
        setDishes(JSON.parse(dishes));
      }
    } catch (error) {
      console.log(error);
    }
  };



  const deleteDish = dishId => {
    const newDishesItem = dishes.filter(item => item.id != dishId);
    setDishes(newDishesItem);
  };


  const ListItem = ({ dish }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => getDishesFromUserDevice(dish.id)}>
          <Text
           style={{
             fontWeight: 'bold',
             color: COLORS.primary,
             fontSize: 15,
             textDecorationLine: dish?.completed ? 'line-through' : 'yes',
           }}>
           Name: {dish?.task}
         </Text>
        
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: COLORS.primary,
              textDecorationLine: dish?.completed ? 'line-through' : 'yes',
            }}>
            Preis: {dish?.price}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: COLORS.primary,
              textDecorationLine: dish?.completed ? 'line-through' : 'yes',
            }}>
            Art:{dish?.art}
            
          </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => deleteDish(dish.id)}>
          <View style={styles.actionIcon}>
            <Icon name="delete" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.back,
      }}>
      
      <View style={styles.inputSection}>
        <View style={styles.formInput}>
          <TextInput
            value={textInput}
            enablesReturnKeyAutomatically
            numberOfLines={2}
            color={COLORS.primary}
            placeholder="Name"
            onChangeText={text => setTextInput(text)}
          />
          </View>
          <View style={styles.formInput}>
          <TextInput
            value={priceInput}
            enablesReturnKeyAutomatically
            numberOfLines={2}
            color={COLORS.primary}
            placeholder="Price"
            onChangeText={price => setPriceInput(price)}
          />
          
        
      
        </View> 
        <View style={styles.formInput}>
          <TextInput
            value={artInput}
            enablesReturnKeyAutomatically
            numberOfLines={2}
            color = {COLORS.primary}
            placeholder="Art"
            onChangeText={art => setArtInput(art)}
          />
          
        
      
        </View>
        <TouchableOpacity onPress={addDish}>
          <View style={styles.iconContainer}>
            <Icon name="add" color='green' size={30} />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 50 }}
        data={dishes}
        renderItem={({ item }) => <ListItem dish={item} />}
      />
      

      
    </SafeAreaView>
  );
};

//NEW_DISH_SCREEN
const NewDishScreen = ({ navigation }) => {
  const [foodtype, setFoodtype] = useState("Fleisch");
  const {t,i18n}=useTranslation();
  return (
    <View style={styles.container}>
      <View>
        <TextInput style={styles.formInput} placeholder="Name" />
        <TextInput style={styles.formInput} placeholder="Preis" />
        
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gerichte")}
        >
          <Text style={styles.buttontxt}>{t("Hinzufügen")}</Text>
        </Pressable>
      </View>
    </View>
  );
};

//PLAN_SCREEN
const PlansScreen = ({ navigation }) => {
  const {t,i18n}=useTranslation();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Neuer Plan")}
      >
        <Text style={styles.buttontxt}>{t("Hinzufügen")}</Text>
      </Pressable>
    </View>
  );
};
const NewPlanScreen = ({ navigation }) => {
  const {t,i18n}=useTranslation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.formText}>{t("Montag")}</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gerichte")}
        >
          <Text style={styles.buttontxt}>+</Text>
        </Pressable>
        <Text style={styles.formText}>{t("Dienstag")}</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gerichte")}
        >
          <Text style={styles.buttontxt}>+</Text>
        </Pressable>
        <Text style={styles.formText}>{t("Mittwoch")}</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gerichte")}
        >
          <Text style={styles.buttontxt}>+</Text>
        </Pressable>
        <Text style={styles.formText}>{t("Donnerstag")}</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Gerichte")}
        >
          <Text style={styles.buttontxt}>+</Text>
        </Pressable>
        <Text style={styles.formText}>{t("Freitag")}</Text>
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
          <Text style={styles.buttontxt}>{t("Hinzufügen")}</Text>
        </Pressable>
      </View>
    </View>
  );
};
// <<<<<STYLES>>>>>

const styles = StyleSheet.create({
  inputSection: {
    width: '100%',
    
    alignItems: 'center',
    paddingHorizontal: 20,},
    actionIcon: {
      height: 25,
      width: 25,
      backgroundColor: "green",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      marginLeft: 5,
      borderRadius: 3,},
    listItem: {
        padding: 20,
        backgroundColor: 'grey',
        flexDirection: 'row',
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10,},

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
  iconContainer: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    elevation: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
//login
buttonOutline: {
  backgroundColor: 'white',
  marginTop: 5,
  borderColor: '#0782F9',
  borderWidth: 2,
},
buttonText: {
  color: 'white',
  fontWeight: '700',
  fontSize: 16,
},
buttonOutlineText: {
  color: '#0782F9',
  fontWeight: '700',
  fontSize: 16,
},
inputContainer: {
  width: '80%'
},
input: {
  backgroundColor: 'white',
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 10,
  marginTop: 5,
},
buttonContainer: {
  width: '60%',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 40,},

  selector:{
    minWidth: 180,
    maxWidth: '50%',
    margin: 16,
  }


});
