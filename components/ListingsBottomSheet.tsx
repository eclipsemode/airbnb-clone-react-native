import React, {useMemo, useRef, useState} from 'react';
import {IListing} from "@/interfaces/listing";
import BottomSheet from "@gorhom/bottom-sheet";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Listings from "@/components/Listings";
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";

interface IProps {
    listings: IListing[],
    category: string
}

const ListingsBottomSheet = ({listings, category}: IProps) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%', '100%'], []);
    const [refresh, setRefresh] = useState(0);

    const showMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(prevState => prevState + 1);
    }

    return (
        <BottomSheet ref={bottomSheetRef}
                     index={1}
                     enablePanDownToClose={false}
                     style={styles.sheetContainer}
                     snapPoints={snapPoints} handleIndicatorStyle={{backgroundColor: Colors.grey, marginTop: 5}}>
            <View style={{flex: 1}}>
                <Listings listings={listings} category={category} refresh={refresh}/>
                <View style={styles.absoluteBtn}>
                    <TouchableOpacity onPress={showMap} style={styles.btn}>
                        <Text style={{fontFamily: 'mon-sb', color: '#fff'}}>Map</Text>
                        <Ionicons name='map' size={20} color='#fff'/>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    absoluteBtn: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 16,
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 30,
        gap: 8
    },
    sheetContainer: {
        borderRadius: 16,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1
        }
    }
})

export default ListingsBottomSheet;
