import { cn } from "../lib/cn";
import { GitHub } from "./Icon";

/**
 * Heatmap kontribusi GitHub — "kalender kontribusi" ala GitHub, tapi
 * dibuat sendiri: cuma div + data JSON, TANPA dependensi baru dan TANPA
 * permintaan jaringan saat halaman dibuka.
 *
 * Warna sengaja memakai aksen tema (senja/indigo) lewat `color-mix`,
 * bukan hijau GitHub, supaya menyatu dengan sisa halaman.
 *
 * Data berasal dari snapshot `packages/data/src/github.json`
 * (dibuat oleh `pnpm --filter @arufolio/data refresh:github`).
 *
 * Responsif: kalender di-render DUA kali — jendela lebar (mis. 6 bulan)
 * dan jendela sempit (mis. 3 bulan) — lalu CSS memilih yang tampil.
 * Alasannya: satu kisi 27 kolom di layar 390px menyisakan sel ~7px yang
 * tak terbaca; memotong kolom lewat CSS tidak bisa karena label bulan
 * harus ikut berubah.
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const DAY_LABELS = ["", "Sen", "", "Rab", "", "Jum", ""];

type Day = { date: string; count: number; level: number };

/** Susun hari menjadi kolom-kolom mingguan (Minggu→Sabtu). */
function toWeeks(days: Day[]): (Day | null)[][] {
  if (days.length === 0) return [];
  const firstDow = new Date(days[0].date + "T00:00:00").getDay(); // 0 = Minggu
  const padded: (Day | null)[] = [...Array(firstDow).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    const w = padded.slice(i, i + 7);
    while (w.length < 7) w.push(null);
    weeks.push(w);
  }
  return weeks;
}

/** Satu kalender untuk satu jendela hari. */
function Calendar({ days }: { days: Day[] }) {
  const weeks = toWeeks(days);
  const aktif = days.filter((d) => d.count > 0).length;

  // Label bulan: berapa kolom yang ditempati tiap bulan
  const monthSpans: { label: string; span: number }[] = [];
  for (const w of weeks) {
    const d = w.find(Boolean);
    if (!d) continue;
    const label = MONTHS[Number(d.date.slice(5, 7)) - 1];
    const last = monthSpans[monthSpans.length - 1];
    if (last && last.label === label) last.span += 1;
    else monthSpans.push({ label, span: 1 });
  }

  return (
    <div className="gh-heat">
      <div className="gh-heat__months" aria-hidden="true">
        {monthSpans.map((m, i) => (
          <span key={i} style={{ flexGrow: m.span }}>
            {m.label}
          </span>
        ))}
      </div>

      <div className="gh-heat__body">
        <div className="gh-heat__days" aria-hidden="true">
          {DAY_LABELS.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>

        <div
          className="gh-heat__grid"
          role="img"
          aria-label={`${aktif} hari aktif dari ${days.length} hari`}
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
            gridTemplateRows: "repeat(7, 1fr)",
            aspectRatio: `${weeks.length} / 7`,
          }}
        >
          {weeks.map((w, wi) =>
            w.map((d, di) =>
              d ? (
                <span
                  key={`${wi}-${di}`}
                  className="gh-heat__cell"
                  data-level={d.level}
                  title={`${d.count} kontribusi · ${d.date}`}
                />
              ) : (
                <span key={`${wi}-${di}`} className="gh-heat__cell gh-heat__cell--void" />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export function GitHubHeatmap({
  stats,
  months = 6,
  monthsNarrow = 3,
  className,
}: {
  stats: {
    login: string;
    url: string;
    since: string;
    repositories: number;
    followers: number;
    totalContributions: number;
    commits: number;
    pullRequests: number;
    issues: number;
    days: Day[];
  };
  /** Berapa bulan ke belakang pada layar lebar. */
  months?: number;
  /** Berapa bulan ke belakang pada layar sempit (HP). */
  monthsNarrow?: number;
  className?: string;
}) {
  const wide = stats.days.slice(-Math.round(months * 30.5));
  const narrow = stats.days.slice(-Math.round(monthsNarrow * 30.5));
  const totalWide = wide.reduce((n, d) => n + d.count, 0);
  const totalNarrow = narrow.reduce((n, d) => n + d.count, 0);

  const angka = [
    { label: "Kontribusi", value: stats.totalContributions, sr: "setahun terakhir" },
    { label: "Repositori", value: stats.repositories, sr: "publik" },
    { label: "Follower", value: stats.followers, sr: "" },
  ];

  return (
    <section
      className={cn("gh-heat-card card p-6 sm:p-7", className)}
      aria-label={`Kontribusi GitHub ${stats.login}`}
    >
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <a
          href={stats.url}
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:text-[var(--accent)]"
        >
          <GitHub size={17} className="text-[var(--text-muted)] transition-colors group-hover:text-[var(--accent)]" />
          @{stats.login}
        </a>
        <p className="mono-label">
          <span className="gh-heat__sum-wide">{totalWide} kontribusi · {months} bulan terakhir</span>
          <span className="gh-heat__sum-narrow">{totalNarrow} kontribusi · {monthsNarrow} bulan terakhir</span>
        </p>
      </header>

      {/* Kalender kontribusi — dua jendela, CSS memilih yang tampil. */}
      <div className="mt-6">
        <div className="gh-heat__view-wide">
          <Calendar days={wide} />
        </div>
        <div className="gh-heat__view-narrow">
          <Calendar days={narrow} />
        </div>
      </div>

      <footer className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4">
        <p className="mono-label">
          <span className="gh-heat__sum-wide">
            {wide.filter((d) => d.count > 0).length} hari aktif · aktif sejak {stats.since.slice(0, 4)}
          </span>
          <span className="gh-heat__sum-narrow">
            {narrow.filter((d) => d.count > 0).length} hari aktif · sejak {stats.since.slice(0, 4)}
          </span>
        </p>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="mono-label">sedikit</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="gh-heat__cell gh-heat__cell--key" data-level={l} />
          ))}
          <span className="mono-label">banyak</span>
        </div>
      </footer>

      <dl className="mt-5 grid grid-cols-3 gap-3">
        {angka.map((a) => (
          <div key={a.label} className="gh-heat__stat">
            <dt className="mono-label">{a.label}</dt>
            <dd className="gh-heat__num">
              {a.value}
              {a.sr && <span className="sr-only"> {a.sr}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
