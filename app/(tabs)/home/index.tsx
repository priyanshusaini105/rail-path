import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { Link, useNavigation } from "expo-router";
const welcomeFace = require("../../../assets/images/logo-rail.png");
const userlogo = require("../../../assets/images/user.png");

const RailwayLocations = [
  {
    id: 1,
    label: "Ticket Counter",
    icon: require("../../../assets/images/ticket.png"),
  },
  {
    id: 2,
    label: "Waiting Room",
    icon: require("../../../assets/images/ticket-1.png"),
  },
  {
    id: 3,
    label: "Canteen",
    icon: require("../../../assets/images/ticket-2.png"),
  },
  {
    id: 4,
    label: "Washroom",
    icon: require("../../../assets/images/ticket-3.png"),
  },
];

const AKGECLocations = [
  {
    id: 1,
    label: "AKGEC CFC",
    latitude: 28.676740691200795,
    longitude: 77.50002677460346,
    icon: require("../../../assets/images/building-1.png"),
  },
  {
    id: 2,
    label: "ME Block",
    latitude: 28.676630283492717,
    longitude: 77.50168799160679,
    icon: require("../../../assets/images/building-2.png"),
  },
  {
    id: 3,
    label: "Admin  Block",
    latitude: 28.676836351905077,
    longitude: 77.5006844990178,
    icon: require("../../../assets/images/building-3.png"),
  },
  {
    id: 4,
    label: "New Parking",
    latitude: 28.676281146879514,
    longitude: 77.50258702851981,
    icon: require("../../../assets/images/parking.png"),
  },
];

export default function HomeScreen() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [pnrNumber, setPnrNumber] = useState("");
  const [place, setPlace] = useState<Places>(Places.RAILWAY_STATION);
  const [locations, setLocations] = useState<Location[]>(RailwayLocations);
  const navigation = useNavigation();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    if (place === Places.AKGEC) {
      setLocations(AKGECLocations);
    } else {
      setLocations(RailwayLocations);
    }
  }, [place]);

  const handleButtonPress = () => {
    // Handle button press action
    console.log("Button pressed with PNR:", pnrNumber);
  };
  return (
    <SafeAreaView style={tw` bg-white h-full`}>
      {/* <Loader isLoading={loading} /> */}

      <ScrollView
        contentContainerStyle={tw`flex mt-6 justify-center items-center`}
      >
        <View style={tw`text-2xl font-bold text-center text-white`}>
          <View style={tw`flex-row items-center gap-3  w-full`}>
            <TouchableOpacity
              style={tw`flex-row border border-gray-300 border-2 items-center justify-between bg-white p-4 rounded-xl w-80 mt-7`}
              onPress={toggleDropdown}
            >
              <View style={tw`flex-row items-center`}>
                <Image
                  source={{
                    uri: "https://img.icons8.com/ios-filled/50/000000/marker.png",
                  }} // Replace with your location icon
                  style={tw`w-6 h-6 mr-2`}
                />
                <Text style={tw`text-black text-lg font-bold`}>{place}</Text>
              </View>
              <Image
                source={{
                  uri: "https://img.icons8.com/ios-filled/50/000000/expand-arrow.png",
                }} // Replace with your dropdown arrow icon
                style={tw`w-4 h-4`}
              />
            </TouchableOpacity>

            {/* Dropdown Options Modal */}
            <Modal
              visible={dropdownVisible}
              transparent={true}
              animationType="fade"
            >
              <TouchableOpacity
                style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
                onPress={() => setDropdownVisible(false)}
              >
                <View style={tw`bg-white rounded-lg w-80`}>
                  <FlatList
                    data={Object.values(Places).map((place) => ({
                      id: place,
                      label: place,
                    }))} // Replace with your dropdown options
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={tw`p-4 border-b border-gray-200`}
                        onPress={() => {
                          setPlace(item.label as Places);
                          setDropdownVisible(false);
                        }}
                      >
                        <Text style={tw`text-black text-lg`}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>

            <Image
              source={userlogo}
              style={tw`w-16 h-16 mt-6`}
              resizeMode="contain"
            />
          </View>

          <View style={tw`flex items-center my-10`}>
            <Image
              source={welcomeFace}
              style={tw`w-75 h-35`}
              resizeMode="contain"
            />
          </View>

          {place === Places.RAILWAY_STATION ? (
            <View
              style={tw`flex-row items-center border-gray-200 border rounded-3xl mt-4 w-full`}
            >
              <TextInput
                style={tw`flex w-3/5 border ml-3 border-0 p-2 py-4.5 rounded-lg`}
                placeholder="PNR Number"
                value={pnrNumber}
                onChangeText={setPnrNumber}
              />
              <TouchableOpacity
                style={tw`bg-gray-800 p-3.5 px-8 rounded-3xl mr-2`}
                onPress={handleButtonPress}
              >
                <Text style={tw`text-white font-bold`}>Navigate</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={tw`h-20 justify-center items-center bg-gray-100 rounded-lg mt-4`}
            >
              <Text style={tw`text-lg font-semibold text-gray-700 text-center`}>
                Welcome to AKGEC, Ghaziabad
              </Text>
              <Text style={tw`text-sm text-gray-600 mt-2 text-center`}>
                Select a location below to navigate
              </Text>
            </View>
          )}

          <View
            style={tw`mt-14 flex flex-wrap flex-row justify-between w-[400px]`}
          >
            {locations.map((item, index) => (
              <Link
                href={
                  place === Places.AKGEC
                    ? {
                        pathname: "/home/map",
                        params:{
                          latitude: item?.latitude,
                          longitude: item?.longitude
                        }
                      }
                    : { pathname: "/(tabs)/home/map" }
                }
                key={index}
                style={tw`bg-white px-6 py-4 rounded-xl flex flex-row justify-center items-center border border border-black/10  w-[48%] mb-4`}
              >
                <TouchableOpacity
                >
                  <Image
                    source={item.icon as any}
                    style={tw`w-12 h-10 mb-2`}
                    resizeMode="contain"
                  />
                  <Text style={tw`text-black w-8/12 font-semibold text-center`}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
          <TouchableOpacity
            style={tw`bg-indigo-600 p-6 rounded-xl mt-1 `}
            onPress={handleButtonPress}
          >
            <Text style={tw`text-white text-center font-bold`}>
              More Services
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#FFFFFF" style="dark" />
    </SafeAreaView>
  );
}

enum Places {
  AKGEC = "AKGEC, Ghaziabad",
  RAILWAY_STATION = "Railway Station GZB",
}

interface Location {
  id: number;
  label: string;
  latitude?: number;
  longitude?: number;
  icon: any;
}