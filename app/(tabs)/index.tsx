import { Image, StyleSheet, Platform, View } from 'react-native';
import Mapbox, { type SymbolLayerStyle } from '@rnmapbox/maps';

Mapbox.setAccessToken("sk.eyJ1IjoicHJpeWFuc2h1c2FpbmkiLCJhIjoiY20wamE0MDIwMHFqajJsc2xvOGVvNzRwZSJ9.PcYp0iqTBPHPSXuJ9EWLZQ");

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map} />
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
    height: 300,
    width: 300,
  },
  map: {
    flex: 1
  }
});

