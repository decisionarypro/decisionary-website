(function(){
'use strict';
const ko={
  "brief1": "개발하거나 개선하려는 제품",
  "brief2": "현재 서비스, 사용자 및 관련 시스템",
  "brief3": "예상 예산 범위와 출시 희망 시점",
  "brief4": "직접 발주 또는 에이전시 협업 여부",
  "brief_cta": "프로젝트 문의하기",
  "brief_intro": "간단한 이메일이면 충분합니다.",
  "brief_title": "첫 문의에 필요한 내용",
  "c01_b1": "조직 단위 접근·권한 정책 설계",
  "c01_b2": "학습 배정·보상·랭킹 관련 업무 규칙 정의",
  "c01_b3": "시간대 관련 서비스 정책 조율",
  "c01_b4": "사용자·조직·권한·학습 기록의 단계별 데이터 이관 원칙 수립",
  "c01_b5": "API 기반 이관과 일괄 이관의 책임 범위 정리",
  "c01_b6": "QA 계획, 출시 점검, 운영 인계 지원",
  "c01_b7": "출시 필수 요구사항과 출시 후 개선 사항 분리",
  "c01_ch1": "전 세계에 일관된 서비스를 제공하면서 조직별 규칙과 지역 운영 요건을 함께 맞춰야 했습니다.",
  "c01_ch2": "여러 개발팀이 빠듯한 출시 일정 안에서 일했고, 데이터 이관·사용자 접근·시스템 검증·운영 준비가 프로젝트 곳곳에 의존 관계를 만들었습니다.",
  "c01_ci": "대표는 제품 전략과 프로젝트 리더 역할을 맡아 현업, 기획, 디자인, 개발, 인프라, 파트너 조직 사이의 요구사항과 주요 의사결정을 조율했습니다. 주요 업무는 다음과 같습니다.",
  "c01_metric": "약 100개국 베타 출시 준비",
  "c01_o1": "약 100개국 대상 2026년 4월 베타 출시 준비 지원",
  "c01_o2": "3단계 데이터 이관 전략 수립",
  "c01_o3": "사용자 2만 명 규모 부하 테스트 검증 기준 정의",
  "c01_o4": "출시 범위, 의존 관계, 검수 기준에 대한 합의 수준 향상",
  "c01_ov1": "약 100개국 사용자를 대상으로 하는 다국적 학습 플랫폼 고도화 프로젝트입니다.",
  "c01_ov2": "핵심 기능을 일관되게 유지하면서 조직 구조, 사용자 권한, 학습 배정, 보상 체계, 지역별 운영 요건을 모두 지원해야 했습니다.",
  "c01_ov3": "기존 플랫폼의 사용자·학습 데이터를 새 환경으로 옮기는 작업도 포함되어, 현업 담당자·기술팀·운영 조직 사이의 조율이 필요했습니다.",
  "c01_role": "제품 전략·프로그램 총괄",
  "c01_title": "글로벌 학습 플랫폼 전환·데이터 이관",
  "c02_b1": "고객 가입 흐름 재설계",
  "c02_b2": "보험 상품·관리 기능 요구사항 정의",
  "c02_b3": "고객용 기능과 관리자 기능 구조 설계",
  "c02_b4": "보험사와 판매 파트너 간 요구사항 조율",
  "c02_b5": "파트너 API 연동과 제품 흐름 정렬",
  "c02_b6": "가입·결제·정산 과정의 운영 예외 처리 정리",
  "c02_ch1": "보험 가입에는 고객 입력 항목이 많고, 파트너마다 요구사항이 달랐으며, 여러 운영 절차가 얽혀 있었습니다.",
  "c02_ch2": "불편을 줄이려면 고객 화면을 다시 설계하는 것만으로는 부족했습니다. 상품 규칙, 파트너 연동, 관리자 기능, 결제·정산 흐름이 함께 맞물려 작동해야 했습니다.",
  "c02_ci": "대표는 플랫폼의 제품 구조, 고객 가입 흐름, 관리자 요구사항, 파트너 연동 조율을 맡았습니다. 주요 업무는 다음과 같습니다.",
  "c02_metric": "가입 전환율 12% → 28%",
  "c02_o1": "가입 전환율 12%에서 28%로 향상",
  "c02_o2": "평균 가입 시간 8분에서 3분으로 단축",
  "c02_o3": "파트너 API 채널로 신규 고객 약 1,200명 확보",
  "c02_o4": "참여 기관 전반에 더 일관된 제품·운영 구조 정립",
  "c02_ov1": "보험사, 판매 파트너, 최종 고객을 연결하는 디지털 보험 판매 플랫폼입니다.",
  "c02_ov2": "파트너 채널을 통한 보험 가입을 지원했으며, 고객용 화면, 관리자 기능, 결제 관련 업무, 외부 시스템 연동을 함께 다뤘습니다.",
  "c02_ov3": "여러 참여 기관의 운영 요건을 지원하면서 보험 가입 과정을 간소화하는 것이 목표였습니다.",
  "c02_role": "제품 관리·연동 총괄",
  "c02_title": "B2B2C 보험 판매 플랫폼",
  "c03_b1": "사용자 인터뷰와 사용성 테스트 23회 진행",
  "c03_b2": "후보 기능 36개를 고객 요구와 구현 우선순위 기준으로 검토",
  "c03_b3": "MVP 기능 15개 정의",
  "c03_b4": "기획·디자인·개발 11명 팀 조율",
  "c03_b5": "스프린트 우선순위, 개발 의존 관계, 출시 마일스톤 관리",
  "c03_b6": "출시 전 품질 개선과 이슈 해결 지원",
  "c03_ch1": "기존 앱에는 기능이 많이 쌓여 있어 사용자와 개발팀 모두에게 복잡도가 컸습니다.",
  "c03_ch2": "첫 출시 범위를 불필요하게 넓히지 않으면서 사용성 개선, 기술 품질, 개발 여력, 출시 일정을 함께 맞춰야 했습니다.",
  "c03_ci": "대표는 제품 범위 정의와 직군 간 개발 조율을 이끌었습니다. 주요 업무는 다음과 같습니다.",
  "c03_metric": "66일 만에 출시",
  "c03_o1": "후보 기능 36개를 우선순위 MVP 기능 15개로 축소",
  "c03_o2": "66일 만에 개선된 앱 출시",
  "c03_o3": "당초 계획보다 약 27% 빠르게 출시 완료",
  "c03_o4": "프로젝트 기록상 월간 활성 사용자 32% 증가",
  "c03_o5": "앱 비정상 종료율 4.2%에서 0.8%로 감소",
  "c03_ov1": "사용자 경험 개선, 제품 단순화, 제한된 기간 안의 모바일 앱 출시에 초점을 둔 소비자용 모빌리티 앱 재구축 프로젝트입니다.",
  "c03_ov2": "기존 기능을 모두 가져가는 대신 사용자 요구를 다시 살펴보고, 첫 출시에 담을 가치 높은 기능을 추려야 했습니다.",
  "c03_role": "제품·출시 총괄",
  "c03_title": "모빌리티 앱 재구축",
  "c04_b1": "기존 운영 흐름 정리와 병목 파악",
  "c04_b2": "사용자 요구와 역할별 시스템 요구사항 정의",
  "c04_b3": "MVP 기능과 개발 우선순위 구성",
  "c04_b4": "요구사항을 사업 가치와 개발 난이도에 맞춰 조정",
  "c04_b5": "프로젝트 일정, 이슈, 납품 위험 관리",
  "c04_ch1": "관리 부담을 줄이는 동시에 번역 프로젝트의 진행 상황과 납품 책임을 더 잘 보이게 해야 했습니다.",
  "c04_ch2": "기능을 고르고 첫 출시 범위를 정하기 전에 실제 업무 방식을 이해하는 것이 중요했습니다.",
  "c04_ci": "대표는 사용자 인터뷰와 운영 프로세스 검토로 번역 전문가의 업무 흐름을 분석했습니다. 주요 업무는 다음과 같습니다.",
  "c04_metric": "관리 시간 약 40% 감소",
  "c04_o1": "번역 관리 시스템 도입 후 번역 프로젝트 관리 시간 약 40% 감소",
  "c04_o2": "프로젝트 일정 준수율 95% 달성",
  "c04_o3": "실제 운영 흐름에 기반한 MVP 우선순위 범위 확정",
  "c04_ov1": "전문 번역 서비스의 프로젝트 조율과 운영 업무 효율을 높이기 위한 번역 관리 시스템입니다.",
  "c04_ov2": "기존에는 번역 과정 전반에서 반복적인 수작업 조율, 진행 상황 확인, 참여자 간 연락에 의존했습니다.",
  "c04_ov3": "이러한 운영 요구를 체계적인 소프트웨어 제품으로 바꾸는 데 집중했습니다.",
  "c04_role": "프로덕트 매니저",
  "c04_title": "번역 관리 SaaS·업무 디지털화",
  "c05_b1": "Google Analytics와 Firebase로 가입·기능 사용 퍼널 분석",
  "c05_b2": "우선 개선할 이탈 지점 3곳 도출",
  "c05_b3": "UI/UX 개선과 실험 우선순위 정의",
  "c05_b4": "A/B 테스트와 제품 백로그 의사결정 조율",
  "c05_b5": "약 2~3주 주기의 정기 출시 운영",
  "c05_ci": "대표는 데이터 분석, 사용자 의견, 제품 개발팀과 함께 개선 기회를 찾고 체계적인 출시 프로세스를 만들었습니다. 주요 업무는 다음과 같습니다.",
  "c05_metric": "월간 사용자 42% 증가",
  "c05_o1": "월간 활성 사용자 42% 증가",
  "c05_o2": "사용자 리텐션 28%p 향상",
  "c05_o3": "클릭률 18% 증가",
  "c05_o4": "앱 스토어 평점 3.2에서 4.6으로 상승",
  "c05_ov1": "이미 운영 중인 소비자용 모바일 플랫폼의 제품 개선 프로젝트입니다.",
  "c05_ov2": "기존 사용자 여정의 불편 지점을 찾아 개선 우선순위를 정하고, 사용자 참여, 리텐션, 서비스 품질을 높이는 것이 목표였습니다.",
  "c05_role": "제품·사업 총괄",
  "c05_title": "모바일 플랫폼 개선",
  "c06_b1": "5개 사용자 그룹 인터뷰와 현장 관찰",
  "c06_b2": "방문객 시나리오와 정보 탐색 요구사항 정의",
  "c06_b3": "사용자용 기능과 화면 요구사항 구성",
  "c06_b4": "하드웨어 공급사와 제품 요구사항 조율",
  "c06_b5": "공공 사업 제안서 작성과 발표 주도",
  "c06_ch1": "공공장소의 키오스크는 다양한 방문객이 쓸 수 있어야 했고, 동시에 조달 요건과 실제 설치 제약을 충족해야 했습니다.",
  "c06_ch2": "방문객 여정을 명확히 정의하고 서비스 관계자와 외부 공급사를 조율하는 것이 성패를 좌우했습니다.",
  "c06_ci": "대표는 제품 전략, 사용자 경험 요구사항, 공급사 조율, 사업 제안 활동을 맡았습니다. 주요 업무는 다음과 같습니다.",
  "c06_metric": "기술평가 1위로 수주",
  "c06_o1": "5개 사용자 그룹을 바탕으로 사용자 경험 요구사항 정립",
  "c06_o2": "외부 공급사와 기능·운영 요구사항 조율",
  "c06_o3": "해당 조달 절차에서 기술평가 1위 달성",
  "c06_o4": "공공 사업 수주",
  "c06_ov1": "방문객이 화면을 직접 눌러 관광 정보를 찾는 디지털 키오스크 사업입니다.",
  "c06_ov2": "공공 서비스 요건, 방문객 사용성, 소프트웨어 기능, 하드웨어 공급사 역량을 함께 맞춰야 했습니다.",
  "c06_role": "제품·프로젝트 총괄",
  "c06_title": "공공 관광 디지털 키오스크 플랫폼",
  "cap1_desc": "사용자와 업무 정책에 맞춰 웹서비스와 업무 시스템을 개발합니다.",
  "cap1_example1": "고객 포털",
  "cap1_example2": "B2B 플랫폼",
  "cap1_example3": "관리자 시스템",
  "cap1_example4": "사내 업무 도구",
  "cap1_title": "맞춤형 웹 애플리케이션",
  "cap2_desc": "기존 플랫폼을 개선하고 단계별 출시 계획에 따라 재구축합니다.",
  "cap2_example1": "플랫폼 재구축",
  "cap2_example2": "기능 고도화",
  "cap2_example3": "레거시 전환 계획",
  "cap2_title": "기존 서비스 고도화·리빌딩",
  "cap3_desc": "시스템 연결과 데이터 이전을 검증 및 인계까지 계획합니다.",
  "cap3_example1": "API 연계",
  "cap3_example2": "데이터 마이그레이션",
  "cap3_example3": "복수 시스템 연결",
  "cap3_title": "API·데이터·시스템 연계",
  "cap_heading": "개발하는 소프트웨어",
  "cap_note": "기술 스택, 수행 범위, 전문 인력 및 일정은 프로젝트별 요구사항을 검토한 후 확정합니다.",
  "case_badge": "대표가 이전 직장·계약에서 이끈 프로젝트",
  "case_challenge": "과제",
  "case_contribution": "대표 기여",
  "case_inquiry": "이 분야 프로젝트 문의하기",
  "case_outcomes": "성과",
  "case_overview": "개요",
  "cases_back": "← 홈으로",
  "cases_contact_intro": "간단한 내용을 메일로 보내 주세요. 범위를 합의하기 전에 프로젝트 적합성을 먼저 검토합니다.",
  "cases_contact_title": "비슷한 프로젝트를 문의해 주세요",
  "cases_jump": "사례 바로가기",
  "cases_lead": "디시저너리의 일하는 방식은 대표가 글로벌 학습 플랫폼, 보험 판매 시스템, 모빌리티 앱, 업무용 SaaS, 디지털 서비스 고도화 프로젝트에서 쌓은 경험을 바탕으로 합니다.",
  "contact_base": "대한민국 기반. 해외 기업 및 에이전시와 협업합니다.",
  "contact_heading": "개발할 소프트웨어를 알려주세요.",
  "contact_intro": "문의 내용을 검토하고 수행 적합성을 안내합니다.",
  "contact_linkedin": "Decisionary 링크드인",
  "delivery_title": "역할과 책임",
  "diagram_client": "발주 기업 또는 에이전시",
  "diagram_client_sub": "목표, 요구사항, 예산",
  "diagram_owner": "계약, 개발 범위, 납품 책임",
  "diagram_team": "프로젝트별 전문 인력",
  "diagram_team_sub": "기획, 개발, 디자인, QA",
  "faq1_a": "업무용 웹 애플리케이션, 기존 플랫폼 재구축, API·데이터 연계처럼 범위를 정의할 수 있는 프로젝트가 주요 대상입니다. 요청서를 먼저 검토한 뒤 수행 인력 및 개발 계획을 확정할 수 있는지 판단합니다.",
  "faq1_q": "어떤 유형의 개발 프로젝트가 적합한가요?",
  "faq2_a": "프로젝트별 수행 모델로 운영합니다. 해당 범위에 적합한 외부 개발, PM, 디자인, QA 전문가를 선정·확정하며, 이들을 상근 직원으로 표시하지 않습니다.",
  "faq2_q": "상근 개발팀을 직접 보유하고 있나요?",
  "faq3_a": "산출물, 의존성, 검수 기준과 투입 가능 인력을 검토한 후 견적을 산정합니다. 범위에 적합하다면 총액 계약 또는 마일스톤 단위 지급 구조를 제안할 수 있습니다.",
  "faq3_q": "프로젝트 견적은 어떻게 결정하나요?",
  "faq4_a": "가능합니다. 화이트라벨 또는 에이전시 주도 협업을 검토하며, 고객 관계, 기밀유지, 수행 책임과 소통 방식은 사전에 합의합니다.",
  "faq4_q": "해외 에이전시의 개발 파트너가 될 수 있나요?",
  "faq5_a": "대한민국에 기반을 두고 있어 개발 프로젝트와 현지 시장 수요가 연결되는 경우 협업을 검토할 수 있습니다. 구체적인 수행 가능성은 프로젝트별로 판단합니다.",
  "faq5_q": "한국·동아시아 관련 프로젝트도 가능한가요?",
  "faq_heading": "개발을 의뢰하기 전에",
  "footer_cases": "사례",
  "footer_description": "기업과 디지털 에이전시를 위한 맞춤형 소프트웨어 개발·납품 서비스입니다.",
  "footer_email": "이메일",
  "footer_experience": "경험",
  "footer_linkedin": "링크드인",
  "footer_location": "대한민국 서울특별시",
  "footer_note": "명확한 개발 범위와 합의한 납품.",
  "footer_privacy": "개인정보 안내",
  "footer_services": "서비스",
  "founder_bio1": "학습 플랫폼, 보험, 모빌리티, B2B SaaS, 공공 서비스 분야에서 제품 기획과 개발 실행을 이끌었습니다.",
  "founder_bio2": "복잡한 업무 요구사항을 출시 가능한 범위로 정리하고, 출시까지 여러 직군의 팀을 조율합니다.",
  "founder_linkedin": "대표 링크드인 보기",
  "founder_name": "고석수",
  "founder_role": "Decisionary 대표",
  "hero_cta": "프로젝트 상담하기",
  "hero_cta2": "서비스 살펴보기",
  "hero_head1": "맞춤형 소프트웨어.",
  "hero_head2": "납품까지 명확하게.",
  "hero_lead": "개발 범위 합의, 전문가 구성, 소프트웨어 납품을 하나의 계약 창구에서 진행합니다.",
  "ind_01": "교육",
  "ind_02": "보험",
  "ind_03": "모빌리티",
  "ind_04": "번역 서비스",
  "ind_05": "모바일 소비자 서비스",
  "ind_06": "공공·관광",
  "nav_approach": "진행 방식",
  "nav_capabilities": "제공 서비스",
  "nav_clients": "고객 유형",
  "nav_contact": "문의",
  "nav_experience": "수행 경험",
  "new_window": "(새 창)",
  "process_contract": "디시저너리가 직접 계약하고, 프로젝트마다 필요한 전문가로 팀을 꾸립니다.",
  "process_heading": "문의부터 검수와 인계까지",
  "process_note": "수행 범위, 기술 적합성, 전문 인력 가용성, 계약 조건 및 업무범위기술서(SOW)를 확인한 뒤 프로젝트를 진행합니다.",
  "skip_link": "본문으로 바로가기",
  "step1_desc": "목표, 사용자, 예산과 희망 일정 확인",
  "step1_title": "프로젝트 문의",
  "step2_desc": "요구사항, 연계 시스템과 미결정 사항 검토",
  "step2_title": "실행 가능성 검토",
  "step3_desc": "전문 인력, 마일스톤, 제외 범위와 검수 기준 합의",
  "step3_title": "범위·수행 조직 확정",
  "step4_desc": "진행 상황 공유, 변경 요청 관리와 테스트",
  "step4_title": "개발 및 단계별 검토",
  "step5_desc": "소프트웨어 검수와 합의한 자산 인계",
  "step5_title": "검수 및 인계",
  "value1_desc": "디시저너리는 프리랜서 목록을 소개하는 중개 서비스가 아니라 프로젝트 수행 계약의 상대방입니다. 책임 범위와 검수 조건을 문서로 정리합니다.",
  "value1_title": "명확한 계약 상대방",
  "value2_desc": "일정이나 견적을 확정하기 전에 목표, 연계 시스템, 제약사항과 수행 가능 인력을 검토합니다.",
  "value2_title": "견적보다 먼저 범위 확인",
  "value3_desc": "개발·기획·디자인·QA 전문 인력을 실제 요구사항에 맞춰 선정하고 확정합니다. 외부 인력을 상시 고용 조직으로 소개하지 않습니다.",
  "value3_title": "프로젝트에 맞춘 전문 인력",
  "value4_desc": "산출물, 리뷰 시점, 변경 요청, 검수 기준 및 운영 인계 책임을 착수 전에 합의합니다.",
  "value4_title": "검수와 인계를 포함한 계획",
  "value_heading": "착수 전에 합의할 사항",
  "who1_desc": "디시저너리와 개발 범위, 수행 인력, 마일스톤을 직접 합의합니다.",
  "who1_link": "직접 개발 프로젝트 문의",
  "who1_title": "기업의 직접 개발 의뢰",
  "who2_desc": "고객 관계는 에이전시가 유지합니다. 화이트라벨, 소통 역할과 계약 조건은 프로젝트별로 합의합니다.",
  "who2_link": "개발 파트너십 문의",
  "who2_title": "에이전시의 개발 협력",
  "who_heading": "직접 발주와 에이전시 협업",
  "xp_all": "사례 전체 보기",
  "xp_fact": "대표가 이전 직장·계약에서 이끈 프로젝트이며, 고객사·제품명은 비공개입니다.",
  "xp_heading": "Decisionary 대표가 이끈 프로젝트",
  "xp_records": "프로젝트 기록 기준",
  "xp_role_label": "대표 역할"
};
// Keyboard actions stay immediate; pointer release/cancellation cannot leave a pressed control.
const inputRoot=document.documentElement;
let pressedControl=null;
function releasePress(){
  if(pressedControl){pressedControl.removeAttribute('data-pressed');pressedControl=null}
}
function setInputMode(mode){if(inputRoot.dataset.input!==mode)inputRoot.dataset.input=mode}
setInputMode('keyboard');
window.addEventListener('pointermove',()=>setInputMode('pointer'),{passive:true});
window.addEventListener('pointerdown',event=>{
  setInputMode('pointer');
  releasePress();
  if(!event.isPrimary||event.button!==0)return;
  const control=event.target instanceof Element?event.target.closest('.button, .lang-switch button, .menu-toggle'):null;
  if(control&&!control.matches(':disabled,[aria-disabled="true"]')){
    pressedControl=control;
    control.setAttribute('data-pressed','');
  }
},{capture:true,passive:true});
window.addEventListener('pointerup',releasePress,{capture:true,passive:true});
window.addEventListener('pointercancel',releasePress,{capture:true,passive:true});
window.addEventListener('blur',releasePress);
window.addEventListener('contextmenu',releasePress);
document.addEventListener('visibilitychange',()=>{if(document.hidden)releasePress()});
window.addEventListener('keydown',()=>{setInputMode('keyboard');releasePress()},{capture:true});
const buttons=[...document.querySelectorAll('[data-lang]')],links=document.getElementById('nav-links'),toggle=document.getElementById('menu-toggle');
const english={};
document.querySelectorAll('[data-i18n]').forEach(el=>english[el.getAttribute('data-i18n')]=el.textContent);
const englishTitle=document.title,koTitle=document.documentElement.dataset.titleKo;
function apply(lang){
  const chosen=lang==='ko'?'ko':'en';
  document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.getAttribute('data-i18n');el.textContent=chosen==='ko'?(ko[key]??english[key]):english[key]});
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.getAttribute('data-lang')===chosen)));
  document.documentElement.lang=chosen;
  if(toggle)toggle.setAttribute('aria-label',chosen==='ko'?'메뉴 열기 또는 닫기':'Toggle navigation');
  document.title=chosen==='ko'&&koTitle?koTitle:englishTitle;
  document.querySelectorAll('[data-mail-industry]').forEach(a=>{
    const key=a.getAttribute('data-mail-industry');
    const industry=chosen==='ko'?(ko[key]??english[key]):english[key];
    const subject=`[${industry}] ${chosen==='ko'?'프로젝트 문의':'Project inquiry'} | Decisionary`;
    a.href='mailto:hello@decisionarypro.com?subject='+encodeURIComponent(subject);
  });
  try{localStorage.setItem('decisionary-lang',chosen)}catch(e){}
}
buttons.forEach(b=>b.addEventListener('click',()=>apply(b.getAttribute('data-lang'))));
function closeMenu(){if(links){links.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false')}}
if(toggle&&links){toggle.addEventListener('click',()=>{const open=links.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));window.addEventListener('keydown',e=>{if(e.key==='Escape'&&links.classList.contains('is-open')){closeMenu();toggle.focus()}})}
window.matchMedia('(min-width: 1001px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
function preferredLanguage(){
  try{const saved=localStorage.getItem('decisionary-lang');if(saved==='en'||saved==='ko')return saved}catch(e){}
  return (navigator.languages||[navigator.language]).map(lang=>String(lang).toLowerCase().split('-')[0]).find(lang=>lang==='en'||lang==='ko')||'en';
}
apply(preferredLanguage());
const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
})();
