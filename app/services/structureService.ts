import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import axios from "axios";

const getProteinStructure = async (id: string): Promise<string> => {
  try {
    const response = await axios.get(
      `https://files.rcsb.org/download/${id}.pdb`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error fetching protein structure:", error);
    throw error;
  }
};

const downloadAndSharePDBFile = async (id: string): Promise<void> => {
  try {
    const pdbData = await getProteinStructure(id);
    const fileUri = `${FileSystem.documentDirectory}${id}.pdb`;
    await FileSystem.writeAsStringAsync(fileUri, pdbData);

    if (!(await Sharing.isAvailableAsync())) {
      throw new Error("Sharing is not available on this device");
    }

    await Sharing.shareAsync(fileUri, {
      mimeType: "text/plain",
      dialogTitle: "Share PDB File",
      UTI: "public.plain-text",
    });
  } catch (error) {
    console.error("Error downloading and sharing PDB file:", error);
    throw error;
  }
};

export { getProteinStructure, downloadAndSharePDBFile };
