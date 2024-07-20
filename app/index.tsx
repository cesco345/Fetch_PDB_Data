import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import ThreeDViewer from "./components/ThreeDViewer";
import ProteinVisualizer from "./components/ProteinVisualizer";
import getProteinData, { ProteinData } from "./services/proteinService";
import { getProteinStructure } from "./services/structureService";
import axios from "axios";

const App: React.FC = () => {
  const [proteinID, setProteinID] = useState<string>("");
  const [proteinData, setProteinData] = useState<ProteinData | null>(null);
  const [structureData, setStructureData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProteinData = async () => {
    setError(null);
    setProteinData(null);
    setStructureData(null);

    if (!proteinID) {
      setError("Please enter a valid protein ID");
      return;
    }

    try {
      const data = await getProteinData(proteinID);
      console.log("Fetched protein data:", data);
      setProteinData(data);

      const structure = await getProteinStructure(proteinID);
      console.log("Fetched structure data:", structure); // Log the structure data
      setStructureData(structure);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError(
            "Protein ID not found. Please ensure the protein ID is valid."
          );
        } else {
          setError(
            "Failed to fetch protein data. Please ensure the protein ID is valid."
          );
        }
      } else {
        setError("Unexpected error occurred.");
      }
      console.error("Error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter Protein ID:</Text>
      <TextInput
        style={styles.input}
        value={proteinID}
        onChangeText={setProteinID}
      />
      <Button title="Fetch Protein Data" onPress={fetchProteinData} />
      {error && <Text style={styles.error}>{error}</Text>}
      {proteinData && (
        <View style={styles.details}>
          <ProteinVisualizer
            id={proteinData.id}
            name={proteinData.name}
            molecularWeight={proteinData.molecularWeight}
            score={proteinData.score}
          />
          {structureData && <ThreeDViewer structureData={structureData} />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  details: {
    marginTop: 20,
    flex: 1,
  },
});

export default App;
