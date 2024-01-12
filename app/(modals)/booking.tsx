import React, {useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {BlurView} from "expo-blur";
import Animated, {FadeIn, FadeOut, SlideInDown, useAnimatedRef} from "react-native-reanimated";
import {defaultStyles} from "@/constants/Styles";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import {places} from "@/assets/data/places";
import {ScrollView} from "react-native-gesture-handler";
import DatePicker from 'react-native-modern-datepicker'

const guestsGroups = [
    {
        name: 'Adults',
        text: 'Ages 13 or above',
        count: 0,
    },
    {
        name: 'Children',
        text: 'Ages 2-12',
        count: 0,
    },
    {
        name: 'Infants',
        text: 'Under 2',
        count: 0,
    },
    {
        name: 'Pets',
        text: 'Pets allowed',
        count: 0,
    },
];

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
    const router = useRouter();
    const [openCard, setOpenCard] = useState(2);
    const [selectedPlace, setSelectedPlace] = useState(0);
    const today = new Date().toISOString().substring(0, 10);
    const [groups, setGroups] = useState(guestsGroups);

    const onCLearAll = () => {
        setSelectedPlace((0));
        setOpenCard(0);
        setGroups(guestsGroups);
    }

    return (
        <BlurView intensity={70} style={styles.container}>
            <View style={styles.card}>
                {openCard !== 0 && (
                    <AnimatedTouchableOpacity
                        entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}
                        style={styles.cardPreview} onPress={() => setOpenCard(0)}>
                        <Text style={styles.previewText}>Where</Text>
                        <Text style={styles.previewDate}>I'm flexible</Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard === 0 && (
                    <>
                        <Text style={styles.cardHeader}>Where to?</Text>
                        <View style={styles.cardBody}>
                            <View style={styles.searchSection}>
                                <Ionicons style={styles.searchIcon} name='ios-search' size={20} color='#000'/>
                                <TextInput style={styles.inputField} placeholder='Search destionation'
                                           placeholderTextColor={Colors.grey}/>
                            </View>
                        </View>
                        <ScrollView horizontal
                                    contentContainerStyle={{gap: 25, paddingHorizontal: 20, marginBottom: 30}}
                                    showsHorizontalScrollIndicator={false}>
                            {places.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => setSelectedPlace(index)}>
                                    <Image source={item.img}
                                           style={selectedPlace === index ? styles.placeSelected : styles.place}/>
                                    <Text style={{
                                        fontFamily: selectedPlace === index ? 'mon-sb' : 'mon',
                                        paddingTop: 6
                                    }}>{item.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </>
                )}
            </View>

            <View style={styles.card}>
                {openCard !== 1 && (
                    <AnimatedTouchableOpacity
                        entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}
                        style={styles.cardPreview} onPress={() => setOpenCard(1)}>
                        <Text style={styles.previewText}>When</Text>
                        <Text style={styles.previewDate}>Any week</Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard === 1 && (
                    <>
                        <Text style={styles.cardHeader}>When's your trip?</Text>
                        <View style={styles.cardBody}>
                            <DatePicker current={today} selected={today} mode={'calendar'} options={{
                                defaultFont: 'mon',
                                borderColor: 'transparent',
                                mainColor: Colors.primary,
                                headerFont: 'mon-sb'
                            }}/>
                        </View>
                    </>
                )}
            </View>

            <View style={styles.card}>
                {openCard !== 2 && (
                    <AnimatedTouchableOpacity
                        entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}
                        style={styles.cardPreview} onPress={() => setOpenCard(2)}>
                        <Text style={styles.previewText}>Who</Text>
                        <Text style={styles.previewDate}>Add guests</Text>
                    </AnimatedTouchableOpacity>
                )}

                {openCard === 2 && (
                    <>
                        <Text style={styles.cardHeader}>Who's coming?</Text>
                        <View style={styles.cardBody}>
                            {groups.map((item, index) => (
                                <View key={index} style={[styles.guestItem, index + 1 < guestsGroups.length ? styles.itemBorder : null]}>
                                    <View>
                                        <Text style={{ fontFamily: 'mon-sb', fontSize: 14 }}>{item.name}</Text>
                                        <Text style={{ fontFamily: 'mon', fontSize: 14, color: Colors.grey }}>{item.text}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center'}}>
                                        <TouchableOpacity onPress={() => {
                                            const newGroups = [...groups];
                                            if (newGroups[index].count > 0) {
                                                newGroups[index].count--;
                                                setGroups(newGroups);
                                            }
                                        }}>
                                            <Ionicons name='remove-circle-outline' size={26}
                                                      color={groups[index].count > 0 ? Colors.grey : '#cdcdcd'}
                                            />
                                        </TouchableOpacity>
                                        <Text style={{fontFamily: 'mon', fontSize: 16, minWidth: 18, textAlign: 'center'}}>{item.count}</Text>
                                        <TouchableOpacity onPress={() => {
                                            const newGroups = [...groups];
                                            newGroups[index].count++;
                                            setGroups(newGroups);
                                        }}>
                                            <Ionicons name='add-circle-outline' size={26}
                                                      color={Colors.grey}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </>
                )}
            </View>

            <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100%'
                }}>
                    <TouchableOpacity onPress={onCLearAll} style={{justifyContent: 'center'}}>
                        <Text style={{fontSize: 18, fontFamily: 'mon-sb', textDecorationLine: 'underline'}}>Clear
                            All</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.back()}
                                      style={[defaultStyles.btn, {paddingRight: 20, paddingLeft: 50}]}>
                        <Ionicons name='search-outline' size={24} color='#fff' style={defaultStyles.btnIcon}/>
                        <Text style={defaultStyles.btnText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        margin: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        gap: 20,
    },
    previewText: {
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: Colors.dark
    },
    previewDate: {
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: Colors.dark
    },
    cardPreview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    cardHeader: {
        fontFamily: 'mon-b',
        fontSize: 24,
        padding: 20
    },
    cardBody: {
        paddingHorizontal: 20,
    },
    searchSection: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ABABAB',
        borderRadius: 8,
        marginBottom: 5,
    },
    searchIcon: {
        padding: 10,
    },
    inputField: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    placesContainer: {
        flexDirection: 'row',
        gap: 25,
    },
    place: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    placeSelected: {
        borderColor: Colors.grey,
        borderWidth: 2,
        borderRadius: 10,
        width: 120,
        height: 120,
    },
    guestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey,
    },
})

export default Page;
