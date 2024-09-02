import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera Permission",
              message: "This app needs access to your camera to take pictures.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
          console.warn(err);
        }
      } else {
        const { status } = await RNCamera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    })();
  }, []);

  const handleTakePicture = async (camera) => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      // Implement location checking logic here
      const isAtRailwayStation = false; // Replace with actual location check

      if (!isAtRailwayStation) {
        Alert.alert('Sorry, you are not at the railway station.');
      }
    }
  };

  if (hasPermission === null) {
    return <View />; // Show a blank view or a loading spinner while waiting for permissions
  }

  if (!hasPermission) {
    return <Text>No access to camera. Please allow camera access in your device settings.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
      >
        {({ camera, status }) => {
          if (status !== 'READY') return <View />;
          return (
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => handleTakePicture(camera)}>
                <Text style={{ fontSize: 14, color: 'white' }}>SNAP</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

export default CameraScreen;
