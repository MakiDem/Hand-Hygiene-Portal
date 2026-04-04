/* ============================================================
   HAND HYGIENE PORTAL — quiz.js
   10-question interactive quiz covering Modules 1–3
   ============================================================ */

const questions = [
  {
    module: 'Module 1',
    text: 'What is the single most important practice in preventing healthcare-associated infections (HAIs)?',
    options: [
      'Wearing sterile gloves at all times',
      'Proper hand hygiene',
      'Using antiseptic body wash daily',
      'Isolating all patients on admission'
    ],
    correct: 1,
    hint: 'Think about what healthcare workers do dozens of times per shift that directly interrupts pathogen transmission.',
    explanation: 'Hand hygiene is universally recognised as the single most important measure for preventing HAIs — more impactful than any other individual infection control intervention.'
  },
  {
    module: 'Module 1',
    text: 'Which type of skin flora is most commonly associated with cross-transmission of pathogens between patients?',
    options: [
      'Resident flora',
      'Commensal flora',
      'Transient flora',
      'Pathogenic flora'
    ],
    correct: 2,
    hint: 'Consider which type of flora is "recently acquired" from the environment rather than permanently colonising the skin.',
    explanation: 'Transient flora are recently acquired microorganisms from patient contact or environmental surfaces. They colonise the outer skin layers and are easily removed by hand hygiene — making them the primary target.'
  },
  {
    module: 'Module 1',
    text: 'According to the WHO, which method is preferred for routine hand hygiene when hands are NOT visibly soiled?',
    options: [
      'Soap and warm water for 60 seconds',
      'Antiseptic wipes',
      'Alcohol-based hand rub (ABHR)',
      'Plain water rinse'
    ],
    correct: 2,
    hint: 'The WHO prefers the faster, more skin-friendly option that doesn\'t require a sink.',
    explanation: 'ABHR is the WHO\'s preferred method for routine hand hygiene when hands are not visibly soiled. It is faster, more effective against most pathogens, and gentler on the skin than soap and water.'
  },
  {
    module: 'Module 2',
    text: 'How many "Moments" for hand hygiene does the WHO framework define?',
    options: [
      'Three',
      'Four',
      'Five',
      'Six'
    ],
    correct: 2,
    hint: 'The framework name includes a number.',
    explanation: 'The WHO "My 5 Moments for Hand Hygiene" framework defines exactly five critical points during patient care at which hand hygiene must be performed.'
  },
  {
    module: 'Module 2',
    text: 'A nurse adjusts the IV pole in a patient\'s room without touching the patient, then leaves. Which moment applies?',
    options: [
      'Moment 1 — Before touching a patient',
      'Moment 4 — After touching a patient',
      'Moment 5 — After touching patient surroundings',
      'No moment applies — patient was not touched'
    ],
    correct: 2,
    hint: 'The patient zone includes more than just the patient\'s body.',
    explanation: 'Moment 5 applies whenever a healthcare worker touches objects or furniture within the patient zone — even if the patient themselves was not physically touched. The IV pole is within the patient zone.'
  },
  {
    module: 'Module 2',
    text: 'A nurse cleans their hands before approaching a patient (Moment 1), then adjusts the call bell before performing an IV insertion. What should happen?',
    options: [
      'Nothing — hands were already cleaned at Moment 1',
      'Gloves must be worn instead',
      'Hand hygiene must be performed again at Moment 2',
      'The nurse should report the situation to the charge nurse'
    ],
    correct: 2,
    hint: 'Any contact within the patient zone between Moment 1 and a procedure resets the requirement.',
    explanation: 'Touching the call bell (patient environment) between Moment 1 and the procedure creates a new contamination risk. Hand hygiene must be repeated immediately before the aseptic procedure — this is Moment 2.'
  },
  {
    module: 'Module 2',
    text: 'Which of the following situations does NOT require Moment 3 hand hygiene?',
    options: [
      'After removing gloves following wound care',
      'After contact with a patient\'s saliva',
      'After handing a patient their water cup',
      'After handling a contaminated dressing'
    ],
    correct: 2,
    hint: 'Moment 3 is specifically for body fluid exposure risk.',
    explanation: 'Handing a patient a water cup carries no body fluid exposure risk, so it does not trigger Moment 3. It would, however, trigger Moment 4 (after touching a patient) if the nurse made physical contact with the patient.'
  },
  {
    module: 'Module 3',
    text: 'ABHR is NOT effective against which of the following pathogens?',
    options: [
      'MRSA (Methicillin-resistant Staphylococcus aureus)',
      'Influenza A virus',
      'Clostridioides difficile (C. diff) spores',
      'SARS-CoV-2'
    ],
    correct: 2,
    hint: 'Think about which organism produces a hard, resistant coat that alcohol cannot penetrate.',
    explanation: 'C. difficile produces spores with a thick, resistant coat that alcohol cannot penetrate. Soap and water (which mechanically washes spores off the skin) is mandatory in C. diff situations. ABHR is effective against MRSA, influenza, and SARS-CoV-2.'
  },
  {
    module: 'Module 3',
    text: 'Which step is most frequently missed during the WHO ABHR 6-step technique?',
    options: [
      'Rubbing palms together',
      'Rotational rubbing of thumbs and fingertips',
      'Covering the back of the hands',
      'Interlacing fingers'
    ],
    correct: 1,
    hint: 'Think about the extremities of the hand that are most anatomically awkward to reach.',
    explanation: 'Thumbs and fingertips are the most commonly missed areas during ABHR application. Both require specific rotational rubbing steps (Steps 6 and 7 in the WHO technique) that are often skipped or done inadequately.'
  },
  {
    module: 'Module 3',
    text: 'When should a healthcare worker use soap and water INSTEAD of ABHR?',
    options: [
      'Before performing a blood pressure check',
      'When hands are visibly soiled or after caring for a C. diff patient',
      'After documenting on a computer in the patient room',
      'Before administering oral medication'
    ],
    correct: 1,
    hint: 'There are two main mandatory situations where ABHR is not acceptable.',
    explanation: 'Soap and water is required when hands are visibly soiled (e.g., blood, body fluids), after caring for patients with C. difficile or norovirus, and after using the toilet. ABHR is insufficient in these situations.'
  }
];

