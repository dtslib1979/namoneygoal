#!/usr/bin/env node
/**
 * 각 slot{N}/index.html 에 부동산 특화 섹션 (지도 + 인증 뱃지) 를 안전하게 삽입.
 * recruiting 슬롯은 apply-recruiting-page.js 에서 통째로 덮어쓰므로 skip.
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
  const address = (slot.contact && (slot.contact.office || slot.contact.address)) || '';
  const displayAddress = address || region;
  const certNo = (slot.member && slot.member.certNo) || '';
  const hasAddress = !!address;
  return `
  <!-- REALTY_SECTION -->
  <section id="realty-anchor" style="max-width:760px;margin:40px auto;padding:24px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:20px;">
    <h2 style="font-size:1.1rem;margin-bottom:16px;color:#F5F5F7;">🏢 사무실 · 전담 권역</h2>
    <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
      ${role ? `<span data-cert-badge="${role}"${certNo ? ` data-cert-no="${certNo}"` : ''}></span>` : ''}
      ${region ? `<span style="padding:8px 14px;background:rgba(124,58,237,0.1);border-radius:8px;font-size:0.82rem;color:#A78BFA;">📍 ${region}</span>` : ''}
      ${!hasAddress ? `<span style="padding:8px 14px;background:rgba(245,158,11,0.08);border-radius:8px;font-size:0.72rem;color:#F59E0B;" title="정확한 주소 등록 시 지도 pin 표시">📝 사무실 주소 미등록</span>` : ''}
    </div>
    ${displayAddress ? `<div data-kakao-map="${displayAddress.replace(/"/g, '&quot;')}"></div>` : `
      <div style="padding:40px;background:#0d0d1a;border-radius:12px;text-align:center;color:#6B7280;font-size:0.85rem;">
        사무실 주소 등록 후 지도 표시
      </div>`}
    ${!hasAddress && region ? `<p style="margin-top:10px;font-size:0.7rem;color:#6B7280;text-align:center;">※ 현재는 "${region}" 지역 대략 중심 좌표. 실제 사무실 주소는 <code style="color:#A78BFA;">registry.json → contact.address</code> 에 등록.</p>` : ''}
  </section>
  <link rel="stylesheet" href="/assets/js/realty-components.css">
  <script type="module" src="/assets/js/realty-components.js"></script>
  <!-- /REALTY_SECTION -->`;
};

let injected = 0, skipped = 0;
for (const slot of registry.slots) {
  // recruiting 슬롯은 apply-recruiting-page 에서 통째로 덮어쓰므로 skip
  if (slot.status === 'recruiting') { skipped++; continue; }

  const fp = path.join(root, 'slots', slot.id, 'index.html');
  if (!fs.existsSync(fp)) { console.log(`SKIP ${slot.id} (no index.html)`); continue; }

  let html = fs.readFileSync(fp, 'utf8');

  const snippet = SNIPPET(slot);

  if (html.includes('id="realty-anchor"')) {
    // 기존 섹션을 새 스니펫으로 교체 (UX 개선 업데이트 반영)
    html = html.replace(/<!-- REALTY_SECTION -->[\s\S]*?<!-- \/REALTY_SECTION -->/, snippet);
    console.log(`RENEW ${slot.id} — realty section updated`);
  } else if (html.includes('<!-- REALTY_SECTION -->')) {
    html = html.replace(/<!-- REALTY_SECTION -->/, snippet);
    console.log(`OK   ${slot.id} — realty section injected`);
  } else {
    html = html.replace('</body>', `${snippet}\n</body>`);
    console.log(`OK   ${slot.id} — realty section appended`);
  }

  fs.writeFileSync(fp, html, 'utf8');
  injected++;
}

console.log(`\n✅ ${injected}개 active 슬롯 realty 섹션 적용 · ${skipped}개 recruiting skip`);
