#!/usr/bin/env node
/**
 * 각 slot{N}/index.html 에 부동산 특화 섹션 (카카오맵 + 인증 뱃지) 를 안전하게 삽입.
 *
 * 삽입 조건: <!-- REALTY_SECTION --> 마커가 있으면 그 자리에 교체.
 *          없으면 </body> 직전에 삽입.
 *
 * 중복 삽입 방지: 기존에 id="realty-anchor" 블록이 있으면 skip.
 *
 *   node scripts/apply-realty-snippet.js
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const registry = JSON.parse(fs.readFileSync(path.join(root, 'registry.json'), 'utf8'));

const SNIPPET = (slot) => {
  const role = slot.role || '';
  const region = slot.region || '';
  const address = (slot.contact && slot.contact.office) || region || '';
  const certNo = (slot.member && slot.member.certNo) || '';
  const recruiting = slot.status === 'recruiting';
  return `
  <!-- REALTY_SECTION -->
  <section id="realty-anchor" style="max-width:760px;margin:40px auto;padding:24px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:20px;">
    <h2 style="font-size:1.1rem;margin-bottom:16px;color:#F5F5F7;">사무실 · 전담 권역</h2>
    <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
      <span data-cert-badge="${role}" ${certNo ? `data-cert-no="${certNo}"` : ''}></span>
      ${region ? `<span style="padding:8px 14px;background:rgba(124,58,237,0.1);border-radius:8px;font-size:0.82rem;color:#A78BFA;">📍 ${region}</span>` : ''}
      ${recruiting ? `<span style="padding:8px 14px;background:rgba(124,58,237,0.2);border-radius:8px;font-size:0.82rem;color:#C4B5FD;">모집중</span>` : ''}
    </div>
    ${address ? `<div data-kakao-map="${address}"></div>` : `
      <div style="padding:40px;background:#0d0d1a;border-radius:12px;text-align:center;color:#6B7280;font-size:0.85rem;">
        사무실 주소 입력 후 카카오맵 자동 로드
      </div>`}
  </section>
  <link rel="stylesheet" href="/assets/js/realty-components.css">
  <script type="module" src="/assets/js/realty-components.js"></script>
  <!-- /REALTY_SECTION -->`;
};

for (const slot of registry.slots) {
  const fp = path.join(root, 'slots', slot.id, 'index.html');
  if (!fs.existsSync(fp)) { console.log(`SKIP ${slot.id} (no index.html)`); continue; }

  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes('id="realty-anchor"')) {
    console.log(`SKIP ${slot.id} (already has realty section)`);
    continue;
  }

  const snippet = SNIPPET(slot);

  if (html.includes('<!-- REALTY_SECTION -->')) {
    html = html.replace(/<!-- REALTY_SECTION -->[\s\S]*?<!-- \/REALTY_SECTION -->/, snippet);
  } else {
    // Insert before </body>
    html = html.replace('</body>', `${snippet}\n</body>`);
  }

  fs.writeFileSync(fp, html, 'utf8');
  console.log(`OK   ${slot.id} — realty section injected`);
}
