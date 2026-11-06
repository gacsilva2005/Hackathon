import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker, Region, PROVIDER_DEFAULT } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { UBS } from '../../types/ubs';
import UBSMarker from './UBSMarker';
import UserLocationDot from './UserLocationDot';

interface MapContainerProps {
  ubsList: UBS[];
  selectedUBSId: string | null;
  initialRegion: Region;
  userLocation?: { latitude: number; longitude: number } | null;
  onSelectUBS: (ubs: UBS) => void;
  onRecenter?: () => void;
}

export default function MapContainer({
  ubsList,
  selectedUBSId,
  initialRegion,
  userLocation,
  onSelectUBS,
  onRecenter,
}: MapContainerProps) {
  const mapRef = React.useRef<MapView>(null);

  const handleRecenter = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        ...userLocation,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
    } else if (onRecenter) {
      onRecenter();
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        toolbarEnabled={false}
      >
        {/* Marcador da localização do usuário */}
        {userLocation && (
          <Marker
            coordinate={userLocation}
            anchor={{ x: 0.5, y: 0.5 }}
            tracksViewChanges={false}
          >
            <UserLocationDot />
          </Marker>
        )}

        {/* Marcadores das UBS */}
        {ubsList.map((ubs) => (
          <Marker
            key={ubs.id}
            coordinate={ubs.coordinates}
            anchor={{ x: 0.5, y: 0.8 }}
            tracksViewChanges={false}
            onPress={() => onSelectUBS(ubs)}
          >
            <UBSMarker
              ubs={ubs}
              isSelected={ubs.id === selectedUBSId}
              onPress={onSelectUBS}
            />
          </Marker>
        ))}
      </MapView>

      {/* Botão de Localização Flutuante à direita */}
      <TouchableOpacity
        style={styles.locationBtn}
        onPress={handleRecenter}
        activeOpacity={0.85}
      >
        <MaterialIcons name="my-location" size={20} color="#1f2937" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationBtn: {
    position: 'absolute',
    right: 16,
    top: 130,
    backgroundColor: '#ffffff',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
});
