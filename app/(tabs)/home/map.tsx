import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Modal,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import Mapbox from "@rnmapbox/maps";
import * as Location from "expo-location";
import { useLocalSearchParams, useNavigation } from "expo-router";
import tw from "twrnc";
import { isLoading } from "expo-font";
import ScreenWithBackButton from "@/components/ScreenWithBackButton";

Mapbox.setAccessToken(
  "sk.eyJ1IjoicHJpeWFuc2h1c2FpbmkiLCJhIjoiY20wamE0MDIwMHFqajJsc2xvOGVvNzRwZSJ9.PcYp0iqTBPHPSXuJ9EWLZQ"
);

interface TripInfo {
  distance: number | null;
  duration: number | null;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [route, setRoute] = useState<[number, number][] | null>(null);
  const [tripInfo, setTripInfo] = useState<TripInfo>({
    distance: null,
    duration: null,
  });
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams<{
    latitude: string;
    longitude: string;
    place: Places;
  }>();

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const getDirections = useCallback(
    async (
      origin: Coordinates,
      destination: Coordinates
    ): Promise<[number, number][] | null> => {
      const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=geojson&access_token=sk.eyJ1IjoicHJpeWFuc2h1c2FpbmkiLCJhIjoiY20wamE0MDIwMHFqajJsc2xvOGVvNzRwZSJ9.PcYp0iqTBPHPSXuJ9EWLZQ`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const routeData = data.routes[0];
        setTripInfo({
          distance: routeData.distance / 1000,
          duration: routeData.duration / 60,
        });
        return routeData.geometry.coordinates;
      } catch (error) {
        console.error("Error getting directions:", error);
        return null;
      }
    },
    []
  );

  useEffect(() => {
    const setupLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      const watchPosition = await Location.watchPositionAsync(
        {
          accuracy:
            params.place === Places.AKGEC
              ? Location.Accuracy.High
              : Location.Accuracy.Lowest,
        },
        (userLocation) => {
          const { latitude, longitude } = userLocation.coords;
          setLocation([longitude, latitude]);
        }
      );

      return () => watchPosition.remove();
    };

    setupLocation();
  }, []);

  useEffect(() => {
    if (
      location &&
      params.latitude &&
      params.longitude &&
      params.place === Places.AKGEC
    ) {
      getDirections(
        { latitude: location[1], longitude: location[0] },
        {
          latitude: parseFloat(params.latitude),
          longitude: parseFloat(params.longitude),
        }
      ).then((value) => setRoute(value));
    }
  }, [location, params, getDirections]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  if (!location) return <Mapbox.MapView style={styles.map} />;

  return (
    <>
      <View style={tw`justify-center items-center`}>
        <Modal
          visible={params.place === Places.RAILWAY_STATION}
          style={tw`flex-1 justify-center items-center`}
          animationType="slide"
          transparent
          onRequestClose={() => {
            navigation.goBack();
          }}
        >
          <View style={tw`flex-1 justify-center items-center bg-black/35`}>
            {loading ? (
              <View
                style={tw`justify-center items-center bg-white h-36 p-6 rounded-5`}
              >
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={tw`text-2xl font-bold`}>
                  Fetching You current Location...
                </Text>
              </View>
            ) : (
              <View
                style={tw`justify-center items-center bg-white h-36 p-6 rounded-5`}
              >
                <Text style={tw`text-2xl font-bold`}>
                  Oops! You are out of the railway station.
                </Text>
              </View>
            )}
          </View>
        </Modal>
        <Mapbox.MapView style={tw`w-full h-full`}>
          <Mapbox.Camera centerCoordinate={location} zoomLevel={18} />
          <Mapbox.PointAnnotation id="userLocation" coordinate={location}>
            <View />
          </Mapbox.PointAnnotation>
          <Mapbox.PointAnnotation
            id="destinationLocation"
            coordinate={[
              parseFloat(params.longitude),
              parseFloat(params.latitude),
            ]}
          >
            <View />
          </Mapbox.PointAnnotation>
          {route && route.length > 0 && (
            <Mapbox.ShapeSource
              id="routeSource"
              shape={{
                type: "Feature",
                properties: {},
                geometry: { type: "LineString", coordinates: route! },
              }}
            >
              <Mapbox.LineLayer
                id="routeLayer"
                style={{ lineColor: "blue", lineWidth: 5 }}
              />
            </Mapbox.ShapeSource>
          )}
        </Mapbox.MapView>
        {tripInfo.distance && tripInfo.duration && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Distance: {tripInfo.distance.toFixed(2)} km
            </Text>
            <Text style={styles.infoText}>
              Duration: {tripInfo.duration.toFixed(2)} min
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1 },
  infoContainer: {
    position: "absolute",
    left: 0,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    ...tw`bottom-20`,
  },
  infoText: { fontSize: 16 },
});

export default Map;

enum Places {
  AKGEC = "AKGEC, Ghaziabad",
  RAILWAY_STATION = "Railway Station GZB",
}
