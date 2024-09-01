import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View , Alert, PermissionsAndroid} from 'react-native';
import Mapbox, { type SymbolLayerStyle } from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import * as Location from 'expo-location';

Mapbox.setAccessToken("sk.eyJ1IjoicHJpeWFuc2h1c2FpbmkiLCJhIjoiY20wamE0MDIwMHFqajJsc2xvOGVvNzRwZSJ9.PcYp0iqTBPHPSXuJ9EWLZQ");

export default function HomeScreen() {
  const [location, setLocation] = useState<number[] | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;
      setLocation([longitude, latitude]);
    })();
  }, []);
  return (
    <View style={styles.page}>
    <View style={styles.container}>
      {location ? (
        <Mapbox.MapView style={styles.map}>
          <Mapbox.Camera
            zoomLevel={14}
            centerCoordinate={location}
          />
          <Mapbox.PointAnnotation
            id="userLocation"
            coordinate={location}
          >
            <View>
              <View />
            </View>
          </Mapbox.PointAnnotation>
        </Mapbox.MapView>
      ) : (
        <Mapbox.MapView style={styles.map} />
      )}
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 800,
    width: 400,
  },
  map: {
    flex: 1
  }
});

