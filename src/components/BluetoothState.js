import React from 'react';
import { Alert } from 'react-native';
import {BleManager, State, Device, Subscription} from 'react-native-ble-plx';

export const BluetoothState = async => () = {
  const bluetoothState = await bleManager.state();
  console.log('bluetoothState : ', bluetoothState);

  if (bluetoothState == false) {
    Alert.alert(
      'Bluetooth désactiver',
      'Veuillez activer le bluetooth avant de lancer la recherche.'
    );
  }
}
