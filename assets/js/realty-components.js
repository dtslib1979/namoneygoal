/**
 * 남원골 부동산 특화 공통 컴포넌트
 * - 카카오맵 임베드 (주소 기반, Maps SDK 없이 iframe embed 사용)
 * - 직군별 인증 뱃지 (공인중개사·법무사·세무사·감정평가사 등)
 *
 * 사용:
 *   <div data-kakao-map="경기도 시흥시 남원동 123-45"></div>
 *   <span data-cert-badge="공인중개사" data-cert-no="11230-2024-00001"></span>
 *
 * 카카오맵 embed: https://map.kakao.com/link/search/{encoded_address}
 *   iframe 기반으로 API 키 불필요. 클릭 시 카카오맵 전체 화면 이동.
 */

const ROLE_CONFIG = {
  '공인중개사':     { emoji: '🏠', color: '#F59E0B', issuer: '경기도청' },
  '법무사':         { emoji: '⚖️', color: '#A78BFA', issuer: '대한법무사협회' },
  '세무사':         { emoji: '🧾', color: '#10B981', issuer: '한국세무사회' },
  '감정평가사':     { emoji: '📐', color: '#60A5FA', issuer: '한국감정평가사협회' },
  '홈스타일리스트·사진': { emoji: '📸', color: '#EC4899', issuer: '업계 등록' },
  '대출·금융 컨설턴트':  { emoji: '💰', color: '#FCD34D', issuer: '금융위 등록 대출상담사' },
};

export function renderKakaoMap(el, address) {
  if (!address) return;
  const url = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;
  const embedUrl = `https://map.kakao.com/?q=${encodeURIComponent(address)}`;
  el.innerHTML = `
    <div class="kakao-map-wrap">
      <iframe
        src="${embedUrl}"
        width="100%"
        height="280"
        style="border:0; border-radius:12px;"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="${address} 위치">
      </iframe>
      <a href="${url}" target="_blank" rel="noopener" class="kakao-map-link">
        카카오맵에서 열기 →
      </a>
    </div>
  `;
}

export function renderCertBadge(el, role, certNo) {
  const cfg = ROLE_CONFIG[role] || { emoji: '🔖', color: '#9CA3AF', issuer: '' };
  el.innerHTML = `
    <span class="cert-badge" style="--cert-color: ${cfg.color};">
      <span class="cert-emoji">${cfg.emoji}</span>
      <span class="cert-body">
        <span class="cert-role">${role}</span>
        ${certNo ? `<span class="cert-no">등록 ${certNo}</span>` : ''}
      </span>
    </span>
  `;
}

export function initRealtyComponents(root = document) {
  root.querySelectorAll('[data-kakao-map]').forEach(el => {
    renderKakaoMap(el, el.getAttribute('data-kakao-map'));
  });
  root.querySelectorAll('[data-cert-badge]').forEach(el => {
    renderCertBadge(
      el,
      el.getAttribute('data-cert-badge'),
      el.getAttribute('data-cert-no')
    );
  });
}

// Auto-init
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initRealtyComponents());
  } else {
    initRealtyComponents();
  }
}
