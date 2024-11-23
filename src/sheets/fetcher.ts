import { jenisTangki, type RowData, type SheetData } from "./type";

export async function loadGoogleSheet(id: string, gid: string) {
  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&tq&gid=${gid}`;

  try {
    const response = await fetch(url);
    const resText = await response.text();

    // console.log("Raw Google Sheet Response:", resText);

    const subStr = resText.substring(47).slice(0, -2);
    const sheetData = JSON.parse(subStr);

    // console.log("Parsed Google Sheet Data:", sheetData);
    return sheetData;
  } catch (error) {
    console.error("Failed to load Google Sheet data:", error);
    throw error;
  }
}

export async function getSheetsData(dataSheets: SheetData[]): Promise<void> {
  for (const sheet of dataSheets) {
    console.log(`Processing sheet: ${sheet.nama_sheet}`);
    try {
      const sheetData = await loadGoogleSheet(sheet.id_sheet, sheet.gid);
      // console.log("Loaded sheet data:", sheetData);

      const allRows: RowData[] = sheetData.table.rows.map((row: any) => ({
        tanggal: row.c[0]?.f || "Tidak Diketahui",
        namaPelaksana: row.c[1]?.v || "Tidak Diketahui",
        tangki: row.c[2]?.v || "Tidak Diketahui",
        jenisTangki: jenisTangki[row.c[2]?.v] || "Tidak Diketahui",
        jenisSanitasi: row.c[3]?.v || "Tidak Diketahui",
        tanggalSanitasi: row.c[4]?.f || "Tidak Diketahui",
        jamMulai: row.c[5]?.f || "Tidak Tersedia",
        jamSelesai: row.c[6]?.f || "Tidak Tersedia",
        hasilLuminometer: row.c[7]?.v || "-",
        hasilPhMeter: row.c[8]?.v || "-",
      }));

      // console.log(`All rows for sheet ${sheet.nama_sheet}:`, allRows);

      sheet.allRows = allRows;
    } catch (error) {
      console.error(`Error processing sheet ${sheet.nama_sheet}:`, error);
    }
  }

  // console.log("Final sheets data:", JSON.stringify(dataSheets, null, 2));
}
