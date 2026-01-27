/**
 * 남원골 PR System
 * PR 버튼 → 카카오톡 접수 시스템
 *
 * Usage:
 *   <button data-pr-type="edit" data-pr-slot="slot01">수정 요청</button>
 *   <script src="/modules/pr.js"></script>
 */

(function() {
  'use strict';

  const PR_CONFIG = {
    storageKey: 'nmg_pr_requests',
    kakaoChannelId: 'namoneygoal',
    webhookUrl: null, // Optional: Set your webhook URL
    types: {
      edit: { name: '페이지 수정', price: 10000, emoji: '✏️' },
      pwa: { name: 'PWA/APK 제작', price: 50000, emoji: '📱' },
      content: { name: '콘텐츠 제작', price: 30000, emoji: '📝' },
      design: { name: '디자인 변경', price: 20000, emoji: '🎨' },
      custom: { name: '기타 요청', price: 0, emoji: '💬' }
    }
  };

  class PRSystem {
    constructor() {
      this.requests = this.loadRequests();
      this.init();
    }

    init() {
      // Bind PR buttons
      document.querySelectorAll('[data-pr-type]').forEach(btn => {
        btn.addEventListener('click', (e) => this.handlePRClick(e));
      });

      // Create floating PR button if not exists
      if (!document.querySelector('.pr-float-btn')) {
        this.createFloatingButton();
      }
    }

    createFloatingButton() {
      const btn = document.createElement('button');
      btn.className = 'pr-float-btn';
      btn.innerHTML = '🔔';
      btn.title = 'PR 요청';
      btn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #A855F7, #F59E0B);
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(168, 85, 247, 0.4);
        z-index: 1000;
        transition: transform 0.2s;
      `;

      btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.1)');
      btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
      btn.addEventListener('click', () => this.showPRModal());

      document.body.appendChild(btn);
    }

    handlePRClick(e) {
      const btn = e.target.closest('[data-pr-type]');
      const type = btn.dataset.prType;
      const slot = btn.dataset.prSlot || this.detectSlot();

      this.showPRModal(type, slot);
    }

    detectSlot() {
      const match = window.location.pathname.match(/slots\/(slot\d+)/);
      return match ? match[1] : 'hq';
    }

    showPRModal(defaultType = null, slot = null) {
      // Remove existing modal
      const existing = document.getElementById('prModal');
      if (existing) existing.remove();

      slot = slot || this.detectSlot();

      const modal = document.createElement('div');
      modal.id = 'prModal';
      modal.innerHTML = `
        <div class="pr-modal-overlay" style="
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        ">
          <div class="pr-modal-content" style="
            background: #1a1a2e;
            border-radius: 16px;
            width: 100%;
            max-width: 400px;
            color: #f5f5f5;
          ">
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 20px;
              border-bottom: 1px solid rgba(255,255,255,0.1);
            ">
              <h3 style="font-size: 18px;">PR 요청</h3>
              <button id="prModalClose" style="
                background: none;
                border: none;
                color: #a0a0a0;
                font-size: 24px;
                cursor: pointer;
              ">&times;</button>
            </div>

            <form id="prForm" style="padding: 20px;">
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #a0a0a0;">요청 유형</label>
                <select name="type" style="
                  width: 100%;
                  padding: 12px 16px;
                  background: #0a0a14;
                  border: 1px solid rgba(255,255,255,0.1);
                  border-radius: 8px;
                  color: #f5f5f5;
                  font-size: 14px;
                ">
                  ${Object.entries(PR_CONFIG.types).map(([key, val]) => `
                    <option value="${key}" ${key === defaultType ? 'selected' : ''}>
                      ${val.emoji} ${val.name} ${val.price > 0 ? `(${(val.price/10000).toFixed(0)}만원)` : ''}
                    </option>
                  `).join('')}
                </select>
              </div>

              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #a0a0a0;">슬롯</label>
                <input type="text" name="slot" value="${slot}" readonly style="
                  width: 100%;
                  padding: 12px 16px;
                  background: #0a0a14;
                  border: 1px solid rgba(255,255,255,0.1);
                  border-radius: 8px;
                  color: #a0a0a0;
                  font-size: 14px;
                ">
              </div>

              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #a0a0a0;">요청 내용</label>
                <textarea name="content" rows="4" placeholder="어떤 작업이 필요한가요?" required style="
                  width: 100%;
                  padding: 12px 16px;
                  background: #0a0a14;
                  border: 1px solid rgba(255,255,255,0.1);
                  border-radius: 8px;
                  color: #f5f5f5;
                  font-size: 14px;
                  resize: vertical;
                "></textarea>
              </div>

              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #a0a0a0;">연락처 (선택)</label>
                <input type="text" name="contact" placeholder="카톡 ID 또는 전화번호" style="
                  width: 100%;
                  padding: 12px 16px;
                  background: #0a0a14;
                  border: 1px solid rgba(255,255,255,0.1);
                  border-radius: 8px;
                  color: #f5f5f5;
                  font-size: 14px;
                ">
              </div>

              <button type="submit" style="
                width: 100%;
                padding: 14px;
                background: linear-gradient(135deg, #A855F7, #F59E0B);
                border: none;
                border-radius: 8px;
                color: white;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
              ">요청 보내기</button>
            </form>

            <div style="
              padding: 15px 20px;
              background: rgba(245, 158, 11, 0.1);
              border-top: 1px solid rgba(255,255,255,0.1);
              font-size: 13px;
              color: #a0a0a0;
              text-align: center;
            ">
              요청은 카카오톡으로 전달됩니다
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      // Close button
      document.getElementById('prModalClose').addEventListener('click', () => modal.remove());

      // Click outside to close
      modal.querySelector('.pr-modal-overlay').addEventListener('click', (e) => {
        if (e.target.classList.contains('pr-modal-overlay')) modal.remove();
      });

      // Form submit
      document.getElementById('prForm').addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitPR(new FormData(e.target));
        modal.remove();
      });
    }

    submitPR(formData) {
      const request = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        type: formData.get('type'),
        slot: formData.get('slot'),
        content: formData.get('content'),
        contact: formData.get('contact'),
        status: 'pending',
        createdAt: new Date().toISOString(),
        page: window.location.href
      };

      // Save locally
      this.requests.push(request);
      this.saveRequests();

      // Generate KakaoTalk message
      const typeInfo = PR_CONFIG.types[request.type];
      const message = this.generateKakaoMessage(request, typeInfo);

      // Open KakaoTalk (or show message to copy)
      this.openKakao(message, request);

      // Send webhook if configured
      if (PR_CONFIG.webhookUrl) {
        this.sendWebhook(request);
      }

      // Show confirmation
      this.showConfirmation(request);
    }

    generateKakaoMessage(request, typeInfo) {
      return `[남원골 PR 요청]

📋 요청 ID: ${request.id}
${typeInfo.emoji} 유형: ${typeInfo.name}
📍 슬롯: ${request.slot}
💰 예상 비용: ${typeInfo.price > 0 ? `${(typeInfo.price/10000).toFixed(0)}만원` : '협의'}

📝 요청 내용:
${request.content}

🔗 페이지: ${request.page}
📅 요청 시간: ${new Date(request.createdAt).toLocaleString('ko-KR')}
`;
    }

    openKakao(message, request) {
      // Try KakaoTalk channel
      const kakaoUrl = `https://pf.kakao.com/_${PR_CONFIG.kakaoChannelId}/chat`;

      // Copy message to clipboard
      navigator.clipboard.writeText(message).then(() => {
        // Open in new tab
        window.open(kakaoUrl, '_blank');
      }).catch(() => {
        // Fallback: show message in alert
        alert('메시지를 복사해서 카카오톡에 붙여넣기 해주세요:\n\n' + message);
      });
    }

    sendWebhook(request) {
      fetch(PR_CONFIG.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      }).catch(err => console.error('Webhook failed:', err));
    }

    showConfirmation(request) {
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #22c55e;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 14px;
        z-index: 3000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        animation: slideUp 0.3s ease;
      `;
      toast.innerHTML = `
        ✅ PR 요청이 접수되었습니다<br>
        <small style="opacity: 0.8;">ID: ${request.id}</small>
      `;

      // Add animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(100%); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);

      document.body.appendChild(toast);

      setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }

    loadRequests() {
      const stored = localStorage.getItem(PR_CONFIG.storageKey);
      return stored ? JSON.parse(stored) : [];
    }

    saveRequests() {
      localStorage.setItem(PR_CONFIG.storageKey, JSON.stringify(this.requests));
    }

    // Public API
    getRequests() {
      return this.requests;
    }

    getRequestsBySlot(slot) {
      return this.requests.filter(r => r.slot === slot);
    }

    updateRequestStatus(id, status) {
      const request = this.requests.find(r => r.id === id);
      if (request) {
        request.status = status;
        request.updatedAt = new Date().toISOString();
        this.saveRequests();
      }
      return request;
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.NMGPRSystem = new PRSystem();
    });
  } else {
    window.NMGPRSystem = new PRSystem();
  }

  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PRSystem;
  }
})();
