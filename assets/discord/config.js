// SSOT: 28 레포 복제 시 아래 5줄만 교체
// namoneygoal 전용 설정 — 박씨 4값 입력 대기
//
// 박씨가 입력해야 할 값 (아침 확인 시):
//   1. CH_ID           Discord 일반 채팅 채널 ID
//   2. WEBHOOK         Discord Webhook URL (namoneygoal 전용 채널)
//   3. FORUM_CH        Discord 포럼 채널 ID (공지/질문)
//   4. (선택) 새 GUILD_ID — phoneparis/papafly와 분리할 경우만
//
// GUILD_ID 유지 시 phoneparis/papafly 동일 서버 내 채널 분리 운영
//
export const CFG = {
  GUILD_ID:    "1493490911278272655",                // phoneparis/papafly 공통 (그대로 유지 권장)
  OAUTH_CID:   "1492464128865075350",                // OAuth 앱 (공용)
  CACHE_BASE:  "https://dtslib1979.github.io/dtslib-papyrus/data/channels",

  // ↓↓↓ 박씨 입력 대기 (레포별 교체) ↓↓↓
  REPO:        "namoneygoal",
  CH_ID:       "PLACEHOLDER_CHANNEL_ID",             // ⚠️ 박씨 입력 필요
  WEBHOOK:     "PLACEHOLDER_WEBHOOK_URL",            // ⚠️ 박씨 입력 필요
  FORUM_CH:    "PLACEHOLDER_FORUM_CHANNEL_ID",       // ⚠️ 박씨 입력 필요
  WB_CHAT:     "https://e.widgetbot.io/channels/1493490911278272655/PLACEHOLDER_CHANNEL_ID",
  WB_FORUM:    "https://e.widgetbot.io/channels/1493490911278272655/PLACEHOLDER_FORUM_CHANNEL_ID",
  // ↑↑↑ 박씨 입력 대기 끝 ↑↑↑

  THEME: {
    GOLD:    "#D4AF37",
    BG:      "#0F0C04",
    EMERALD: "#10b981",
    MUTED:   "#6B5E3A",
  },
};
