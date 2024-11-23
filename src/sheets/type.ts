interface SheetData {
  nama_sheet: string;
  id_sheet: string;
  gid: string;
  allRows?: RowData[];
}

interface RowData {
  tanggal: string;
  namaPelaksana: string;
  tangki: string;
  jenisTangki: string;
  jenisSanitasi: string;
  tanggalSanitasi: string;
  jamMulai: string;
  jamSelesai: string;
  hasilLuminometer: string | number;
  hasilPhMeter: string | number;
}

const frekuensiOxonia: Record<string, string> = {
  Produk: "2x Pemakaian",
  Cao: "-",
  Separator: "1x Pemakaian",
  Filler: "Setiap Hari",
  Distilasi: "Setiap Minggu",
  Buffer: "Setiap Produksi",
  "Mesin RO": "Setiap Senin",
};

const frekuensiKaustik: Record<string, string> = {
  Produk: "Tiap Bulan",
  Cao: "Tiap Bulan",
  Separator: "Tiap Bulan",
  Filler: "Tiap Bulan",
  Distilasi: "Tiap Bulan",
  Buffer: "Tiap Bulan",
  "Mesin RO": "Tiap Bulan",
};

const frekuensiDeepCleaning: Record<string, string> = {
  Produk: "Tiap Tahun",
  Cao: "Tiap Tahun",
  Separator: "Tiap Tahun",
  Filler: "Tiap 3 Bulan",
  Distilasi: "Tiap Tahun",
  Buffer: "Tiap Tahun",
  "Mesin RO": "Tiap 6 Bulan",
};

interface SummaryTangki {
  namaTangki: string;
  jenisTangki: string;
  frekuensiOxonia: string;
  frekuensiKaustik: string;
  frekuensiDeepCleaning: string;
  sanitasiOxonia: string | null;
  sanitasiCleaningKaustik: string | null;
  sanitasiDeepCleaning: string | null;
}

const jenisTangki: Record<string, string> = {
  A: "Produk",
  B: "Produk",
  F: "Produk",
  G: "Produk",
  C: "Produk",
  D: "Produk",
  E: "Produk",
  H: "Produk",
  I: "Produk",
  J: "Produk",
  O: "Produk",
  U: "Produk",
  V: "Produk",
  W: "Produk",
  X: "Produk",
  K: "Cao",
  L: "Cao",
  P: "Cao",
  Q: "Cao",
  R: "Cao",
  S: "Cao",
  T: "Cao",
  "15": "Cao",
  "16": "Cao",
  "Fermentasi 1": "Cao",
  "Fermentasi 2": "Cao",
  "Fermentasi 3": "Cao",
  "Fermentasi 4": "Cao",
  "Fermentasi 5": "Cao",
  Separator: "Separator",
  Filler: "Filler",
  Distilasi: "Distilasi",
  Buffer: "Buffer",
  "Mesin RO": "Mesin RO",
};

export type { SheetData, RowData, SummaryTangki };
export { frekuensiOxonia, frekuensiKaustik, frekuensiDeepCleaning, jenisTangki };
