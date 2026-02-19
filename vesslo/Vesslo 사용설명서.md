# Vesslo 사용설명서

> macOS 앱 관리의 새로운 기준

---

## 📱 Vesslo란?

Vesslo는 Mac에 설치된 모든 앱을 **한 곳에서 관리**할 수 있는 앱 관리자입니다.

### 주요 특징

| 기능 | 설명 |
|------|------|
| **통합 업데이트** | Homebrew, Sparkle, App Store 앱을 한 화면에서 업데이트 |
| **스마트 분류** | 카테고리, 태그, 소스별 자동 분류 |
| **배치 업데이트** | 여러 앱을 한 번에 업데이트 |
| **실행 앱 감지** | 실행 중인 앱 종료 후 안전하게 업데이트 |

---

## 🖥️ 화면 구성

### 메인 화면 (3단 구조)

![[vesslo-composition.jpeg]]


#### 1번 패널: 사이드바
- **모든 앱**: 설치된 전체 앱
- **업데이트 가능**: 업데이트가 있는 앱
- **실행 중**: 현재 실행 중인 앱
- **카테고리별**: 개발 도구, 생산성, 유틸리티 등

#### 2번/3번 패널: 앱 목록 및 상세

---

## 👁️ 보기 모드

### 일반 보기 (앱 전체 목록)

| 모드        | 단축키 | 설명                |
| --------- | --- | ----------------- |
| **리스트 뷰** | -   | 앱을 한 줄씩 세로로 표시    |
| **스플릿 뷰** | -   | 왼쪽 목록 + 오른쪽 상세 정보 |
리스트뷰
![[vesslo-listview.jpeg]]

스플릿뷰
![[vesslo-gridview.jpeg]]



### 업데이트스 보기 (업데이트 가능 앱)

| 모드        | 설명                       |
| --------- | ------------------------ |
| **그리드 뷰** | App Store 스타일 2열 카드 레이아웃 |
| **리스트 뷰** | 한 줄씩 표시하는 간결한 레이아웃       |
업데이트스 그리드뷰
![[vesslo-updates-gridview.jpeg]]

업데이트스 리스트뷰
![[vesslo-updates-listview.jpeg]]


---

## 🔄 업데이트 기능

### 개별 업데이트

앱의 소스에 따라 **업데이트 버튼의 라벨과 동작이 달라집니다**:

| 앱 유형                    | 버튼 라벨            | 동작                                                |
| ----------------------- | ---------------- | ------------------------------------------------- |
| **Homebrew**            | 업데이트             | `brew upgrade --cask` 자동 실행                       |
| **Sparkle**             | 업데이트             | 앱 내장 업데이터로 자동 업데이트                                |
| **App Store**           | 업데이트 (메뉴)        | `mas upgrade` 또는 App Store 열기 선택                  |
| **Adoptable (Manual)**  | **전환 후 업데이트** 🟠 | `brew install --cask --adopt`로 Homebrew 전환 + 업데이트 |
| **Adoptable + Sparkle** | 업데이트 (옵션)        | 기본은 Sparkle 업데이트, 메뉴 옵션으로 `Adopt & Update` 선택 가능  |
| **Manual**              | **앱 열기**         | 앱을 실행하여 앱 내 업데이터에서 수동 확인                          |

