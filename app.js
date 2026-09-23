const form = document.querySelector('#birth-form');
const dateInput = document.querySelector('#birth-date');
const timeInput = document.querySelector('#birth-time');
const unknownTime = document.querySelector('#unknown-time');
const today = new Date();
dateInput.max = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
document.querySelector('#year').textContent = today.getFullYear();
timeInput.required = true;
unknownTime.addEventListener('change', () => {
  timeInput.disabled = unknownTime.checked;
  timeInput.required = !unknownTime.checked;
});
const readings = [
  {symbol:'木', name:'목 · 자라나는 숲의 기운', keywords:'호기심 · 성장 · 따뜻함', sections:[['나만의 강점','새로운 가능성을 발견하고 조금씩 키워가는 모습을 떠올려보세요. 아직 완성되지 않은 일에서도 의미를 찾는 태도는 든든한 강점이 될 수 있어요. 요즘 더 알아가고 싶은 것은 무엇인가요?'],['관계 속의 나','함께 성장할 수 있는 관계에서 편안함을 느낄 수 있어요. 상대를 돕기 전에 지금 어떤 도움이 필요한지 물어보세요. 서로의 속도를 존중하는 대화가 관계를 더 깊게 만듭니다.'],['오늘의 작은 제안','오랫동안 궁금했던 주제에 15분만 시간을 내보세요. 큰 계획보다 작은 시작 하나가 나를 이해하는 좋은 단서가 될 수 있어요.']]},
  {symbol:'火', name:'화 · 밝게 빛나는 불의 기운', keywords:'표현 · 열정 · 영감', sections:[['나만의 강점','마음이 움직이는 순간을 알아차리고 표현하는 모습을 떠올려보세요. 좋아하는 것에 몰입하는 에너지는 일상을 생생하게 만듭니다. 최근 어떤 순간에 가장 나다웠나요?'],['관계 속의 나','솔직한 표현은 서로를 이해하는 출발점이 될 수 있어요. 내 이야기를 전한 뒤 상대가 말할 여백도 남겨보세요. 열정과 경청이 함께할 때 대화가 한층 따뜻해집니다.'],['오늘의 작은 제안','떠오른 아이디어 하나를 짧게 기록해보세요. 바로 실행하지 않아도 좋아요. 충분히 쉬는 시간 역시 열정을 오래 지키는 방법입니다.']]},
  {symbol:'土', name:'토 · 중심을 지키는 땅의 기운', keywords:'안정 · 배려 · 균형', sections:[['나만의 강점','작은 약속을 지키고 일상에 안정감을 더하는 모습을 떠올려보세요. 눈에 크게 띄지 않는 꾸준함도 충분히 값진 힘입니다. 최근 스스로 잘 지켜온 습관은 무엇인가요?'],['관계 속의 나','편안하게 기대어 쉴 수 있는 관계를 소중하게 여길 수 있어요. 누군가를 돌보는 만큼 나에게 필요한 것도 말해보세요. 배려는 서로 오갈 때 오래 지속됩니다.'],['오늘의 작은 제안','오늘 해야 할 일 중 가장 중요한 하나만 골라보세요. 나머지 일에 여유를 주는 선택도 균형을 만드는 좋은 연습입니다.']]},
  {symbol:'金', name:'금 · 선명하게 빛나는 금의 기운', keywords:'집중 · 원칙 · 단단함', sections:[['나만의 강점','복잡한 상황에서도 소중한 기준을 찾는 모습을 떠올려보세요. 무엇을 지키고 싶은지 아는 마음은 선택의 방향을 잡아줍니다. 지금 가장 중요하게 생각하는 가치는 무엇인가요?'],['관계 속의 나','명확한 약속과 솔직한 태도가 신뢰를 쌓는 데 도움이 될 수 있어요. 서로 다른 기준에도 각자의 이유가 있음을 기억해보세요. 이해가 반드시 동의를 의미하지는 않아요.'],['오늘의 작은 제안','마음에 걸리던 작은 공간이나 할 일 목록을 정리해보세요. 완벽하게 끝내기보다 오늘 가능한 만큼 마무리하는 데 의미를 두어도 좋습니다.']]},
  {symbol:'水', name:'수 · 깊이 흐르는 물의 기운', keywords:'유연함 · 사색 · 발견', sections:[['나만의 강점','천천히 관찰하며 새로운 연결을 발견하는 모습을 떠올려보세요. 한 가지 답에 머무르지 않는 유연함은 시야를 넓혀줍니다. 최근 다른 관점에서 바라본 일이 있나요?'],['관계 속의 나','말 너머의 마음을 헤아리는 시간이 관계를 풍성하게 만들 수 있어요. 다만 상대의 생각을 혼자 추측하기보다 다정하게 확인해보세요. 나의 감정도 같은 만큼 중요합니다.'],['오늘의 작은 제안','잠시 화면을 내려놓고 떠오르는 생각을 세 줄 적어보세요. 정답을 찾으려 하지 않아도 괜찮아요. 마음을 알아차리는 것만으로도 충분한 시작입니다.']]}
];
let savedText = '';
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const name = document.querySelector('#name').value.trim() || '당신';
  const seed = [...dateInput.value.replaceAll('-', '')].reduce((sum, char) => sum + Number(char), 0) + (unknownTime.checked ? 0 : Number(timeInput.value));
  const reading = readings[seed % readings.length];
  const title = `${name}님에게 건네는 작은 이야기`;
  const meta = `${dateInput.value.replaceAll('-', '.')} · 양력 · ${unknownTime.checked ? '태어난 시간 모름' : timeInput.selectedOptions[0].textContent}`;
  document.querySelector('#result-title').textContent = title;
  document.querySelector('#result-meta').textContent = meta;
  document.querySelector('#result-symbol').textContent = reading.symbol;
  document.querySelector('#result-element-name').textContent = reading.name;
  document.querySelector('#result-keywords').textContent = reading.keywords;
  const container = document.querySelector('#result-text');
  container.replaceChildren();
  for (const [heading, body] of reading.sections) {
    const section = document.createElement('section');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    h3.textContent = heading;
    p.textContent = body;
    section.append(h3, p);
    container.append(section);
  }
  savedText = `별결 — 예시 풀이 체험\n\n${title}\n${meta}\n\n${reading.name}\n${reading.keywords}\n\n${reading.sections.map(([h, p]) => `${h}\n${p}`).join('\n\n')}\n\n입력값에 따라 선택한 사전 작성 예시입니다. 실제 만세력 계산이나 AI 분석 결과가 아니며, 미래를 예측하지 않습니다.`;
  document.querySelector('#save-status').textContent = '';
  const result = document.querySelector('#result');
  result.hidden = false;
  document.querySelector('.step').textContent = '02 / 02';
  result.focus({preventScroll:true});
  result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'start'});
});
document.querySelector('#save-result').addEventListener('click', () => {
  if (!savedText) return;
  const url = URL.createObjectURL(new Blob(['\uFEFF', savedText], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = '별결-나의-예시풀이.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#save-status').textContent = '풀이를 텍스트 파일로 저장하도록 요청했어요.';
});
