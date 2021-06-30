import React, { useState } from "react";
import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <Text style={[styles.deviceName]}>{item.title}</Text>
    <Text style={[styles.deviceId]}>{item.id}</Text>
  </TouchableOpacity>
);

const DevicesList = (props) => {

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => props.navigation.navigate('Device', { id: item.id })}
      />
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#4361EE",
  },
  deviceId: {
    fontSize: 14,
    color: 'white',
  },
  deviceName: {
    fontSize: 30,
    color: 'white',
  },
});

export default DevicesList;
