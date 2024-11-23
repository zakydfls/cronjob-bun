import { job } from "./src/scheduler/cron";

async function main() {
  try {
    console.log("Menjalankan sistem cronjob...");
    job.start();
    console.log("Cronjob dimulai!");
  } catch (error) {
    console.error("Gagal menjalankan sistem:", error);
  }
}

main();
