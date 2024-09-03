import React, { ReactNode } from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface ScreenWithBackButtonProps {
  children: ReactNode;
  containerStyle?: ViewStyle;
}

const ScreenWithBackButton: React.FC<ScreenWithBackButtonProps> = ({ children, containerStyle }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default ScreenWithBackButton;