#!/usr/bin/env node
/**
 * registry 2안 스위칭
 *
 *   node scripts/switch-registry.js realtors-only   # 공인중개사 12명 (박씨 원안)
 *   node scripts/switch-registry.js ecosystem       # 생태계 다양화 (Claude 제안)
 *   node scripts/switch-registry.js status          # 현재 적용된 안 확인
 *
 * 동작: data/registry-{variant}.json 을 루트 registry.json 으로 복사.
 * 후속 작업: 자동으로 sync-slot-configs + apply-recruiting-page 실행.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const registryPath = path.join(root, 'registry.json');
const variants = {
  'realtors-only': path.join(root, 'data/registry-realtors-only.json'),
  'ecosystem':     path.join(root, 'data/registry-ecosystem.json'),
};

const mode = process.argv[2];

if (!mode || mode === 'status') {
  const current = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  console.log('📍 현재 적용된 registry:');
  console.log(`   version    : ${current.meta.version}`);
  console.log(`   description: ${current.meta.description}`);
  const roles = [...new Set(current.slots.map(s => s.role))].filter(Boolean);
  console.log(`   roles      : ${roles.join(', ')}`);
  console.log(`   active     : ${current.slots.filter(s => s.status === 'active').length}`);
  console.log(`   recruiting : ${current.slots.filter(s => s.status === 'recruiting').length}`);
  console.log('');
  console.log('전환 가능:');
  console.log('  node scripts/switch-registry.js realtors-only');
  console.log('  node scripts/switch-registry.js ecosystem');
  process.exit(0);
}

if (!variants[mode]) {
  console.error(`❌ Unknown variant: ${mode}`);
  console.error(`   Available: ${Object.keys(variants).join(', ')}`);
  process.exit(1);
}

if (!fs.existsSync(variants[mode])) {
  console.error(`❌ Variant file not found: ${variants[mode]}`);
  process.exit(1);
}

// Copy variant to active registry
fs.copyFileSync(variants[mode], registryPath);
console.log(`✅ registry.json ← ${path.basename(variants[mode])}`);

// Re-sync slot configs
console.log('🔄 slot configs 재동기화...');
execSync(`node ${path.join(root, 'scripts/sync-slot-configs.js')}`, { stdio: 'inherit' });

// Re-apply recruiting templates (if script exists)
const recruitScript = path.join(root, 'scripts/apply-recruiting-page.js');
if (fs.existsSync(recruitScript)) {
  console.log('🔄 recruiting 페이지 템플릿 재적용...');
  execSync(`node ${recruitScript}`, { stdio: 'inherit' });
}

console.log('');
console.log('✅ 완료. 변경 사항 확인 후 커밋:');
console.log('   git diff --stat');
console.log('   git commit -am "slot: ' + mode + ' 안으로 전환"');
console.log('   git push');
