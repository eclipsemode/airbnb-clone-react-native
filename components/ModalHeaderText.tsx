import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import Colors from "@/constants/Colors";

const ModalHeaderText = () => {
    const [active, setActive] = useState(0);

    return (
        <View style={{paddingHorizontal: 20, flexDirection: 'row', gap: 10}}>
            <TouchableOpacity onPress={() => setActive(0)} style={{borderBottomWidth: !active ? 1 : 0}}>
                <Text style={{
                    fontFamily: 'mon-sb',
                    color: !active ? '#000' : Colors.grey,
                    paddingBottom: 5
                }}>Stays</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActive(1)} style={{borderBottomWidth: active ? 1 : 0}}>
                <Text style={{
                    fontFamily: 'mon-sb',
                    color: active ? '#000' : Colors.grey
                }}>Experiences</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ModalHeaderText;
