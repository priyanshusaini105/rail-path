import { observer } from "mobx-react-lite"
import React, { FC,useState } from "react"
import { View, Text, TouchableOpacity, Image, Modal, FlatList, ScrollView, TextInput } from "react-native";
// import { isRTL } from "../i18n"
import { AppStackScreenProps } from "../navigators"
// import { colors, spacing } from "../theme"
import { StatusBar } from "expo-status-bar";
// import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from '../lib/tw'

//  const welcomeLogo = require("../../assets/images/logo.png")
 const welcomeFace = require("../../assets/images/logo-rail.png")
 const userlogo = require("../../assets/images/user.png")
 const card1 = require("../../assets/images/ticket.png")
 const card2 = require("../../assets/images/ticket-1.png")
 const card3 = require("../../assets/images/ticket-2.png")
 const card4 = require("../../assets/images/ticket-3.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("AKGEC, Ghaziabad");
  const [pnrNumber, setPnrNumber] = useState('');

  const options = [
    { id: 1, label: "AKGEC, Ghaziabad" },
    { id: 2, label: "Railway Station GZB" },
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionSelect = (option:any) => {
    setSelectedOption(option.label);
    setDropdownVisible(false);
  };

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
            style={tw`flex-row border border-gray-300 border-2 items-center justify-between bg-gray-100 p-4 rounded-xl w-80 mt-7`}
            onPress={toggleDropdown}
          >
            <View style={tw`flex-row items-center`}>
              <Image
                source={{ uri: "https://img.icons8.com/ios-filled/50/000000/marker.png" }} // Replace with your location icon
                style={tw`w-6 h-6 mr-2`}
              />
              <Text style={tw`text-black text-lg font-bold`}>{selectedOption}</Text>
            </View>
            <Image
              source={{ uri: "https://img.icons8.com/ios-filled/50/000000/expand-arrow.png" }} // Replace with your dropdown arrow icon
              style={tw`w-4 h-4`}
            />
          </TouchableOpacity>

          

          {/* Dropdown Options Modal */}
          <Modal visible={dropdownVisible} transparent={true} animationType="fade">
            <TouchableOpacity
              style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
              onPress={() => setDropdownVisible(false)}
            >
              <View style={tw`bg-white rounded-lg w-80`}>
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={tw`p-4 border-b border-gray-200`}
                      onPress={() => handleOptionSelect(item)}
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
            style={tw`w-50 h-20`}
            resizeMode="contain"
          />
        </View>
        <View style={tw` mt-5`}>
          
          <Text style={tw`text-xl text-black font-bold `}>
            Enter Your PNR Number
          </Text>
        </View>

        <View style={tw`flex-row items-center mt-4 w-full`}>
            <TextInput
              style={tw`flex w-3/5 border border-gray-300 p-2 rounded-lg`}
              placeholder="PNR Number"
              value={pnrNumber}
              onChangeText={setPnrNumber}
            />
            <TouchableOpacity
              style={tw`bg-gray-700 p-3 px-8 rounded-lg ml-2`}
              onPress={handleButtonPress}
            >
              <Text style={tw`text-white font-bold`}>Navigate</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`mt-14 flex flex-wrap flex-row justify-between w-[400px]`}>
            {[
              { label: "Ticket Counter", icon: card1 },
              { label: "Waiting Room", icon: card2 },
              { label: "Canteen", icon: card3},
              { label: "Washroom", icon: card4 },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={tw`bg-white p-6 rounded-xl flex flex-row justify-center items-center border border-1 border-black/10  w-[48%] mb-4`}
              >
                <Image
                  source={item.icon as any}
                  style={tw`w-12 h-10 mb-2`}
                  resizeMode="contain"
                />
                <Text style={tw`text-black w-8/12 text-md font-semibold text-center`}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
            <TouchableOpacity
              style={tw`bg-indigo-600 p-6 rounded-xl mt-4`}
              onPress={handleButtonPress}
            >
              <Text style={tw`text-white text-center font-bold`}>More Services</Text>
            </TouchableOpacity>

        {/* <CustomButton
          title="Continue with Email"
          handlePress={() => router.push("/sign-in")}
          containerStyles="w-full mt-7"
        /> */}
      </View>
    </ScrollView>

    <StatusBar backgroundColor="#FFFFFF" style="dark" />
  </SafeAreaView>
  )
})