1. 앱 목록에서 원하는 앱 선택
2. **업데이트** 버튼 클릭(버튼은 위 리스트대로 표시됨 )
3. 자동으로 최신 버전 설치
![[vesslo-detail-update.jpeg]]
### 모두 업데이트 (배치)
1. 사이드바에서 **업데이트 가능** 클릭
2. 우측 상단 **모두 업데이트** 버튼 클릭
3. 실행 중인 앱 확인 후 진행
4. **Homebrew 앱**: 자동으로 업데이트 진행
5. **비밀번호 필요 앱**: 주황색 섹션에서 "터미널 열기" → 비밀번호 입력 → "완료 확인"
6. **App Store 앱**: 파란색 섹션에서 "터미널 열기" → `mas upgrade` 실행 → "완료 확인"
7. **Adoptable/Manual 앱**: 자동화 불가하므로 **skipped** 처리됨 (개별 상세페이지에서 처리)
![[vesslo-updates-udate_all.png]]
### 카테고리별 모두 업데이트 ⭐
1. 사이드바에서 **원하는 카테고리 선택** (예: 개발 도구)
2. **모두 업데이트** 버튼 클릭
3. **해당 카테고리 앱만** 업데이트됨
![[vesslo-updates-category.jpeg]]
> 💡 **팁**: 특정 카테고리만 업데이트하고 싶을 때 유용합니다!

---

## ⚙️ 실행 중 앱 처리 설정

**설정 → 업데이트 → 전체 업데이트 시 실행 앱 처리**

| 옵션 | 동작 |
|------|------|
| **안전 종료 (Safe)** | 종료 전 확인 팝업 표시, 앱이 저장 다이얼로그 띄울 기회 제공 |
| **강제 종료 (Force)** | 확인 없이 즉시 종료 (저장 안 된 데이터 손실 가능) |
| **건너뛰기 (Skip)** | 실행 중인 앱은 업데이트하지 않음 |
![[vesslo-setting-updates.png]]
### 안전 종료 화면 예시

![[vesslo-safe.png]]

---

## 📦 업데이트 소스

Vesslo는 다양한 소스에서 업데이트를 감지합니다:

| 소스            | 배지 색상 | 설명                              | 업데이트 버튼       |
| ------------- | ----- | ------------------------------- | ------------- |
| **Homebrew**  | 🟠 주황 | `brew upgrade --cask` 명령으로 업데이트 | 업데이트          |
| **Sparkle**   | 🟣 보라 | 앱 내장 업데이트 시스템 사용                | 업데이트          |
| **App Store** | 🔵 파랑 | `mas` CLI로 업데이트                 | 업데이트 (메뉴)     |
| **Adoptable** | 🟠 주황 | Homebrew cask 매핑이 있지만 brew로 미설치 | **전환 후 업데이트** |
| **Setapp**    | 🟢 초록 | Setapp 앱에서 직접 업데이트 필요           | 앱 열기          |
| **Manual**    | ⚪ 회색  | 자동 업데이트 소스 없음                   | **앱 열기**      |
![[vesslo-sparkle-adoptable.png]]
![[vesslo-brew.png]]
![[vesslo-appstore-running.png]]




### 앱 아이콘 배지

앱 이름 옆에 표시되는 아이콘 배지로 추가 정보를 확인할 수 있습니다:


| 아이콘           | 의미                                                      |
| ------------- | ------------------------------------------------------- |
| 🔒 (자물쇠)      | 비밀번호(sudo) 입력이 필요한 앱                                    |
| 📦 (상자)       | **수동 설치 앱** - `brew upgrade` 불가, `brew fetch` + 인스톨러 실행 |
| 🔄📦 (화살표+상자) | Homebrew로 전환 가능한 앱 (Adoptable)                          |
| iOS           | iOS/iPadOS용 앱 (Apple Silicon Mac에서 실행)                  |
| Electron      | Electron 프레임워크 기반 앱                                     |
![[vesslo-sudo-box.png]]
![[vesslo-ios.png]]



---

## 📦 수동 설치(Installer Manual) 앱

일부 Homebrew Cask 앱은 **수동 설치**가 필요합니다.
이런 앱은 `brew upgrade --cask`로 자동 업데이트가 **불가능**합니다.

### 해당 앱 예시
- Loupedeck, Logitech Options 등

### 어떻게 알 수 있나요?
- 앱 이름 옆에 📦 **주황색 상자 아이콘**이 표시됩니다
- 상세 페이지에서 `brew fetch --cask 앱이름` 명령어가 표시됩니다
![[vesslo-loupedeck.jpeg]]

