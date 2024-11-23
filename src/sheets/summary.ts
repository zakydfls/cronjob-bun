import { frekuensiDeepCleaning, frekuensiKaustik, frekuensiOxonia, jenisTangki, type SheetData, type SummaryTangki } from "./type";

export function generateSummaryTangki(dataSheets: SheetData[]): SummaryTangki[] {
  const jenisTangkiOrder = ["Produk", "Cao", "Separator", "Filler", "Distilasi", "Buffer", "Mesin RO", "Tidak Diketahui"];

  const uniqueTangki: Record<string, SummaryTangki> = {};

  dataSheets.forEach((sheet) => {
    sheet.allRows?.forEach((row) => {
      const tangki = row.tangki;
      const jenisSanitasi = row.jenisSanitasi;
      const tanggalSanitasi = row.tanggalSanitasi;

      if (!uniqueTangki[tangki]) {
        uniqueTangki[tangki] = {
          namaTangki: tangki,
          jenisTangki: jenisTangki[tangki] || "Tidak Diketahui",
          frekuensiOxonia: frekuensiOxonia[jenisTangki[tangki]] || "-",
          frekuensiKaustik: frekuensiKaustik[jenisTangki[tangki]] || "-",
          frekuensiDeepCleaning: frekuensiDeepCleaning[jenisTangki[tangki]] || "-",
          sanitasiOxonia: null,
          sanitasiCleaningKaustik: null,
          sanitasiDeepCleaning: null,
        };
      }

      if (jenisSanitasi === "Sanitasi Oxonia") {
        if (!uniqueTangki[tangki].sanitasiOxonia || new Date(tanggalSanitasi) > new Date(uniqueTangki[tangki].sanitasiOxonia!)) {
          uniqueTangki[tangki].sanitasiOxonia = tanggalSanitasi;
        }
      }

      if (jenisSanitasi === "Cleaning Kaustik") {
        if (!uniqueTangki[tangki].sanitasiCleaningKaustik || new Date(tanggalSanitasi) > new Date(uniqueTangki[tangki].sanitasiCleaningKaustik!)) {
          uniqueTangki[tangki].sanitasiCleaningKaustik = tanggalSanitasi;
        }
      }

      if (jenisSanitasi === "Deep Cleaning") {
        if (!uniqueTangki[tangki].sanitasiDeepCleaning || new Date(tanggalSanitasi) > new Date(uniqueTangki[tangki].sanitasiDeepCleaning!)) {
          uniqueTangki[tangki].sanitasiDeepCleaning = tanggalSanitasi;
        }
      }
    });
  });

  const tangkiArray = Object.values(uniqueTangki);

  tangkiArray.sort((a, b) => {
    const jenisIndexA = jenisTangkiOrder.indexOf(a.jenisTangki);
    const jenisIndexB = jenisTangkiOrder.indexOf(b.jenisTangki);

    if (jenisIndexA === jenisIndexB) {
      return a.namaTangki.localeCompare(b.namaTangki);
    }
    return jenisIndexA - jenisIndexB;
  });

  return tangkiArray;
}
