import { use, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, useColorScheme } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
  {
    id: '1',
    image: require('../assets/intro1.png'),
    title: 'Connect with friends and the world around you.',
    subtitle: 'Share your moments, thoughts, and experiences with a vibrant community.'
  },
  {
    id: '2',
    image: require('../assets/intro2.png'),
    title: 'Discover new interests and communities.',
    subtitle: 'Explore a wide range of topics, join groups, and find like-minded individuals.'
  },
  {
    id: '3',
    image: require('../assets/intro3.png'),
    title: 'Stay updated with the latest news and trends.',
    subtitle: 'Get real-time updates on current events, trending topics, and breaking news.'
  }
]
export default function Page() {
  const [showHomePage, setShowHomePage] = useState(false);
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const colorScheme = useColorScheme();

  useEffect(() => {
    AsyncStorage.getItem('hasSeenIntro').then(value => {
      if (value === null) {
        setShowIntro(true);
      } else {
        setShowIntro(false);
        setShowHomePage(true);
      }
    });
  }, []);
  const handleDone = () => {
    AsyncStorage.setItem('hasSeenIntro', 'true');
    setShowHomePage(true);
  }
  if (showIntro === null) {
    return null; // or a loading spinner
  }
  if (showIntro && !showHomePage) {
    return (
      <AppIntroSlider
        data={slides}

        renderItem={({ item }) => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Image source={item.image} style={{ width: 300, height: 300, marginBottom: 20 }} />
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>{item.title}</Text>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>{item.subtitle}</Text>
          </View>
        )}
        activeDotStyle={{ backgroundColor: 'blue', width: 30 }}
        showSkipButton
        renderNextButton={() => <Text style={{ fontSize: 18, color: 'blue', marginRight: 10 }}>Next</Text>}
        renderSkipButton={() => <Text style={{ fontSize: 18, color: 'blue', marginRight: 10 }}>Skip</Text>}
        renderDoneButton={() => <Text style={{ fontSize: 18, color: 'blue', marginRight: 10 }}>Done</Text>}
        onDone={() => {
          setShowHomePage(true);
          handleDone();
        }}
      />

    )
  }
  return (

    <View style={styles.container}>

      <Image source={colorScheme === 'dark' ? require('../assets/logo.png') : require('../assets/logo.png')} style={{ width: 100, height: 100, marginBottom: 20 }} >

      </Image>
      <Text style={styles.lable}>Gmail</Text>
      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        onChange={(e) => setEmail(e.nativeEvent.text)}
      />
      <Text style={styles.lable}>Username</Text>
      <TextInput
        placeholder="Enter your username"
        style={styles.input}
        onChange={(e) => setEmail(e.nativeEvent.text)}
      />
      <Text style={styles.lable}>Password</Text>
      <TextInput
        placeholder="Enter your Password"
        secureTextEntry
        style={styles.input}
        onChange={(e) => setEmail(e.nativeEvent.text)}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#007bff',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 20,
          width: '100%',
        }}
        onPress={() => Alert.alert('Register button pressed')}
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    justifyContent: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  lable: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
