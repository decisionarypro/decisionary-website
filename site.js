(function(){
'use strict';
const ko={
nav_capabilities:'제공 서비스',nav_clients:'고객 유형',nav_approach:'진행 방식',nav_experience:'수행 경험',nav_contact:'문의',
hero_kicker:'맞춤형 소프트웨어 개발·납품 · 대한민국',hero_head1:'맞춤형 소프트웨어.',hero_head2:'책임지는 개발 파트너.',hero_lead:'단순한 개발자 소개를 넘어, 소프트웨어 개발과 납품을 맡길 파트너가 필요한 기업과 디지털 에이전시를 위해 일합니다. 디시저너리는 범위를 정의하고 프로젝트에 적합한 전문가를 구성해 합의한 결과물의 납품 책임을 맡습니다.',hero_cta:'프로젝트 상담하기',hero_cta2:'서비스 살펴보기',
diagram_label:'명확한 개발 수행 구조',diagram_status:'프로젝트 단위',diagram_client:'발주 기업 또는 에이전시',diagram_client_sub:'목표 · 요구사항 · 예산',diagram_owner:'계약 · 수행 범위 · 납품 책임',diagram_tag:'단일 창구',diagram_pm:'제품·PM',diagram_eng:'개발',diagram_qa:'QA·디자인',diagram_foot:'프로젝트 요구사항을 검토한 뒤 실제 투입 가능한 전문가를 확정합니다.',
hero_point1:'단일 계약·대외 책임 창구',hero_point2:'명확한 일정·검수 기준',hero_point3:'프로젝트에 맞는 수행 조직',
audience_label:'실제 비즈니스에 필요한 소프트웨어',audience_1:'기업용 업무 애플리케이션',audience_2:'기존 서비스 재구축',audience_3:'에이전시 개발 납품',
cap_kicker:'01 / 제공 서비스',cap_title1:'비즈니스에 필요한',cap_title2:'소프트웨어를 개발합니다.',cap_intro:'단순 홍보용 홈페이지나 일회성 자동화 상품보다는 실제 사업 운영, 성장, 서비스 고도화에 필요한 소프트웨어를 중심으로 수행합니다.',
cap1_title:'맞춤형 웹 애플리케이션',cap1_desc:'사용자, 업무 흐름과 운영 정책에 맞춰 기업용 웹서비스와 업무 시스템을 개발합니다.',cap1_examples:'고객 포털 · B2B 플랫폼 · 관리자 시스템 · 사내 업무 도구',
cap2_title:'기존 서비스 고도화·리빌딩',cap2_desc:'기존 제품을 개선하거나 복잡해진 기능을 재정비하고, 단계별 출시 계획을 기반으로 재구축을 진행합니다.',cap2_examples:'플랫폼 재구축 · 기능 고도화 · 레거시 전환 계획',
cap3_title:'API·데이터·시스템 연계',cap3_desc:'시스템 간 연결과 데이터 이전을 계획하고, 의존성 관리부터 검증과 인계까지 수행 범위에 반영합니다.',cap3_examples:'API 연계 · 데이터 마이그레이션 · 복수 시스템 연결',
cap_note:'기술 스택, 수행 범위, 전문 인력 및 일정은 프로젝트별 요구사항을 검토한 후 확정합니다.',
who_kicker:'02 / 협업 대상',who_title1:'두 가지 협업 방식.',who_title2:'하나의 책임 파트너.',who_intro:'디시저너리와 직접 소프트웨어 개발 계약을 맺거나, 디지털 에이전시의 고객 프로젝트를 지원하는 수행 파트너로 협업할 수 있습니다.',
who1_label:'기업 및 제품 조직',who1_title:'하나의 수행 파트너에게 개발을 맡기세요.',who1_desc:'새로운 B2B 애플리케이션이 필요하거나 기존 시스템을 재구축해야 하나요? 개발 범위, 전문 수행 조직, 마일스톤을 합의하고 명확한 계약 구조 아래 진행합니다.',who1_link:'직접 개발 프로젝트 문의 ↗',
who2_label:'디지털 에이전시·컨설팅사',who2_title:'조직 확장 없이 개발 수행 역량을 확보하세요.',who2_desc:'고객 관계는 에이전시가 유지하면서 디시저너리와 범위가 정해진 개발 협력을 검토할 수 있습니다. 화이트라벨, 소통 역할 및 계약 조건은 프로젝트별로 협의합니다.',who2_link:'개발 파트너십 상담 ↗',
value_kicker:'03 / 왜 디시저너리인가',value_title1:'프로젝트를',value_title2:'명확하게 추진하는 방식.',value_intro:'좋은 개발 파트너는 의사결정과 책임을 단순하게 만들어야 합니다. 디시저너리의 운영 모델은 소프트웨어 납품을 좌우하는 핵심 합의에 초점을 맞춥니다.',
value1_title:'명확한 계약 상대방',value1_desc:'디시저너리는 프리랜서 목록을 소개하는 중개 서비스가 아니라 프로젝트 수행 계약의 상대방입니다. 책임 범위와 검수 조건을 문서로 정리합니다.',
value2_title:'견적보다 먼저 범위 확인',value2_desc:'일정이나 견적을 확정하기 전에 목표, 연계 시스템, 제약사항과 수행 가능 인력을 검토합니다.',
value3_title:'프로젝트에 맞춘 전문 인력',value3_desc:'개발·기획·디자인·QA 전문 인력을 실제 요구사항에 맞춰 선정하고 확정합니다. 외부 인력을 상시 고용 조직으로 소개하지 않습니다.',
value4_title:'검수와 인계를 포함한 계획',value4_desc:'산출물, 리뷰 시점, 변경 요청, 검수 기준 및 운영 인계 책임을 착수 전에 합의합니다.',
process_kicker:'04 / 수행 방식',process_title1:'첫 프로젝트 문의부터',process_title2:'최종 납품까지.',process_intro:'범위, 수행 역량, 개발 진행과 검수 기준을 관계자 모두가 확인할 수 있는 단계별 프로세스입니다.',
step1_title:'프로젝트 문의',step1_desc:'목표, 사용자, 현재 제품, 예산 범위와 희망 일정을 확인합니다.',
step2_title:'실행 가능성 검토',step2_desc:'요구사항, 연계 시스템, 수행 방법과 미결정 사항을 검토합니다.',
step3_title:'범위·수행 조직 확정',step3_desc:'전문 인력, 일정, 제외 범위, 계약 금액과 검수 조건을 합의합니다.',
step4_title:'개발 및 단계별 검토',step4_desc:'진행 상황, 변경사항, 테스트와 품질 점검을 관리합니다.',
step5_title:'검수 및 인계',step5_desc:'합의한 결과물을 검수하고 필요한 자산을 인계하며 프로젝트를 마무리합니다.',
process_note:'수행 범위, 기술 적합성, 전문 인력 가용성, 계약 조건 및 업무범위기술서(SOW)를 확인한 뒤 프로젝트를 진행합니다.',
xp_kicker:'05 / 대표자 수행 경험',xp_title1:'복잡한 프로젝트를',xp_title2:'다뤄 온 경험.',xp_intro:'디시저너리는 대표자가 수행해 온 복수 이해관계자 플랫폼, 서비스 재구축, 운영 전환 및 시스템 연계 경험을 사업 기반으로 삼고 있습니다.',
xp_disclosure:'아래 사례는 대표자가 과거 고용 및 개별 계약에서 참여·수행한 경험입니다. 디시저너리가 독립적으로 직접 수주·납품한 회사 실적으로 표시하지 않습니다. 고객명과 자료는 공개 권한 확인 전까지 제외합니다.',
xp1_title:'글로벌 학습 플랫폼 전환',xp1_desc:'약 100개국 사용자를 대상으로 하는 학습 플랫폼에서 운영 정책, 조직 간 의존성, 단계별 데이터 이관과 출시 준비를 조율했습니다.',xp1_tag:'플랫폼 고도화 · 마이그레이션 조율',
xp2_title:'모바일 서비스 리빌딩',xp2_desc:'사용자 조사 23회를 바탕으로 36개 후보 기능에서 MVP 15개를 정리하고, 11명 규모의 다직군 협업 및 주요 의사결정을 조율했습니다.',xp2_tag:'서비스 리빌딩 · MVP 범위 설정',
xp3_title:'번역 업무 관리 시스템',xp3_desc:'업무 담당자 인터뷰로 병목을 분석하고 번역 관리 시스템의 MVP 요구사항과 개발 우선순위를 정리했습니다.',xp3_tag:'기업용 소프트웨어 · 업무 흐름 설계',
xp4_title:'복수 사업자 보험 서비스 플랫폼',xp4_desc:'B2B2C 보험 플랫폼에서 가입 흐름, 관리자 기능, 제휴 채널, 결제 업무 및 연계 요구사항을 조율했습니다.',xp4_tag:'디지털 플랫폼 · 제휴·연계 요구사항',
xp_foot:'세부 수행 내용 및 증빙 자료는 기밀유지와 공개 권한 범위 내에서 개별적으로 안내합니다.',
faq_kicker:'06 / 자주 묻는 질문',faq_title1:'프로젝트를',faq_title2:'시작하기 전에.',
faq1_q:'어떤 유형의 개발 프로젝트가 적합한가요?',faq1_a:'업무용 웹 애플리케이션, 기존 플랫폼 재구축, API·데이터 연계처럼 범위를 정의할 수 있는 프로젝트가 주요 대상입니다. 요청서를 먼저 검토한 뒤 수행 인력 및 개발 계획을 확정할 수 있는지 판단합니다.',
faq2_q:'상근 개발팀을 직접 보유하고 있나요?',faq2_a:'프로젝트별 수행 모델로 운영합니다. 해당 범위에 적합한 외부 개발, PM, 디자인, QA 전문가를 선정·확정하며, 이들을 상근 직원으로 표시하지 않습니다.',
faq3_q:'프로젝트 견적은 어떻게 결정하나요?',faq3_a:'산출물, 의존성, 검수 기준과 투입 가능 인력을 검토한 후 견적을 산정합니다. 범위에 적합하다면 총액 계약 또는 마일스톤 단위 지급 구조를 제안할 수 있습니다.',
faq4_q:'해외 에이전시의 개발 파트너가 될 수 있나요?',faq4_a:'가능합니다. 화이트라벨 또는 에이전시 주도 협업을 검토하며, 고객 관계, 기밀유지, 수행 책임과 소통 방식은 사전에 합의합니다.',
faq5_q:'한국·동아시아 관련 프로젝트도 가능한가요?',faq5_a:'대한민국에 기반을 두고 있어 개발 프로젝트와 현지 시장 수요가 연결되는 경우 협업을 검토할 수 있습니다. 구체적인 수행 가능성은 프로젝트별로 판단합니다.',
contact_kicker:'07 / 프로젝트 문의',contact_title1:'개발이 필요한',contact_title2:'프로젝트가 있나요?',contact_intro:'구축 또는 개선하려는 서비스를 알려주세요. 수행 적합성을 검토하고 구체적인 다음 단계를 안내하겠습니다.',contact_base:'대한민국 기반 · 해외 기업 및 에이전시 협업',
brief_title:'처음 문의하실 때 알려주세요',brief_intro:'간단한 이메일이면 충분합니다. 다음 정보가 있으면 검토에 도움이 됩니다.',brief1:'개발하거나 개선하려는 제품',brief2:'현재 서비스, 사용자 및 관련 시스템',brief3:'예상 예산 범위와 출시 희망 시점',brief4:'직접 발주 고객인지, 에이전시 협업인지',brief_cta:'프로젝트 문의하기',
footer_description:'대한민국에 등록된 소프트웨어 개발 및 납품 서비스 사업자입니다. 정식 계약 시 필요한 사업자 정보와 법적 사항을 안내합니다.',footer_services:'서비스',footer_experience:'경험',footer_privacy:'개인정보 안내',footer_email:'이메일',footer_note:'명확한 개발 범위 · 책임 있는 납품 · 장기적인 협업'
};
const buttons=[...document.querySelectorAll('[data-lang]')],links=document.getElementById('nav-links'),toggle=document.getElementById('menu-toggle');
const english={};
document.querySelectorAll('[data-i18n]').forEach(el=>english[el.getAttribute('data-i18n')]=el.textContent);
function apply(lang){
  const chosen=lang==='ko'?'ko':'en';
  document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.getAttribute('data-i18n');el.textContent=chosen==='ko'?(ko[key]??english[key]):english[key]});
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.getAttribute('data-lang')===chosen)));
  document.documentElement.lang=chosen;
  document.title=chosen==='ko'?'Decisionary | 맞춤형 소프트웨어 개발·납품':'Decisionary | Custom Software Development & Delivery';
  try{localStorage.setItem('decisionary-lang',chosen)}catch(e){}
}
buttons.forEach(b=>b.addEventListener('click',()=>apply(b.getAttribute('data-lang'))));
function closeMenu(){if(links){links.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false')}}
if(toggle&&links){toggle.addEventListener('click',()=>{const open=links.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));window.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()})}
try{apply(localStorage.getItem('decisionary-lang')||'en')}catch(e){apply('en')}
const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
})();