/* ── STATE ── */
let currentQ  = 0;
let score     = 0;
let answered  = false;
let wrongCount = 0;

/* ── INIT ── */
function initQuiz() {
  currentQ   = 0;
  score      = 0;
  wrongCount = 0;
  answered   = false;

  document.getElementById('questionCard').style.display = 'block';
  document.getElementById('resultScreen').classList.remove('show');

  buildSteps();
  renderQuestion();
}

/* ── BUILD STEP INDICATORS ── */
function buildSteps() {
  const stepsEl = document.getElementById('quizSteps');
  stepsEl.innerHTML = '';
  questions.forEach((_, i) => {
    const div = document.createElement('div');
    div.className = 'q-step' + (i === 0 ? ' current' : '');
    div.id = 'step-' + i;
    stepsEl.appendChild(div);
  });
}

function updateSteps() {
  questions.forEach((_, i) => {
    const s = document.getElementById('step-' + i);
    if (i < currentQ)        { s.className = 'q-step done'; }
    else if (i === currentQ) { s.className = 'q-step current'; }
    else                     { s.className = 'q-step'; }
  });
}

/* ── RENDER QUESTION ── */
function renderQuestion() {
  answered = false;

  const q = questions[currentQ];
  const letters = ['A', 'B', 'C', 'D'];

  document.getElementById('qTag').textContent       = q.module + ' · Question ' + (currentQ + 1);
  document.getElementById('qText').textContent      = q.text;
  document.getElementById('quizCounter').textContent = (currentQ + 1) + ' / ' + questions.length;
  document.getElementById('feedbackBox').className  = 'feedback-box';
  document.getElementById('feedbackBox').textContent = '';
  document.getElementById('hintText').className     = 'hint-text';
  document.getElementById('hintText').textContent   = '';
  document.getElementById('nextBtn').style.display  = 'none';
  document.getElementById('hintBtn').style.display  = 'inline';

  updateSteps();

  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';

  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    div.dataset.index = i;
    div.innerHTML = `<span class="option-letter">${letters[i]}</span>${opt}`;
    div.addEventListener('click', () => selectAnswer(i));
    container.appendChild(div);
  });

  // Animate card in
  const card = document.getElementById('questionCard');
  card.style.animation = 'none';
  card.offsetHeight; // reflow
  card.style.animation = 'riseUp 0.4s ease both';
}

