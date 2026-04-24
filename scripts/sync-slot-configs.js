#!/usr/bin/env node
/**
 * registry.json → 각 slot{N}/config.json 의 status/role/region/placeholder 동기화
 *
 * 박씨 MCP 개발법: core 함수 먼저, CLI 래퍼는 얇게.
 * 여기는 동기화 유틸이라 단독 Node 스크립트로 충분.
 *
 *   node scripts/sync-slot-configs.js
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const registry = JSON.parse(fs.readFileSync(path.join(root, 'registry.json'), 'utf8'));

for (const slot of registry.slots) {
  const id = slot.id;
  const cfgPath = path.join(root, 'slots', id, 'config.json');
  if (!fs.existsSync(cfgPath)) {
    console.log(`SKIP ${id} (no config)`);
    continue;
  }

  const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  cfg.slot = cfg.slot || {};
  cfg.slot.id = id;
  cfg.slot.type = slot.type;
  cfg.slot.status = slot.status;
  cfg.slot.role = slot.role || null;
  cfg.slot.region = slot.region || null;

  // recruiting 이면 placeholder 주입, member 는 null
  if (slot.status === 'recruiting' && slot.placeholder) {
    cfg.slot.placeholder = slot.placeholder;
    cfg.member = cfg.member || {};
    cfg.member.recruitingTitle = slot.placeholder.title;
    cfg.member.recruitingTagline = slot.placeholder.tagline;
    cfg.member.recruitingEmoji = slot.placeholder.emoji;
  }

  // active 이면 registry 의 member 로 덮어씀
  if (slot.status === 'active' && slot.member) {
    cfg.member = { ...(cfg.member || {}), ...slot.member };
    if (slot.contact) cfg.contact = { ...(cfg.contact || {}), ...slot.contact };
  }

  fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + '\n', 'utf8');
  console.log(`OK   ${id} — status=${slot.status} role=${slot.role || '-'}`);
}