### 업데이트 방법

**개별 업데이트:**
1. 앱 상세 페이지의 배너에서 명령어 옆 **복사 버튼** 클릭
2. 터미널에 붙여넣고 실행
3. 다운로드된 PKG 파일을 Finder에서 실행하여 설치 완료

**배치 업데이트 (모두 업데이트):**
- 수동 설치 앱은 자동으로 **터미널 처리 섹션**으로 분류됩니다
- "터미널 열기" 버튼 클릭 시 `brew fetch --cask`로 다운로드 후 인스톨러가 자동 실행됩니다
- PKG/DMG 파일이 열리면 설치를 완료하면 됩니다

> 💡 **일반 sudo 앱과의 차이**: sudo 앱은 `brew upgrade`로 자동 설치되지만, 수동 설치 앱은 `brew fetch`로 다운로드 후 PKG/DMG를 직접 실행해야 합니다. 기존 앱 데이터와 플러그인이 보존됩니다.

---

## 🔄📦 Adoptable 앱 (Homebrew 전환)

Adoptable 앱은 **Homebrew cask가 존재하지만 brew로 설치하지 않은 앱**입니다.
예: 공식 사이트에서 직접 다운로드한 Firefox, XnViewMP 등
![[vesslo-adopt-homebrew.png]]

### 어떻게 알 수 있나요?
- 앱 이름 옆에 🔄📦 **주황색 전환 아이콘**이 표시됩니다
- 업데이트 화면에서 **"전환 가능"** 섹션에 분류됩니다
- 상세 페이지에 **"Adopt to Homebrew"** 버튼이 표시됩니다

### 전환 후 업데이트 (Adopt & Update)
1. 개별 업데이트 버튼(상세/리스트/그리드/테이블)에서 **"전환 후 업데이트"** 🟠 클릭
2. 전환 전 확인 팝업에서 경고 내용을 확인하고 진행
3. `brew install --cask --adopt --appdir <설치경로> <앱>` 명령이 자동 실행됩니다
4. 기존 앱을 삭제하지 않고 Homebrew 관리 하에 등록됩니다
5. 성공 시 소스가 **Manual → Homebrew**로 자동 전환됩니다
6. 이후부터 배치 업데이트(모두 업데이트)에서 **자동 업데이트 대상**이 됩니다

> Sparkle 소스를 가진 Adoptable 앱은 기본 업데이트 버튼으로 Sparkle 업데이트를 먼저 사용할 수 있습니다.
> 필요할 때만 `Adopt & Update` 옵션으로 Homebrew 전환 + 업데이트를 실행하세요.

### 전환 전 확인(Preflight)
다음 항목을 자동 점검한 뒤 진행 여부를 안내합니다:
- Homebrew cask 매핑 존재 여부
- 앱 설치 경로(`/Applications`, `~/Applications`) 지원 여부
- 앱 실행 중 여부(실행 중이면 종료 후 재시도 필요)
- cask 특성 경고(`auto_updates`, uninstall delete, 비밀번호 필요 가능성)

![[vesslo-preflight.png]]

### ⚠️ Adopt 시 주의사항

| 항목 | 설명 |
|------|------|
| **adopt 자체** | 기존 앱을 그대로 두고 등록만 하므로 **안전** |
| **이후 upgrade** | `brew upgrade`가 앱을 **삭제 후 재설치**하는 cask가 있어, 앱 내부 설정이 초기화될 수 있음 |
| **되돌리기** | adopt 후 `brew uninstall`하면 앱이 **삭제**됩니다. "등록만 해제"하는 명령은 없음 |
| **경로** | `/Applications` 또는 `~/Applications`에 설치된 앱만 adopt 가능 |

> 💡 **팁**: 대부분의 앱은 안전하게 adopt됩니다. 중요한 앱은 설정 백업 후 진행하세요.

