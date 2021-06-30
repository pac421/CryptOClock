import React, { Component, useState } from 'react';
import { TouchableOpacity, View, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import DevicesList from '../components/DevicesList';

const Home = ({ navigation }) => {
  const bleManager = new BleManager();
  const [devicesList, setDevicesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let startTime, endTime;
  let availablesDevices = [];

  const isBluetoothEnabled = async () => {
    const bluetoothState = await bleManager.state();
    console.log('bluetoothState : ', bluetoothState);

    switch (bluetoothState) {
      case 'Unauthorized':
        Alert.alert(
          'Autorisation manquante',
          'Veuiller donner l\'autorisation à cet application d\'utiliser le bluetooth de votre téléphone.'
        );
        break;
      case 'PoweredOff':
        Alert.alert(
          'Bluetooth désactiver',
          'Veuillez activer le bluetooth sur votre téléphone.'
        );
        break;
      case 'PoweredOn':
        return true;
        break;
      case 'Unknown':
      case 'Resetting':
      case 'Unsupported':
      default:
        Alert.alert(
          'Erreur',
          'Une erreur est survenue, veuillez réessayer.'
        );
    }

    return false;
  }

  const Scan = () => {
    if (!isLoading && isBluetoothEnabled()) {
      console.log('Scanning..');

      startTime = new Date();
      availablesDevices.length = 0;
      setDevicesList(availablesDevices);
      setIsLoading(true);

      bleManager.startDeviceScan(null, null, (error, device) => {
        endTime = new Date();
        var timeDiff = endTime - startTime;
        timeDiff /= 1000;
        var seconds = Math.round(timeDiff);

        if (error) {
          console.log('error', error);
        }
        if (device !== null && device.name != null && !availablesDevices.some(x => x.id === device.id)) {
          console.log('new device found ----> [id,name]', device.id, device.name);
          availablesDevices.push({
            id: device.id,
            title: device.name
          });
        }
        if (seconds > 5) {
          console.log('5 seconds past, stopping scan..');
          bleManager.stopDeviceScan();
          setIsLoading(false);
          setDevicesList(availablesDevices);
        }
      })
    }
  };

  return (
    <View style={styles.view}>
      <DevicesList data={devicesList} navigation={navigation} />
      <TouchableOpacity onPress={Scan} style={styles.searchBtn}>
          {isLoading
            ? (<ActivityIndicator color="white" />)
            : (<Text style={styles.searchText}>Lancer la recherche</Text>)
          }
      </TouchableOpacity >
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtn: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#3A0CA3",
    borderRadius: 6,
    margin: 20
  },
  searchText: {
    fontSize: 18,
    color: "white",
  },
});

export default Home;
