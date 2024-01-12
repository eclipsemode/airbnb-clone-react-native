import React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {useWarmUpBrowser} from "@/hooks/useWarmUpBrowser";
import {defaultStyles} from "@/constants/Styles";
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useOAuth} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Github = 'oauth_github'
}

const Page = () => {
    useWarmUpBrowser();
    const router = useRouter();

    const {startOAuthFlow: googleAuth} = useOAuth({strategy: 'oauth_google'});
    const {startOAuthFlow: appleAuth} = useOAuth({strategy: 'oauth_apple'});
    const {startOAuthFlow: facebookAuth} = useOAuth({strategy: 'oauth_github'});

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Github]: facebookAuth
        }[strategy]

        try {
            const {createdSessionId, setActive} = await selectedAuth();
            if (createdSessionId) {
                setActive!({session: createdSessionId});
                router.back();
            }
        } catch (e) {
            console.error('Oauth error: ', e);
        }
    }

    return (
        <View style={[defaultStyles.container, styles.container]}>
            <TextInput autoCapitalize='none' placeholder='Email'
                       style={[defaultStyles.inputField, {marginBottom: 30}]}/>
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>

            <View style={styles.separatorView}>
                <View style={{borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth, flex: 1}}/>
                <Text style={styles.separator}>or</Text>
                <View style={{borderBottomColor: '#000', borderBottomWidth: StyleSheet.hairlineWidth, flex: 1}}/>
            </View>

            <View style={{gap: 20}}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons name='call-outline' style={defaultStyles.btnIcon} size={24}/>
                    <Text style={styles.btnOutlineText}>Continue with Phone</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
                    <Ionicons name='md-logo-apple' style={defaultStyles.btnIcon} size={24}/>
                    <Text style={styles.btnOutlineText}>Continue with Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <Ionicons name='md-logo-google' style={defaultStyles.btnIcon} size={24}/>
                    <Text style={styles.btnOutlineText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Github)}>
                    <Ionicons name='md-logo-github' style={defaultStyles.btnIcon} size={24}/>
                    <Text style={styles.btnOutlineText}>Continue with Github</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 26
    },
    separatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30
    },
    separator: {
        fontFamily: 'mon-sb',
        color: Colors.grey
    }, btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'mon-sb',
    },


})
export default Page;