### 배치 업데이트에서는?
- Adoptable 앱은 배치(모두 업데이트)에서 **"수동 업데이트 필요"로 skip** 됩니다
- 개별 "전환 후 업데이트"를 한 번 실행하면, 이후 배치에서 자동 업데이트됩니다

---


## 🏷️ 앱 관리 기능

### 앱 삭제 (Uninstall)

- 상세 화면에서 **앱 삭제**를 누르면 삭제 시트가 열리고, 관련 파일을 확인한 뒤 선택 항목을 휴지통으로 이동합니다.

- 일반 앱은 **표준 스캔**(사용자 영역)과 **딥 클린 스캔**(시스템 `/Library` 포함) 중에서 선택할 수 있습니다.
![[vesslo-deepclean.png]]

- 실행 중인 앱은 삭제 전에 자동 종료를 시도하며, 종료되지 않으면 삭제를 진행하지 않습니다.

- Homebrew 설치 앱은 `brew uninstall --cask`(옵션: `--zap`) 경로로 삭제됩니다.

- 삭제 결과는 성공/부분 실패를 구분해 안내하며, 실행 기록은 `~/Library/Application Support/Vesslo/UninstallReports/`에 저장됩니다.

### 업데이트 건너뛰기
- **버전 건너뛰기**: 특정 버전만 무시 (다음 버전은 알림)
- **앱 무시**: 해당 앱의 모든 업데이트 무시
![[vesslo-update-skip.png]]
### 태그 관리
- 앱에 사용자 정의 태그 추가
- 태그로 앱 필터링 및 검색
![[vesslo-tag.png]]
### 메모 기능
- 앱별로 메모 작성 가능(markdown 형식 지원)
- 라이선스 키, 설정 정보 등 기록
![[vessl-memo.jpeg]]

---

## 🔍 검색 및 필터

### 검색
- 상단 검색창에서 앱 이름으로 검색
- Enter 키로 검색 실행

### 필터 옵션
- **소스별**: Homebrew, Sparkle, App Store 등
- **카테고리별**: 개발 도구, 생산성, 유틸리티 등
- **상태별**: 업데이트 가능, 실행 중, 무시됨 등

---

## ⌨️ 단축키

| 단축키   | 기능        |
| ----- | --------- |
| ⌘ + R | 앱 목록 새로고침 |
| ⌘ + , | 설정 열기     |
| ⌘ + F | 검색        |

---

## 🛠️ 설정

### 일반
- **언어**: 한국어 / English
- **시작 시 업데이트 확인**: 앱 실행 시 자동 확인

### 업데이트
- **자동 새로고침 간격**: 1시간 / 6시간 / 12시간 / 24시간 / 수동
- **전체 업데이트 시 앱 종료 방식**: Safe / Force / Skip

### 검색 대상
- Homebrew 업데이트 검색
- Sparkle 업데이트 검색
- App Store 업데이트 검색

---
## ❓ 자주 묻는 질문

### Q: 업데이트가 감지되지 않아요
1. **⌘ + R**로 새로고침
2. 설정에서 해당 소스가 활성화되어 있는지 확인
3. 앱이 "무시됨" 상태인지 확인

### Q: Homebrew 업데이트가 터미널에서 열려요
Homebrew 업데이트 중 비밀번호가 필요하거나 수동 설치가 필요한 앱은 터미널에서 실행됩니다.
- **🔒 자물쇠 앱**: `brew upgrade --cask --force` (비밀번호 입력 후 자동 설치)
- **📦 상자 앱**: `brew fetch --cask` (다운로드 후 PKG/DMG 자동 실행, 기존 데이터 보존)

### Q: 📦 상자 아이콘이 붙은 앱은 뭔가요?
`installer manual` 타입의 Homebrew Cask입니다. 이런 앱은 `brew upgrade`로 자동 업데이트가 불가능하여 `brew fetch`로 다운로드 후 인스톨러를 직접 실행합니다. 자세한 내용은 위의 **📦 수동 설치(Installer Manual) 앱** 섹션을 참고하세요.

