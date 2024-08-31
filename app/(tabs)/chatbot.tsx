import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function ChatbotScreen() {
    return (
        <View>
            <Text style={tw`text-xl text-black font-bold`}>
                chatbot page
            </Text>
        </View>
    );
}