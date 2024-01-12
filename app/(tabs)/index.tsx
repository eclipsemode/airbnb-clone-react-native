import React, {useMemo, useState} from 'react';
import {Platform, View} from "react-native";
import {Stack} from "expo-router";
import ExploreHeader, {categories} from "@/components/ExploreHeader";
import ListingsData from '@/assets/data/airbnb-listings.json';
import {IListing} from "@/interfaces/listing";
import ListingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import ListingsMap from "@/components/ListingsMap";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import {IListingGeoRoot} from "@/interfaces/listingGeo";

const Page = () => {
    const [category, setCategory] = useState(categories[0].name);
    const items = useMemo(() => ListingsData as IListing[], []);
    const geoItems = useMemo(() => ListingsDataGeo as IListingGeoRoot, []);
    const onDataChanged = (category: string) => {
        setCategory(category);
    }

    return (
        <View style={{flex: 1, marginTop: Platform.OS === 'android' ? 128 : 80}}>
            <Stack.Screen options={{
                header: () => <ExploreHeader onCategoryChanged={onDataChanged}/>
            }}/>
            {/*<Listings listings={items} category={category}/>*/}
            <ListingsMap listings={geoItems.features} />
            <ListingsBottomSheet listings={items} category={category} />
        </View>
    );
};

export default Page;
