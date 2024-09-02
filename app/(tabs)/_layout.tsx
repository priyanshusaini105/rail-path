import { Tabs } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, Text,  ViewStyle, StyleProp,GestureResponderEvent } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import tw from 'twrnc';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  interface TabBarButtonProps {
    children: any; 
  onPress: any; 
    style?: StyleProp<ViewStyle>;
  }
  
  const TabBarButton: React.FC<TabBarButtonProps> = ({ children, onPress, style }) => (
    <TouchableOpacity
      style={tw`-top-7 justify-center items-center bg-indigo-600  w-18 h-18 rounded-full shadow-lg shadow-black`}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 2,
          height: 70,
          paddingHorizontal: 25,
          paddingBottom: 10,
          borderRadius: 30,
          position: 'absolute',
          bottom: 10,
          left: 25,
          right: 25,
        },
      }}
    >
      <Tabs.Screen
        name="Map"
        options={{
          title: "Emergency",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="bell" 
            size={24}  
            color={focused ? tw.color('bg-indigo-600') : color}
            />
          ),
          tabBarLabelStyle: tw`text-xs`, 
          tabBarActiveTintColor: tw.color('bg-indigo-600'),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={48}
              color="white"
            />
          ),
          tabBarLabel: () => null, 
          tabBarButton: (props:any) => <TabBarButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: "Chatbot",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={focused ? tw.color('bg-indigo-600') : color}
            />
          ),
          tabBarLabelStyle: tw`text-xs`, 
          tabBarActiveTintColor: tw.color('bg-indigo-600'),
        }}
      />
    </Tabs>
  );
}