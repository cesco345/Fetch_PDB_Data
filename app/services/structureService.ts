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

export { getProteinStructure };
