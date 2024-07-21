import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProteinVisualizerProps {
  id: string;
  name: string;
  molecularWeight: string;
  score: string;
  header: string;
  title: string;
  compound: string;
  source: string;
  method: string;
  resolution: string;
  authors: string;
  chains: string;
  residueNumbering: string;
  heteroatoms: string;
  remark3: string;
  remark200: string;
  dbReference: string;
}

const ProteinVisualizer: React.FC<ProteinVisualizerProps> = ({
  id,
  name,
  molecularWeight,
  score,
  header,
  title,
  compound,
  source,
  method,
  resolution,
  authors,
  chains,
  residueNumbering,
  heteroatoms,
  remark3,
  remark200,
  dbReference,
}) => {
  return (
    <View style={styles.container}>
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
      <Text>Molecular Weight (kDa): {molecularWeight}</Text>
      {/* <Text>Score: {score}</Text> */}
      {/* <Text>Header: {header}</Text> */}
      <Text>Title: {title}</Text>
      {/* <Text>Compound: {compound}</Text> */}
      {/* <Text>Source: {source}</Text> */}
      <Text>Method: {method}</Text>
      <Text>Resolution: {resolution}</Text>
      <Text>Authors: {authors}</Text>
      {/* <Text>Chains: {chains}</Text>
      <Text>Residue Numbering: {residueNumbering}</Text>
      <Text>Heteroatoms: {heteroatoms}</Text>
      <Text>Remark 3: {remark3}</Text>
      <Text>Remark 200: {remark200}</Text>
      <Text>DB Reference: {dbReference}</Text> */}
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
