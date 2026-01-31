# Vesslo 앱 소스 감지 및 배지 로직 문서

## 1. 개요
Vesslo는 앱이 어떤 방식으로 설치되었고 업데이트 되어야 하는지 판단하기 위해 다양한 감지 로직을 사용합니다. 이 문서는 각 소스(Source)의 판별 기준과 UI 배지 표시 로직, 그리고 최근 발생한 **Eagle 앱 오인식 문제**의 원인을 설명합니다.

## 2. 소스 감지 로직 (Source Detection)

### 2.1 Sparkle (자체 업데이트)
앱 내부에 포함된 프레임워크나 설정 파일을 통해 감지합니다. (`AppMetadataDetector.swift`)
- **감지 기준**:
  - `Contents/Frameworks/Sparkle.framework` 폴더 존재
  - `Info.plist` 내 `SUFeedURL` 키 존재
  - 기타 호환 프레임워크 (`DevMateKit`, `ShipKit` 등) 존재

### 2.2 Homebrew
시스템에 설치된 Homebrew의 정보를 기준으로 합니다. (`UpdateCheckService.swift`)
- **감지 기준**:
  - `brew list --cask` 명령어 결과에 해당 앱의 Cask 이름(Token)이 포함되어 있음.
  - Vesslo가 앱을 스캔할 때, 설치된 앱의 번들 ID나 이름이 `brew list`의 결과와 매칭되면 `updates.contains(.homebrew)`로 설정됨.

### 2.3 Mac App Store
앱 서명 및 영수증 파일을 확인합니다.
- **감지 기준**:
  - `Contents/_MASReceipt/receipt` 파일 존재

---

## 3. "Adoptable" (Brew 전환 가능) 상태란?
앱이 현재 Homebrew로 관리되고 있지 않지만(`brew list`에 없음), Homebrew에 동일한 앱의 Cask가 존재하여 **"앞으로 Brew로 업데이트 관리가 가능한 상태"**를 의미합니다.

- **판별 로직**:
  1. 앱이 **Homebrew로 설치된 상태가 아님** (`isInstalledViaBrew == false`).
  2. `brew search` 또는 캐시된 DB에서 앱 이름과 일치하는 Cask를 발견함.
  3. 이 경우, 앱 객체(`AppItem`)에 `homebrewCaskName` 속성이 설정됨.

### UI 표시 (배지)
- **Sparkle 배지**: 기본적으로 Sparkle 모듈이 감지되면 표시.
- **Brew 배지**: `app.sources`에 `.homebrew`가 포함되어 있으면 표시 (주황색).
- **Adoptable 상태**: 별도 배지는 없으나, "Brew로 업데이트 가능"하다는 정보를 내부적으로 가짐. 설정을 통해 Brew 업데이트를 시도할 수 있음.

---

## 4. Eagle 앱 사례 분석: 왜 "Brew" 배지가 떴는가? (버그 원인)

사용자 리포트에서 **Eagle.app** (Sparkle 기반)이 **Brew 배지**를 달고 나왔고, 엉뚱한 버전(9.6.2) 업데이트를 제안했습니다.

### 원인 분석
1. **잘못된 매칭 (Identity Crisis)**:
   - 앱 이름 "Eagle"로 검색 -> Autodesk의 `eagle` Cask (회로 설계 툴)와 이름이 정확히 일치하여 매칭됨.
   - 실제 필요한 Cask는 `ogdesign-eagle`이었으나, 이름 매칭 로직이 단순하여 `eagle`을 선택함.

2. **상태 오염 (Status Promotion Bug)**:
   - `UpdateCheckService.swift`의 로직 결함으로 인해, **"Adoptable(전환 가능)"** 상태인 앱의 업데이트 정보를 확인하는 과정에서, 업데이트가 있다고 판단되면 강제로 **"Brew로 설치됨(`isInstalledViaBrew = true`)"** 상태로 변경해버림.
   - 코드 위치: `UpdateCheckService.swift`의 `checkCaskUpdate` 함수 (약 593 라인).
   ```swift
   // Adoptable 앱인데 업데이트 정보가 확인되면...
   match.isInstalledViaBrew = true  // <--- 여기서 강제로 "Brew 설치됨"으로 확정지음
   match.sources.insert(.homebrew)  // <--- 이로 인해 UI에 "Brew" 배지가 즉시 표시됨
   ```

### 수정 계획
1. **매칭 로직 강화**: 이름만 보지 않고 **Bundle ID**(`tw.ogdesign.eagle`)를 최우선으로 확인하여 `ogdesign-eagle` Cask를 찾도록 수정. (완료)
2. **상태 변경 방지**: Adoptable 앱은 업데이트 정보가 있어도 사용자가 명시적으로 "Brew로 업데이트"를 누르기 전까지는 `isInstalledViaBrew`를 `true`로 설정하지 않도록 수정 예정.
