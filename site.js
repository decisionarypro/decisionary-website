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
  "case_more": "담당 역할과 프로젝트 배경",
  "contact_base": "대한민국 기반. 해외 기업 및 에이전시와 협업합니다.",
  "contact_heading": "개발할 소프트웨어를 알려주세요.",
  "contact_intro": "문의 내용을 검토하고 수행 적합성을 안내합니다.",
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
  "footer_description": "대한민국에 등록된 소프트웨어 개발 및 납품 서비스 사업자입니다. 정식 계약 시 필요한 사업자 정보와 법적 사항을 안내합니다.",
  "footer_email": "이메일",
  "footer_experience": "경험",
  "footer_note": "명확한 개발 범위와 합의한 납품.",
  "footer_privacy": "개인정보 안내",
  "footer_services": "서비스",
  "hero_cta": "프로젝트 상담하기",
  "hero_cta2": "서비스 살펴보기",
  "hero_head1": "맞춤형 소프트웨어.",
  "hero_head2": "납품까지 명확하게.",
  "hero_lead": "개발 범위 합의, 전문가 구성, 소프트웨어 납품을 하나의 계약 창구에서 진행합니다.",
  "nav_approach": "진행 방식",
  "nav_capabilities": "제공 서비스",
  "nav_clients": "고객 유형",
  "nav_contact": "문의",
  "nav_experience": "수행 경험",
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
  "xp1_desc": "약 100개국 사용자를 대상으로 하는 학습 플랫폼에서 운영 정책, 조직 간 의존성, 단계별 데이터 이관과 출시 준비를 조율했습니다.",
  "xp1_period": "2025~2026",
  "xp1_scope": "플랫폼 전환과 단계별 마이그레이션",
  "xp1_tag": "플랫폼 고도화, 마이그레이션 조율",
  "xp1_title": "글로벌 학습 플랫폼 전환",
  "xp2_desc": "사용자 조사 23회를 바탕으로 36개 후보 기능에서 MVP 15개를 정리하고, 11명 규모의 다직군 협업 및 주요 의사결정을 조율했습니다.",
  "xp2_scope": "사용자 조사, MVP 정의와 협업 조율",
  "xp2_tag": "서비스 리빌딩, MVP 범위 설정",
  "xp2_title": "모바일 서비스 리빌딩",
  "xp3_desc": "업무 담당자 인터뷰로 병목을 분석하고 번역 관리 시스템의 MVP 요구사항과 개발 우선순위를 정리했습니다.",
  "xp3_scope": "업무 인터뷰와 개발 우선순위 정리",
  "xp3_tag": "기업용 소프트웨어, 업무 흐름 설계",
  "xp3_title": "번역 업무 관리 시스템",
  "xp4_desc": "B2B2C 보험 플랫폼에서 가입 흐름, 관리자 기능, 제휴 채널, 결제 업무 및 연계 요구사항을 조율했습니다.",
  "xp4_period": "2018~2019",
  "xp4_scope": "제휴 채널, 결제와 시스템 연계",
  "xp4_tag": "디지털 플랫폼, 제휴·연계 요구사항",
  "xp4_title": "복수 사업자 보험 서비스 플랫폼",
  "xp_disclosure": "아래 사례는 대표자가 과거 고용 및 개별 계약에서 참여·수행한 경험입니다. 디시저너리가 독립적으로 직접 수주·납품한 회사 실적으로 표시하지 않습니다. 고객명과 자료는 공개 권한 확인 전까지 제외합니다.",
  "xp_foot": "세부 수행 내용 및 증빙 자료는 기밀유지와 공개 권한 범위 내에서 개별적으로 안내합니다.",
  "xp_heading": "대표자의 이전 프로젝트 수행 경험"
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
function apply(lang){
  const chosen=lang==='ko'?'ko':'en';
  document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.getAttribute('data-i18n');el.textContent=chosen==='ko'?(ko[key]??english[key]):english[key]});
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.getAttribute('data-lang')===chosen)));
  document.documentElement.lang=chosen;
  if(toggle)toggle.setAttribute('aria-label',chosen==='ko'?'메뉴 열기 또는 닫기':'Toggle navigation');
  document.title=chosen==='ko'?'Decisionary | 맞춤형 소프트웨어 개발·납품':'Decisionary | Custom Software Development & Delivery';
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
