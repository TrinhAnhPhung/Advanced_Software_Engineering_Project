import { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function SplashScreen({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Login");
        }, 2000); // 2 giây thôi, không phải 20000 (20 giây)

        return () => clearTimeout(timer); // clear khi unmount
    }, [navigation]);

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20 }}>Splash Screen</Text>
        </View>
    );
}
