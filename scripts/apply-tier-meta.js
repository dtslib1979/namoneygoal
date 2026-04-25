#!/usr/bin/env node
/**
 * v2 — 모든 슬롯에 tools.tier 메타 추가 (기본 "A")
 * registry.json 의 slots[] 와 slots/{id}/config.json 양쪽에 동기화
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const reg = JSON.parse(fs.readFileSync(path.join(root, 'registry.json'), 'utf8'));

let changed = 0;
for (const slot of reg.slots) {
  if (!slot.tools) slot.tools = { tier: 'A', engine: 'Perplexity Pro' };
  // 명시적 모집 슬롯
  if (slot.status === 'recruiting') slot.tools = { tier: 'A', engine: 'Perplexity Pro' };

  // 슬롯 config.json 동기화
  const cfgPath = path.join(root, 'slots', slot.id, 'config.json');
  if (fs.existsSync(cfgPath)) {
    const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
    cfg.tools = { ...(cfg.tools || {}), tier: 'A', engine: 'Perplexity Pro' };
    fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + '\n', 'utf8');
    changed++;
  }
}

fs.writeFileSync(path.join(root, 'registry.json'), JSON.stringify(reg, null, 2) + '\n', 'utf8');
console.log(`✅ ${changed} slot configs · registry.json 동기화 완료 (Tier A 기본)`);
