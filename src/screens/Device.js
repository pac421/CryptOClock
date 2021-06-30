import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const Device = ({ navigation, route }) => {
  const bleManager = new BleManager();

  return (
    <View>
      <Text>{route.params.id}</Text>
    </View>
  );
}

export default Device;
