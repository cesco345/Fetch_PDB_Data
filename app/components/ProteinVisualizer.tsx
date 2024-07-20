import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProteinVisualizerProps {
  id: string;
  name: string;
  molecularWeight: string;
  score: string;
}

const ProteinVisualizer: React.FC<ProteinVisualizerProps> = ({
  id,
  name,
  molecularWeight,
  score,
}) => {
  return (
    <View style={styles.container}>
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
      <Text>Molecular Weight: {molecularWeight}</Text>
      {/*<Text>Score: {score}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
  },
});

export default ProteinVisualizer;
