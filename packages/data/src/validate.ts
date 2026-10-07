import { projects, lab, certificates, aruthtale, rchibnu } from "./index";

const ok = (s: string) => `\x1b[32m✔\x1b[0m ${s}`;

console.log(ok(`Brand: ${aruthtale.brand.name} — ${aruthtale.brand.domain}`));
console.log(ok(`Profil: ${rchibnu.identity.fullName} (@${rchibnu.identity.handle})`));
console.log(ok(`Real Projects: ${projects.length} (${projects.filter(p => p.featured).length} featured)`));
console.log(ok(`Learning Vault: ${lab.length} (${lab.filter(l => l.archived).length} arsip)`));
console.log(ok(`Sertifikat: ${certificates.length} (${certificates.filter(c => c.featured).length} featured)`));
console.log("\n\x1b[32mSemua data valid.\x1b[0m");
