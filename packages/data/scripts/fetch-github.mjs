#!/usr/bin/env node
/**
 * Menyegarkan snapshot data GitHub publik (Zenixu) ke
 * packages/data/src/github.json
 *
 * Cara pakai:
 *   pnpm --filter @arufolio/data refresh:github          # pengguna default
 *   node scripts/fetch-github.mjs <login>                # pengguna lain
 *
 * Sumber data (berurutan, pakai yang pertama berhasil):
 *   1. `gh api graphql`  → paling lengkap (kontribusi + repo + follower + rincian commit/PR/issue)
 *   2. API publik        → kalender kontribusi saja, statistik dipertahankan dari snapshot lama
 *
 * Skrip ini TIDAK berjalan saat build. Ia hanya dipakai manual sesekali supaya
 * halaman tidak bergantung pada jaringan saat dibuka pengunjung.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const OUT = join(here, "..", "src", "github.json");
const LOGIN = process.argv[2] || "Zenixu";

const QUERY = `
query ($login: String!) {
  user(login: $login) {
    login
    name
    url
    createdAt
    followers { totalCount }
    repositories(privacy: PUBLIC, ownerAffiliations: OWNER) { totalCount }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

const LEVEL = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/** 1. Coba lewat `gh` CLI (paling lengkap). */
function viaGh() {
  const body = JSON.stringify({ query: QUERY, variables: { login: LOGIN } });
  const raw = execFileSync("gh", ["api", "graphql", "--input", "-"], {
    input: body,
    encoding: "utf8",
  });
  const u = JSON.parse(raw).data?.user;
  if (!u) throw new Error("respons gh tidak memuat data user");
  const cc = u.contributionsCollection;
  const days = cc.contributionCalendar.weeks
    .flatMap((w) => w.contributionDays)
    .map((d) => ({ date: d.date, count: d.contributionCount, level: LEVEL[d.contributionLevel] ?? 0 }));
  return {
    login: u.login,
    name: u.name ?? u.login,
    url: u.url,
    since: u.createdAt.slice(0, 10),
    repositories: u.repositories.totalCount,
    followers: u.followers.totalCount,
    totalContributions: cc.contributionCalendar.totalContributions,
    commits: cc.totalCommitContributions,
    pullRequests: cc.totalPullRequestContributions,
    issues: cc.totalIssueContributions,
    days,
  };
}

/** 2. Cadangan: API publik (kalender saja). Statistik lama dipertahankan. */
async function viaPublic(previous) {
  const r = await fetch(`https://github-contributions-api.jogruber.de/v4/${LOGIN}?y=last`);
  if (!r.ok) throw new Error(`API publik membalas ${r.status}`);
  const j = await r.json();
  const days = j.contributions.map((d) => ({ date: d.date, count: d.count, level: d.level }));
  if (!previous) throw new Error("belum ada snapshot lama untuk mempertahankan statistik");
  return { ...previous, totalContributions: j.total?.lastYear ?? previous.totalContributions, days };
}

function baca() {
  try {
    return JSON.parse(readFileSync(OUT, "utf8"));
  } catch {
    return null;
  }
}

let data;
let sumber;
try {
  data = viaGh();
  sumber = "gh api graphql";
} catch (e) {
  console.warn(`[gh gagal] ${e.message} — mencoba API publik…`);
  data = await viaPublic(baca());
  sumber = "github-contributions-api.jogruber.de (kalender) + snapshot lama";
}

const snapshot = {
  _note:
    "Snapshot data GitHub publik. JANGAN disunting tangan. " +
    "Segarkan dengan: pnpm --filter @arufolio/data refresh:github",
  _source: sumber,
  updatedAt: new Date().toISOString().slice(0, 10),
  ...data,
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + "\n");

const aktif = data.days.filter((d) => d.count > 0).length;
console.log(
  `✓ ${OUT}\n  ${snapshot.login} — ${snapshot.totalContributions} kontribusi, ` +
    `${snapshot.repositories} repo, ${snapshot.followers} follower\n  ` +
    `${data.days.length} hari (${aktif} aktif) · sumber: ${sumber}`
);