/* ── SELECT ANSWER ── */
function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const q       = questions[currentQ];
  const options = document.querySelectorAll('.option');
  const feedback = document.getElementById('feedbackBox');

  options.forEach(o => o.classList.add('disabled'));

  if (index === q.correct) {
    options[index].classList.add('correct');
    score++;
    feedback.className = 'feedback-box right show';
    feedback.innerHTML = '✅ <strong>Correct!</strong> ' + q.explanation;
  } else {
    options[index].classList.add('wrong');
    options[q.correct].classList.add('correct');
    wrongCount++;
    feedback.className = 'feedback-box wrong show';
    feedback.innerHTML = '❌ <strong>Incorrect.</strong> ' + q.explanation;
  }

  document.getElementById('hintBtn').style.display = 'none';

  const nextBtn = document.getElementById('nextBtn');
  nextBtn.style.display = 'inline-flex';
  nextBtn.textContent = currentQ < questions.length - 1 ? 'Next Question →' : 'See Results →';
}

/* ── NEXT QUESTION ── */
function nextQuestion() {
  currentQ++;
  if (currentQ < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

/* ── SHOW HINT ── */
function showHint() {
  const hintEl = document.getElementById('hintText');
  hintEl.textContent = '💡 ' + questions[currentQ].hint;
  hintEl.classList.add('show');
  document.getElementById('hintBtn').style.display = 'none';
}

/* ── RESULTS ── */
function showResults() {
  document.getElementById('questionCard').style.display = 'none';

  const pct       = Math.round((score / questions.length) * 100);
  const resultEl  = document.getElementById('resultScreen');
  const ring      = document.getElementById('scoreRing');

  
  ring.style.setProperty('--pct', pct + '%');

  document.getElementById('scoreNum').textContent  = score + '/' + questions.length;
  document.getElementById('bdCorrect').textContent = score;
  document.getElementById('bdWrong').textContent   = wrongCount;
  document.getElementById('bdPct').textContent     = pct + '%';

  // Dynamic message
  let title, msg;
  if (pct === 100) {
    title = 'Perfect Score! 🎉';
    msg   = 'Outstanding! You have mastered all three modules. You are ready to apply these principles in clinical practice.';
  } else if (pct >= 80) {
    title = 'Great Work! 👏';
    msg   = 'Excellent result! Review any questions you missed and revisit the relevant module sections to reinforce your knowledge.';
  } else if (pct >= 60) {
    title = 'Good Effort 👍';
    msg   = 'You have a solid foundation. We recommend reviewing Modules 1–3 before retaking the quiz to improve your score.';
  } else {
    title = 'Keep Studying 📖';
    msg   = 'Don\'t be discouraged — revisit all three modules carefully and try again. Hand hygiene knowledge takes practice!';
  }

  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultMsg').textContent   = msg;

  resultEl.classList.add('show');

  // Mark all steps done
  questions.forEach((_, i) => {
    document.getElementById('step-' + i).className = 'q-step done';
  });
  document.getElementById('quizCounter').textContent = questions.length + ' / ' + questions.length;
}

/* ── RESTART ── */
function restartQuiz() {
  initQuiz();
}

/* ── START ── */
initQuiz();
