const fs = require("fs");
const { BrevoClient } = require("@getbrevo/brevo");

const env = Object.fromEntries(
  fs
    .readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

async function main() {
  const client = new BrevoClient({ apiKey: env.BREVO_API_KEY });
  const account = await client.account.getAccount();
  console.log(
    "API OK",
    account?.email || account?.companyName || JSON.stringify(account).slice(0, 200)
  );
}

main().catch((e) => {
  console.error("API FAIL", e.message);
  process.exit(1);
});
