#!/usr/bin/env node
/**
 * recruiting 상태 슬롯의 index.html 을 홀딩 템플릿으로 일괄 교체.
 * active 슬롯 (slot01 김남원, slot02 권영숙 등) 은 보존.
 *
 * 목적: 기존 slot03~12 에 남아있는 더미 데이터(이영희 등)를 실 모집 페이지로 대체.
 *
 *   node scripts/apply-recruiting-page.js
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const registry = JSON.parse(fs.readFileSync(path.join(root, 'registry.json'), 'utf8'));

const TEMPLATE = (slot) => {
  const ph = slot.placeholder || {};
  const emoji = ph.emoji || '💼';
  const title = ph.title || '모집중';
  const tagline = ph.tagline || '';
  const role = slot.role || '';
  const region = slot.region || '';
  const slotNum = slot.id.replace('slot', '');
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | 남원골 ${slot.id.toUpperCase()}</title>
  <meta name="description" content="${tagline}">
  <meta name="theme-color" content="#7C3AED">
  <link rel="manifest" href="/assets/manifest.json">
  <link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
  <link rel="apple-touch-icon" href="/assets/icons/icon-192.png">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <meta http-equiv="refresh" content="0; url=/recruiting.html?slot=${slot.id}">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Noto Sans KR',sans-serif;background:#06060E;color:#F5F5F7;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 20px;text-align:center;}
    .wrap{max-width:480px;}
    .emoji{font-size:3.5rem;margin-bottom:16px;display:block;}
    h1{font-size:1.5rem;font-weight:900;margin-bottom:12px;}
    p{color:#9CA3AF;font-size:0.9rem;line-height:1.6;}
    a{display:inline-block;margin-top:24px;padding:12px 24px;background:linear-gradient(135deg,#7C3AED,#EC4899);color:#fff;text-decoration:none;border-radius:12px;font-weight:700;}
  </style>
</head>
<body>
  <div class="wrap">
    <span class="emoji">${emoji}</span>
    <h1>${title}</h1>
    <p>${role}${region ? ' · ' + region : ''}${tagline ? '<br>' + tagline : ''}</p>
    <a href="/recruiting.html?slot=${slot.id}">모집 안내 보기 →</a>
    <p style="margin-top:16px;font-size:0.75rem;color:#6B7280;">자동으로 이동합니다…</p>
  </div>
</body>
</html>
`;
};

let count = 0;
for (const slot of registry.slots) {
  if (slot.status !== 'recruiting') continue;
  const fp = path.join(root, 'slots', slot.id, 'index.html');
  if (!fs.existsSync(fp)) continue;

  fs.writeFileSync(fp, TEMPLATE(slot), 'utf8');

  // card/blog/video 도 홀딩 페이지로 (리다이렉트)
  const redirect = `<!DOCTYPE html><meta charset="UTF-8"><meta http-equiv="refresh" content="0; url=/recruiting.html?slot=${slot.id}">`;
  ['card.html', 'blog.html', 'video.html'].forEach(name => {
    const sp = path.join(root, 'slots', slot.id, name);
    if (fs.existsSync(sp)) fs.writeFileSync(sp, redirect, 'utf8');
  });

  console.log(`OK   ${slot.id} — 홀딩 템플릿 + 서브페이지 리다이렉트`);
  count++;
}

console.log(`\n✅ ${count}개 recruiting 슬롯 페이지 교체 완료`);
