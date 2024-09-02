import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View , Alert, Text, FlatList, TouchableOpacity} from 'react-native';
import Mapbox, { type SymbolLayerStyle } from '@rnmapbox/maps';
import * as Location from 'expo-location';

Mapbox.setAccessToken("sk.eyJ1IjoicHJpeWFuc2h1c2FpbmkiLCJhIjoiY20wamE0MDIwMHFqajJsc2xvOGVvNzRwZSJ9.PcYp0iqTBPHPSXuJ9EWLZQ");

export default function HomeScreen() {
  const [location, setLocation] = useState<number[] | null>(null);
  const [route, setRoute] = useState<number[][]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  

  const getDirections = async (origin: { longitude: number, latitude: number }, destination: { longitude: number, latitude: number }) => {
    const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=geojson&access_token=sk.eyJ1IjoicHJpeWFuc2h1c2FpbmkiLCJhIjoiY20wamE0MDIwMHFqajJsc2xvOGVvNzRwZSJ9.PcYp0iqTBPHPSXuJ9EWLZQ`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const routeData = data.routes[0];
      setDistance(routeData.distance / 1000); 
      setDuration(routeData.duration / 60);
      return routeData.geometry.coordinates;
    } catch (error) {
      console.error('Error getting directions:', error);
      return null;
    }
  };

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

      const destinationCoords = {
        latitude: 28.6757,
        longitude: 77.5020,
      };

      const coordinates = await getDirections(
        { latitude, longitude },
        destinationCoords
      );
      setRoute(coordinates);
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
            <Mapbox.PointAnnotation
              id="destinationLocation"
              coordinate={[77.5020, 28.6757]} // Destination coordinates
            >
              <View>
                {/* <Image source={require('./path/to/your/destination-icon.png')} style={{ width: 30, height: 30 }} /> */}
                <View />
              </View>
            </Mapbox.PointAnnotation>
            {route.length > 0 && (
              <Mapbox.ShapeSource id="routeSource" shape={{ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: route } }}>
                <Mapbox.LineLayer
                  id="routeLayer"
                  style={{
                    lineColor: 'blue',
                    lineWidth: 5,
                  }}
                />
              </Mapbox.ShapeSource>
            )}
          </Mapbox.MapView>
        ) : (
          <Mapbox.MapView style={styles.map} />
        )}
        {distance !== null && duration !== null && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Distance: {distance.toFixed(2)} km</Text>
            <Text style={styles.infoText}>Duration: {duration.toFixed(2)} min</Text>
          </View>
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
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 16,
  },
});

