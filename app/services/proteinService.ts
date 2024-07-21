import axios from "axios";

interface ProteinData {
  id: string;
  name: string;
  molecularWeight: string;
  structure: string;
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

const getProteinData = async (id: string): Promise<ProteinData> => {
  try {
    const response = await axios.get(
      `https://data.rcsb.org/rest/v1/core/entry/${id.toUpperCase()}`,
      {
        headers: { Accept: "application/json" },
      }
    );
    const data = response.data;

    const proteinData: ProteinData = {
      id: data.rcsb_id,
      name: data.struct.title,
      molecularWeight: `${
        data.rcsb_entry_info?.polymer_molecular_weight_maximum ?? "N/A"
      } Da`,
      structure: "3D structure data", // Placeholder, you may need to fetch the actual structure file separately
      score: "N/A",
      header: data.header ?? "N/A",
      title: data.struct.title ?? "N/A",
      compound: data.struct.compound ?? "N/A",
      source: data.struct.source ?? "N/A",
      method: data.exptl?.[0]?.method ?? "N/A",
      resolution: `${data.rcsb_entry_info.resolution_combined?.[0] ?? "N/A"} Å`,
      authors:
        data.audit_author?.map((author: any) => author.name).join(", ") ??
        "N/A",
      chains: data.struct_ref?.[0]?.db_code ?? "N/A",
      residueNumbering:
        data.entity_poly?.[0]?.pdbx_seq_one_letter_code_can ?? "N/A",
      heteroatoms: data.chem_comp?.[0]?.name ?? "N/A",
      remark3: data.remark_3 ?? "N/A",
      remark200: data.remark_200 ?? "N/A",
      dbReference: data.struct_ref?.[0]?.db_name ?? "N/A",
    };

    return proteinData;
  } catch (error) {
    console.error("Error fetching protein data:", error);
    throw error;
  }
};

export default getProteinData;
export type { ProteinData };
