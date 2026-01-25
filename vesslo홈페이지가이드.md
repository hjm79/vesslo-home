***

## 프롬프트: React-three-fiber 기반 앱 소개 홈페이지 제작

### 프로젝트 개요
vesslo, KeyHarbor, SplitSwipe 3개의 macOS 앱을 소개하고 판매하는 랜딩 페이지를 React + react-three-fiber + @react-three/drei로 제작해주세요.

### 기술 스택
- React 18+ (Next.js 또는 Vite)
- react-three-fiber (R3F)
- @react-three/drei
- GSAP (스크롤 애니메이션용)
- TailwindCSS (레이아웃 및 스타일링)
- Paddle SDK (결제 통합)

### 3D 인터랙션 요구사항

#### 1. 홈페이지 메인 (/) - ScrollControls 기반 섹션별 3D 효과
```
- Drei의 ScrollControls를 사용하여 전체 페이지를 스크롤 기반 3D 씬으로 구성
- 3개 섹션 구조:
  
  섹션 1 (Hero): 
  - 3D 공간에 "vesslo" 텍스트가 Text3D로 렌더링
  - Float 효과로 부유하는 애니메이션
  - Environment 컴포넌트로 스튜디오 조명 설정
  
  섹션 2 (앱 쇼케이스):
  - 3개 앱 카드가 3D 공간에 배치 (z축 깊이감 있게)
  - 각 카드에 PresentationControls 적용 (마우스로 회전 가능)
  - 스크롤 진행도에 따라 카드가 순차적으로 등장 (GSAP timeline)
  - 각 카드 hover 시 Float 애니메이션 강화
  - Html 컴포넌트로 앱 이름, 가격, Paddle 구매 버튼 오버레이
  
  섹션 3 (CTA):
  - MeshReflectorMaterial로 반사 효과가 있는 플로어
  - 3개 앱 아이콘이 원형으로 회전하는 애니메이션
```

#### 2. 개별 앱 페이지 (/keyharbor, /splitswipe)
```
- 상단: 앱 아이콘/스크린샷을 3D 공간에 배치
  - OrbitControls로 자유롭게 회전 가능
  - ContactShadows로 그림자 효과
  - Stage 컴포넌트로 자동 조명 설정
  
- 중단: 기능 소개 카드들
  - 스크롤 시 순차적으로 fade-in + scale 애니메이션
  - 각 카드에 미묘한 Float 효과
  
- 하단: Paddle 구매 버튼
  - 3D 버튼 오브젝트 또는 Html 컴포넌트로 구현
  - hover 시 빛나는 효과 (emissive material)
```

#### 3. 반응형 3D 처리
```
- 모바일: 3D 효과 단순화 (성능 고려)
  - PresentationControls 대신 자동 회전
  - 파티클/반사 효과 비활성화
  - useMediaQuery로 조건부 렌더링
```

### 페이지 구조

#### 메인 페이지 (/)
- Hero 섹션: 3D Text로 "Transform Your Mac Productivity" + vesslo 로고
- 앱 소개 섹션: 3개 앱 3D 카드 그리드 (vesslo, KeyHarbor, SplitSwipe)
- 각 카드 클릭 시 해당 앱 페이지로 이동

#### 개별 앱 페이지
- `/`: vesslo소개.md 기반
- `/keyharbor`: keyharbor소개.md 기반
- `/splitswipe`: splitswipe소개.md 기반

각 페이지 구성:
- 3D 앱 아이콘/스크린샷 뷰어
- 마크다운 내용 렌더링
- Paddle 구매 버튼 통합
- 관련 앱 추천 섹션

#### 법률 페이지 (Paddle 필수)
- `/terms` - 이용약관
- `/privacy` - 개인정보처리방침
- `/refund` - 환불 정책
- `/contact` - 고객 지원

### 디자인 요구사항
✅ **다크/라이트 모드**
- 3D 씬도 테마에 따라 배경색/조명 변경
- Environment의 preset을 'sunset'(다크) / 'studio'(라이트)로 전환

✅ **영어/한국어 지원**
- react-i18next 사용
- 3D Text3D 컴포넌트도 언어별 텍스트 반영

✅ **모바일 반응형**
- 그리드: 데스크톱 3열 → 태블릿 2열 → 모바일 1열
- 3D 효과는 성능에 따라 degradation

✅ **Paddle 통합**
- 각 앱 페이지에 Paddle Checkout 버튼
- 가격 정보 동적 로딩
- 결제 성공/실패 모달

### Paddle 승인 체크리스트
- [ ] 모든 법률 페이지 링크가 footer에 명시
- [ ] 환불 정책 명확히 표시
- [ ] 연락처 정보 공개
- [ ] 앱 스크린샷 및 기능 설명 충분
- [ ] 가격 정보 투명하게 표시

### 성능 최적화
- 3D 모델은 low-poly로 제작
- Suspense + Loader 컴포넌트로 로딩 처리
- 모바일에서 3D 효과 축소 또는 비활성화 옵션
- Code splitting으로 3D 관련 코드 lazy load

### 참고 구현 패턴
- Atmos 웹사이트 스타일의 스크롤 애니메이션 [youtube](https://www.youtube.com/watch?v=8r8rzp8t2aM)
- Drei의 ScrollControls + GSAP 조합 [wawasensei.hashnode](https://wawasensei.hashnode.dev/scroll-animations-with-react-three-fiber-and-gsap)
- PresentationControls로 제품 회전 뷰어 [github](https://github.com/saadamirpk/product-showcase-3d)
- Float 컴포넌트로 부유 효과 [r3f.docs.pmnd](https://r3f.docs.pmnd.rs/getting-started/examples)

***