### Q: 🔄📦 전환 가능(Adoptable) 앱은 뭔가요?
Homebrew cask 매핑이 존재하지만, brew가 아닌 다른 경로(공식 사이트, DMG 등)로 설치된 앱입니다. **"전환 후 업데이트"** 버튼으로 Homebrew 관리 하에 등록하면 이후 자동 업데이트가 가능합니다. 자세한 내용은 위의 **🔄📦 Adoptable 앱** 섹션을 참고하세요.

### Q: "전환 후 업데이트"가 실패해요
- 앱이 `/Applications` 또는 `~/Applications`에 설치되어 있는지 확인하세요
- 앱이 실행 중이면 종료 후 다시 시도하세요
- cask 이름이 실제 앱과 다를 수 있습니다 — 상세 페이지의 "Adopt to Homebrew" 시트에서 올바른 cask를 선택하세요

### Q: 왜 "모두 업데이트"에서 전환 가능 앱이 건너뛰어지나요?
Adoptable 앱 전환은 사용자 확인이 필요한 작업이라 배치에서는 자동 실행되지 않습니다. 개별 업데이트에서 **"전환 후 업데이트"**를 한 번 실행하면 이후부터는 Homebrew 앱처럼 배치 자동 업데이트 대상이 됩니다.

### Q: App Store 앱 업데이트가 안 돼요
- `mas` CLI가 설치되어 있어야 합니다. 설치 안내는 설정에서 확인하세요.
- `mas upgrade`는 비밀번호가 필요하므로 터미널에서 실행됩니다.
- 배치 업데이트 시 App Store 앱은 파란색 섹션에 표시되며, "터미널 열기" 버튼으로 일괄 업데이트합니다.

---

## � Raycast 익스텐션

Vesslo의 핵심 기능을 [Raycast](https://raycast.com)에서 바로 사용할 수 있습니다.

### 설치

1. Raycast Store에서 **Vesslo** 검색 또는 [직접 설치](https://raycast.com/hjm79/vesslo)
2. Vesslo 앱이 Mac에 설치되어 있어야 합니다

### 제공 커맨드

| 커맨드 | 설명 |
|--------|------|
| **🔍 Search Apps** | 이름, 개발자, 태그, 메모로 앱 검색 |
| **🔄 View Updates** | 업데이트 가능한 앱 확인 (Homebrew, Sparkle, App Store) |
| **🏷️ Browse by Tag** | 태그별 앱 탐색 |
| **🍺 Bulk Homebrew Update** | 모든 Homebrew 앱 일괄 업데이트 |
![[/Users/hjm/Documents/git/app.hjm79.top/vesslo/vesslo-raycast01.jpeg]]

### 사용 방법

1. Raycast 열기 (기본: `⌥ + Space`)
2. `Search Apps`, `View Updates` 등 커맨드명 입력
3. 앱 선택 후 Action Panel(`⌘ + K`)에서 추가 동작 실행
   - **Vesslo에서 열기**: 앱 상세 화면으로 이동
   - **Finder에서 열기**: 설치 위치 표시
   - **앱 실행**: 해당 앱 바로 실행
   - **업데이트**: Vesslo 딥링크를 통한 업데이트
![[/Users/hjm/Documents/git/app.hjm79.top/vesslo/vesslo-raycast02.jpeg]]
![[/Users/hjm/Documents/git/app.hjm79.top/vesslo/vesslo-raycast03.jpeg]]   

> 💡 **팁**: Raycast 익스텐션은 Vesslo 앱의 데이터를 실시간으로 동기화합니다. Vesslo에서 스캔/업데이트하면 Raycast에도 바로 반영됩니다.

---

## 📞 지원

- **웹사이트**: [vesslo.top/vesslo](https://vesslo.top/vesslo)
- **이메일**: me@hjm79.top

---

*Vesslo - Mac 앱 관리의 새로운 기준* ✨
