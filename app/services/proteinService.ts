import axios from "axios";

interface ProteinData {
  id: string;
  name: string;
  molecularWeight: string;
  structure: string;
  score: string;
}

const getProteinData = async (id: string): Promise<ProteinData> => {
  try {
    const response = await axios.get(
      `https://data.rcsb.org/rest/v1/core/entry/${id.toUpperCase()}`,
      {
        headers: { Accept: "application/json" },
      }
    );
    const data = response.data;
    console.log("API response data:", JSON.stringify(data, null, 2)); // Log the full response data

    const molecularWeight =
      data.rcsb_entry_info?.polymer_molecular_weight_maximum ?? "N/A";
    const structureData = "3D structure data"; // Placeholder, you may need to fetch the actual structure file separately

    const proteinData: ProteinData = {
      id: data.rcsb_id,
      name: data.struct.title,
      molecularWeight: `${molecularWeight} Da`,
      structure: structureData,
      score: "N/A",
    };
    return proteinData;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching protein data:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export default getProteinData;
export type { ProteinData };
