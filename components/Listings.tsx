import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {defaultStyles} from "@/constants/Styles";
import {Link} from "expo-router";
import {IListing} from "@/interfaces/listing";
import {Ionicons} from "@expo/vector-icons";
import Animated, {FadeInRight, FadeOutLeft} from 'react-native-reanimated';
import {BottomSheetFlatList, BottomSheetFlatListMethods} from "@gorhom/bottom-sheet";

interface IProps {
    listings: any[],
    category: string,
    refresh: number
}

const Listings = ({listings, category, refresh}: IProps) => {
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef<BottomSheetFlatListMethods | null>(null);

    useEffect(() => {
        if (refresh) {
            flatListRef.current?.scrollToOffset({offset: 0, animated: true});
        }
    }, [refresh]);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200)
    }, [category]);

    const renderRow: ListRenderItem<IListing> = useCallback(({item}) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                    <Image source={{uri: item.medium_url}} style={styles.image}/>
                    <TouchableOpacity style={{position: 'absolute', right: 30, top: 30}}>
                        <Ionicons name='heart-outline' size={24} color='#000'/>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 10}}>
                        <Text style={{fontFamily: 'mon', fontSize: 16}}>{item.name}</Text>
                        <View style={{flexDirection: 'row', gap: 4}}>
                            <Ionicons name='star' size={16}/>
                            <Text style={{fontFamily: 'mon-sb'}}>{item.review_scores_rating / 20}</Text>
                        </View>
                    </View>

                    <Text style={{fontFamily: 'mon'}}>{item.room_type}</Text>

                    <View style={{flexDirection: 'row', gap: 4}}>
                        <Text style={{fontFamily: 'mon-sb'}}>$ {item.price}</Text>
                        <Text style={{fontFamily: 'mon'}}>night</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    ), [])

    return (
        <View style={[defaultStyles.container]}>
            <Text style={styles.textInfo}>{listings.length} apartments available...</Text>
            <BottomSheetFlatList ref={flatListRef} data={loading ? [] : listings} renderItem={renderRow}/>
        </View>
    );
};

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        gap: 10,
        marginVertical: 20
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10
    },
    textInfo: {
       paddingHorizontal: 16,
        fontFamily: 'mon-sb'
    }
})

export default Listings;
