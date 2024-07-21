import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import ProteinVisualizer from "./components/ProteinVisualizer";
import ThreeDViewer from "./components/ThreeDViewer";
import getProteinData, { ProteinData } from "./services/proteinService";
import {
  getProteinStructure,
  downloadAndSharePDBFile,
} from "./services/structureService";
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
      setProteinData(data);

      const structure = await getProteinStructure(proteinID);
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
    }
  };

  const handleDownloadAndSharePDBFile = async () => {
    try {
      await downloadAndSharePDBFile(proteinID);
      Alert.alert("Success", "PDB file shared successfully.");
    } catch (err) {
      Alert.alert("Error", `Error sharing PDB file: ${err}`);
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
      <Button
        title="Download and Share PDB File"
        onPress={handleDownloadAndSharePDBFile}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <ScrollView>
        {proteinData && (
          <ProteinVisualizer
            id={proteinData.id}
            name={proteinData.name}
            molecularWeight={proteinData.molecularWeight}
            score={proteinData.score}
            header={proteinData.header}
            title={proteinData.title}
            compound={proteinData.compound}
            source={proteinData.source}
            method={proteinData.method}
            resolution={proteinData.resolution}
            authors={proteinData.authors}
            chains={proteinData.chains}
            residueNumbering={proteinData.residueNumbering}
            heteroatoms={proteinData.heteroatoms}
            remark3={proteinData.remark3}
            remark200={proteinData.remark200}
            dbReference={proteinData.dbReference}
          />
        )}
        {structureData && <ThreeDViewer structureData={structureData} />}
      </ScrollView>
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
