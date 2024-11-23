import { CronJob } from "cron";
import type { SheetData, SummaryTangki } from "../sheets/type";
import { getSheetsData } from "../sheets/fetcher";
import { generateSummaryTangki } from "../sheets/summary";
import { sendWithStarsender } from "../wa_gateway/wa_gateway";
import type { StarsenderApiPayload } from "../wa_gateway/type";

const job = new CronJob(
  "0 8 * * *",
  async function () {
    console.log("Fetching data and checking sanitation schedule...");
    await fetchDataAndCheckSanitation();
  },
  null,
  true,
  "Asia/Jakarta"
);

async function fetchDataAndCheckSanitation() {
  const dataSheets: SheetData[] = [
    {
      nama_sheet: "Sheet1",
      id_sheet: process.env.SHEET_ID || "missing .env",
      gid: process.env.SHEET_GID || "missing .env",
      allRows: [],
    },
  ];

  try {
    await getSheetsData(dataSheets);

    const summaryTangki = generateSummaryTangki(dataSheets);

    await checkAndNotifySanitation(summaryTangki);
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

async function checkAndNotifySanitation(summaryTangki: SummaryTangki[]) {
  const today = new Date();

  for (const tangki of summaryTangki) {
    if (tangki.sanitasiCleaningKaustik) {
      const lastSanitationDate = new Date(tangki.sanitasiCleaningKaustik);

      const nextSanitationDate = new Date(lastSanitationDate.getTime());
      nextSanitationDate.setMonth(nextSanitationDate.getMonth() + 1);

      // console.log("Last Sanitasi:", lastSanitationDate.toISOString());
      // console.log("Next Sanitasi:", nextSanitationDate.toISOString());
      // console.log("Today (date1):", today.toISOString());

      if (isSameOrAfter(today, nextSanitationDate)) {
        console.log(`Mengirim notifikasi untuk tangki: ${tangki.namaTangki}`);
      }
    }
  }
}

function isSameOrAfter(date1: Date, date2: Date): boolean {
  // console.log("Comparing:");
  // console.log("Date1 (Today):", date1.toISOString());
  // console.log("Date2 (Next Sanitasi):", date2.toISOString());

  const date1WithoutTime = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const date2WithoutTime = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  const result = date1WithoutTime.getTime() >= date2WithoutTime.getTime();
  console.log("Comparison Result (isSameOrAfter):", result);
  return result;
}

async function sendNotification(namaTangki: string, tanggal: Date) {
  const payload: StarsenderApiPayload = {
    To: process.env.WA_TARGET_NUMBER || "081541193319",
    Body: `Reminder: Tangki "${namaTangki}" memerlukan sanitasi Cleaning Kaustik pada ${tanggal.toISOString().slice(0, 10)}.`,
    MessageType: "text",
  };

  try {
    await sendWithStarsender(payload);
    console.log(`Notifikasi berhasil dikirim untuk tangki: ${namaTangki}`);
  } catch (error) {
    console.error(`Gagal mengirim notifikasi untuk tangki: ${namaTangki}`, error);
  }
}

export { job };
