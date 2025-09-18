import { View, Text, Image, Animated, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./SplashScreen";
import Page from "./Login";

const Stack = createNativeStackNavigator();

export default function App() {
    const [showFlashScreen, setShowFlashScreen] = useState(true);
    const fadeAnim = new Animated.Value(1);

    useEffect(() => {
        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => setShowFlashScreen(false));
        }, 1000);
    }, []);
    if (showFlashScreen) {
        return (
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200 }} />
            </Animated.View>
        );
    }
    return (

        <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>

            <Stack.Screen name="Login" component={Page} />
        </Stack.Navigator>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});