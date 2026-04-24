/**
 * 남원골 부동산 특화 공통 컴포넌트
 *
 * 지도 임베드 전략 (2026-04-25 교체):
 *   Kakao Map iframe 은 X-Frame/404 리다이렉트로 차단됨.
 *   → OpenStreetMap iframe (API 키 불필요, 즉시 작동) + 외부 링크 3종
 *     - 카카오맵 바로가기
 *     - 네이버지도 바로가기
 *     - Google 지도 바로가기
 *   박씨가 Kakao JS SDK 앱키 발급하면 window.__KAKAO_APPKEY 설정 후 SDK 버전 활성화.
 *
 * 사용 (선언적):
 *   <div data-kakao-map="경기도 시흥시 남원동 123-45"></div>
 *   <span data-cert-badge="공인중개사" data-cert-no="11230-2024-00001"></span>
 */

const ROLE_CONFIG = {
  '공인중개사':     { emoji: '🏠', color: '#F59E0B', issuer: '경기도청 등록' },
  '법무사':         { emoji: '⚖️', color: '#A78BFA', issuer: '대한법무사협회' },
  '세무사':         { emoji: '🧾', color: '#10B981', issuer: '한국세무사회' },
  '감정평가사':     { emoji: '📐', color: '#60A5FA', issuer: '한국감정평가사협회' },
  '홈스타일리스트·사진': { emoji: '📸', color: '#EC4899', issuer: '업계 등록' },
  '대출·금융 컨설턴트':  { emoji: '💰', color: '#FCD34D', issuer: '금융위 등록 대출상담사' },
};

// 주소 → 좌표 (대략적인 시흥/경기권 중심점 매핑)
// 실제 좌표가 없을 때 동 단위로 보여주기 위한 fallback.
const REGION_HINTS = {
  '시흥 남원동':   { lat: 37.4336, lng: 126.7957 },
  '시흥 장곡동':   { lat: 37.3863, lng: 126.7663 },
  '배곧 신도시':   { lat: 37.3779, lng: 126.7272 },
  '정왕동':       { lat: 37.3514, lng: 126.7405 },
  '정왕동·오이도': { lat: 37.3514, lng: 126.7405 },
  '오이도':       { lat: 37.3457, lng: 126.6843 },
  '은행·거모·목감': { lat: 37.4444, lng: 126.7835 },
  '월곶·소래':     { lat: 37.4019, lng: 126.7368 },
  '서울 남부 광역': { lat: 37.4956, lng: 126.8859 },
};

function encodeAddress(address) {
  return encodeURIComponent(address || '');
}

function inferCoords(address) {
  if (!address) return null;
  // 정확 매칭 우선
  if (REGION_HINTS[address]) return REGION_HINTS[address];
  // 부분 매칭
  for (const key of Object.keys(REGION_HINTS)) {
    if (address.includes(key) || key.includes(address)) return REGION_HINTS[key];
  }
  return null;
}

export function renderKakaoMap(el, address) {
  if (!address) return;
  const enc = encodeAddress(address);
  const coords = inferCoords(address);

  const osmUrl = coords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.015}%2C${coords.lat - 0.01}%2C${coords.lng + 0.015}%2C${coords.lat + 0.01}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`
    : null;

  const kakaoLink  = `https://map.kakao.com/link/search/${enc}`;
  const naverLink  = `https://map.naver.com/v5/search/${enc}`;
  const googleLink = `https://www.google.com/maps/search/${enc}`;

  // Kakao JS SDK 앱키가 있으면 SDK 버전 사용
  if (window.__KAKAO_APPKEY && window.kakao?.maps) {
    el.innerHTML = `<div class="kakao-map-sdk" style="width:100%;height:280px;border-radius:12px;overflow:hidden;"></div>
      <div class="map-links" style="margin-top:8px;display:flex;gap:12px;flex-wrap:wrap;">
        <a href="${kakaoLink}" target="_blank" rel="noopener" class="map-link">카카오맵에서 열기</a>
        <a href="${naverLink}" target="_blank" rel="noopener" class="map-link">네이버지도</a>
        <a href="${googleLink}" target="_blank" rel="noopener" class="map-link">Google 지도</a>
      </div>`;
    // SDK 초기화 (박씨가 나중에 SDK 로드 후)
    try {
      const container = el.querySelector('.kakao-map-sdk');
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(address, (data, status) => {
        if (status !== 'OK' || !data[0]) return;
        const pos = new window.kakao.maps.LatLng(data[0].y, data[0].x);
        const map = new window.kakao.maps.Map(container, { center: pos, level: 4 });
        new window.kakao.maps.Marker({ map, position: pos });
      });
    } catch (e) { /* fallback to iframe below */ }
    return;
  }

  // Default: OpenStreetMap iframe + 3 deep links
  el.innerHTML = `
    <div class="osm-map-wrap">
      ${osmUrl
        ? `<iframe src="${osmUrl}" width="100%" height="280" style="border:0;border-radius:12px;" loading="lazy" title="${address} 지도"></iframe>`
        : `<div style="padding:40px;background:#0d0d1a;border-radius:12px;text-align:center;color:#6B7280;font-size:0.85rem;">
            사무실 주소 등록 후 지도 표시
          </div>`}
      <div class="map-links" style="margin-top:10px;display:flex;gap:12px;flex-wrap:wrap;font-size:0.8rem;">
        <a href="${kakaoLink}" target="_blank" rel="noopener" class="map-link">🟡 카카오맵</a>
        <a href="${naverLink}" target="_blank" rel="noopener" class="map-link">🟢 네이버지도</a>
        <a href="${googleLink}" target="_blank" rel="noopener" class="map-link">🌐 Google 지도</a>
      </div>
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
        ${certNo ? `<span class="cert-no">등록 ${certNo}</span>` : `<span class="cert-no">${cfg.issuer}</span>`}
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
