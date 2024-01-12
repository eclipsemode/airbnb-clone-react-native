import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useFonts} from 'expo-font';
import {SplashScreen, Stack, useRouter} from 'expo-router';
import {useEffect} from 'react';
import {Image, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';
import {ClerkProvider, useAuth} from "@clerk/clerk-expo";
import ModalHeaderText from "@/components/ModalHeaderText";
import Colors from "@/constants/Colors";
import {defaultStyles} from "@/constants/Styles";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key)
        } catch (e) {
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (e) {
            return;
        }
    }
}

export {ErrorBoundary} from 'expo-router';

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
        'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
        ...FontAwesome.font,
    });
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
            <RootLayoutNav/>
        </ClerkProvider>
    )
}

function RootLayoutNav() {
    const router = useRouter();
    const {isLoaded, isSignedIn} = useAuth();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/(modals)/login');
        }
    }, []);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name='(modals)/login' options={{
                title: 'Log in or sign up',
                headerTitleStyle: {
                    fontFamily: 'mon-sb'
                },
                presentation: 'modal',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name='close-outline' size={28}/>
                    </TouchableOpacity>
                )
            }}/>
            <Stack.Screen name='listing/[id]' options={{
                headerTitle: '',
                headerTransparent: true
            }}/>
            <Stack.Screen name='(modals)/booking' options={{
                headerBackVisible: false,
                title: '',
                presentation: 'transparentModal',
                animation: 'fade',
                headerTransparent: true,
                headerTitleAlign: 'center',
                headerTitle: () => <ModalHeaderText/>,
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}
                                      style={defaultStyles.roundButton}>
                        <Ionicons name='close-outline' size={22}/>
                    </TouchableOpacity>
                )
            }}/>
        </Stack>
    );
}
