const slideTitles = [
  'Overview',
  'Why state management',
  'Redux Store',
  'Actions',
  'Reducers',
  'Dispatch',
  'useSelector',
  'Redux data flow',
  'Client vs Server',
  'Request and Response',
  'HTTP methods',
  'Async API flow',
  'Loading, Success and Error states',
  'createAsyncThunk concept',
  'Real-world examples',
  'Interactive quiz'
];

const slides = Array.from(document.querySelectorAll('.slide'));
const sectionNav = document.getElementById('sectionNav');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const progressLabel = document.getElementById('progressLabel');
const themeToggle = document.getElementById('themeToggle');

let activeSlideIndex = 0;

function renderSlideNav() {
  sectionNav.innerHTML = '';

  slideTitles.forEach((title, index) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = `nav-chip ${index === activeSlideIndex ? 'active' : ''}`;
    chip.textContent = title;
    chip.setAttribute('aria-label', `Go to ${title} slide`);
    chip.addEventListener('click', () => showSlide(index));
    sectionNav.appendChild(chip);
  });
}

function updateProgress() {
  const total = slides.length;
  const percent = ((activeSlideIndex + 1) / total) * 100;
  progressFill.style.width = `${percent}%`;
  progressLabel.textContent = `${activeSlideIndex + 1} / ${total}`;
}

function showSlide(index) {
  if (index < 0) {
    activeSlideIndex = 0;
  } else if (index >= slides.length) {
    activeSlideIndex = slides.length - 1;
  } else {
    activeSlideIndex = index;
  }

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === activeSlideIndex);
  });

  renderSlideNav();
  updateProgress();

  prevBtn.disabled = activeSlideIndex === 0;
  prevBtn.style.opacity = activeSlideIndex === 0 ? '0.5' : '1';
  nextBtn.textContent = activeSlideIndex === slides.length - 1 ? 'Finish' : 'Next';
}

prevBtn.addEventListener('click', () => showSlide(activeSlideIndex - 1));
nextBtn.addEventListener('click', () => {
  if (activeSlideIndex === slides.length - 1) {
    showSlide(0);
    return;
  }

  showSlide(activeSlideIndex + 1);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'PageDown') {
    event.preventDefault();
    showSlide(activeSlideIndex + 1);
  }

  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault();
    showSlide(activeSlideIndex - 1);
  }
});

const savedTheme = localStorage.getItem('redux-theme');
if (savedTheme === 'dark') {
  document.body.setAttribute('data-theme', 'dark');
  themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
  const isDark = themeToggle.checked;
  document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  localStorage.setItem('redux-theme', isDark ? 'dark' : 'light');
});

const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'COUNTER_INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'COUNTER_DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'COUNTER_RESET':
      return { ...state, count: 0 };
    default:
      return state;
  }
};

let counterState = { count: 0 };
const counterValue = document.getElementById('counterValue');
const counterOutput = document.getElementById('counterOutput');
const counterStateBadge = document.getElementById('counterStateBadge');

function renderCounter() {
  counterValue.textContent = String(counterState.count);
  counterOutput.textContent = JSON.stringify(counterState, null, 2);
  counterStateBadge.textContent = `State: ${counterState.count >= 0 ? 'stable' : 'negative'}`;
}

function dispatchCounter(action) {
  counterState = counterReducer(counterState, action);
  renderCounter();
}

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const actionName = button.dataset.action;

    if (actionName === 'increment') {
      dispatchCounter({ type: 'COUNTER_INCREMENT' });
    }

    if (actionName === 'decrement') {
      dispatchCounter({ type: 'COUNTER_DECREMENT' });
    }

    if (actionName === 'reset') {
      dispatchCounter({ type: 'COUNTER_RESET' });
    }
  });
});

const requestMethod = document.getElementById('requestMethod');
const requestEndpoint = document.getElementById('requestEndpoint');
const requestPreview = document.getElementById('requestPreview');
const responsePreview = document.getElementById('responsePreview');
const sendRequestBtn = document.getElementById('sendRequestBtn');

const mockResponses = {
  GET: {
    '/api/users': {
      status: 200,
      message: 'OK',
      data: [
        { id: 1, name: 'Ava', role: 'Designer' },
        { id: 2, name: 'Leo', role: 'Developer' },
        { id: 3, name: 'Mia', role: 'Product Manager' }
      ]
    },
    '/api/users/42': {
      status: 200,
      message: 'OK',
      data: { id: 42, name: 'Noah', role: 'Frontend Engineer' }
    },
    '/api/products': {
      status: 200,
      message: 'OK',
      data: [
        { id: 'p1', name: 'Keyboard', price: 49 },
        { id: 'p2', name: 'Monitor', price: 299 }
      ]
    }
  },
  POST: {
    '/api/users': {
      status: 201,
      message: 'Created',
      data: { id: 99, name: 'New User', created: true }
    },
    '/api/users/42': {
      status: 201,
      message: 'Created',
      data: { id: 42, updated: true }
    },
    '/api/products': {
      status: 201,
      message: 'Created',
      data: { id: 'p3', name: 'Webcam', created: true }
    }
  },
  PUT: {
    '/api/users': {
      status: 200,
      message: 'Updated',
      data: { id: 1, name: 'Ava Updated', edited: true }
    },
    '/api/users/42': {
      status: 200,
      message: 'Updated',
      data: { id: 42, name: 'Noah Updated', edited: true }
    },
    '/api/products': {
      status: 200,
      message: 'Updated',
      data: { id: 'p1', name: 'Keyboard Pro', edited: true }
    }
  },
  DELETE: {
    '/api/users': {
      status: 200,
      message: 'Deleted',
      data: { deleted: true, count: 1 }
    },
    '/api/users/42': {
      status: 200,
      message: 'Deleted',
      data: { deleted: true, id: 42 }
    },
    '/api/products': {
      status: 200,
      message: 'Deleted',
      data: { deleted: true, id: 'p2' }
    }
  }
};

function updateRequestPreview() {
  const method = requestMethod.value;
  const endpoint = requestEndpoint.value;
  requestPreview.textContent = `${method} ${endpoint}`;
}

function simulateRequest() {
  const method = requestMethod.value;
  const endpoint = requestEndpoint.value;
  const payload = mockResponses[method]?.[endpoint] ?? {
    status: 500,
    message: 'Unexpected route',
    data: null
  };

  requestPreview.textContent = `${method} ${endpoint}`;
  responsePreview.textContent = JSON.stringify(payload, null, 2);
}

requestMethod.addEventListener('change', updateRequestPreview);
requestEndpoint.addEventListener('change', updateRequestPreview);
sendRequestBtn.addEventListener('click', simulateRequest);
updateRequestPreview();

const asyncStatus = document.getElementById('asyncStatus');
const asyncPayload = document.getElementById('asyncPayload');

function setAsyncState(label, message) {
  asyncStatus.textContent = label;
  asyncPayload.textContent = message;
}

document.querySelectorAll('[data-async]').forEach((button) => {
  button.addEventListener('click', () => {
    const mode = button.dataset.async;

    if (mode === 'load') {
      setAsyncState('Loading', 'Fetching users from the API...');

      setTimeout(() => {
        setAsyncState(
          'Success',
          JSON.stringify(
            {
              status: 200,
              users: [
                { id: 1, name: 'Ava' },
                { id: 2, name: 'Noah' },
                { id: 3, name: 'Zoe' }
              ]
            },
            null,
            2
          )
        );
      }, 900);
    }

    if (mode === 'error') {
      setAsyncState('Loading', 'Request in progress...');

      setTimeout(() => {
        setAsyncState(
          'Error',
          JSON.stringify(
            {
              status: 500,
              message: 'Something went wrong while fetching the data.'
            },
            null,
            2
          )
        );
      }, 900);
    }
  });
});

const quizQuestions = [
  {
    question: 'What is the main purpose of Redux?',
    options: [
      'To build CSS layouts',
      'To manage app state predictably',
      'To replace HTML',
      'To handle browser storage only'
    ],
    correct: 1
  },
  {
    question: 'Which concept describes a plain JavaScript object that tells the reducer what happened?',
    options: ['Action', 'Template', 'Component', 'Event'],
    correct: 0
  },
  {
    question: 'What does a reducer do?',
    options: [
      'Sends network requests',
      'Updates state based on an action',
      'Renders the page',
      'Creates a server'
    ],
    correct: 1
  },
  {
    question: 'Which HTTP method is typically used to fetch data?',
    options: ['POST', 'PUT', 'GET', 'DELETE'],
    correct: 2
  },
  {
    question: 'What state usually appears while an async request is still in progress?',
    options: ['Idle', 'Loading', 'Finished', 'Hidden'],
    correct: 1
  }
];

const quizNumber = document.getElementById('quizNumber');
const quizTotal = document.getElementById('quizTotal');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const nextQuizBtn = document.getElementById('nextQuizBtn');
const quizScore = document.getElementById('quizScore');

let currentQuizIndex = 0;
let quizCorrectCount = 0;
let answeredCurrentQuestion = false;

function renderQuestion() {
  const question = quizQuestions[currentQuizIndex];

  quizNumber.textContent = String(currentQuizIndex + 1);
  quizTotal.textContent = String(quizQuestions.length);
  quizQuestion.textContent = question.question;
  quizScore.textContent = String(quizCorrectCount);
  quizFeedback.textContent = '';
  quizFeedback.className = 'quiz-feedback';
  nextQuizBtn.classList.add('hidden');
  answeredCurrentQuestion = false;
  quizOptions.innerHTML = '';

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quiz-option';
    button.textContent = option;
    button.addEventListener('click', () => handleQuizAnswer(index, button));
    quizOptions.appendChild(button);
  });
}

function handleQuizAnswer(selectedIndex, optionButton) {
  if (answeredCurrentQuestion) {
    return;
  }

  const question = quizQuestions[currentQuizIndex];
  const optionButtons = [...quizOptions.querySelectorAll('button')];

  optionButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.correct) {
      button.classList.add('correct');
    }
    if (index === selectedIndex && index !== question.correct) {
      button.classList.add('wrong');
    }
  });

  answeredCurrentQuestion = true;

  if (selectedIndex === question.correct) {
    quizCorrectCount += 1;
    quizScore.textContent = String(quizCorrectCount);
    quizFeedback.textContent = 'Correct! Great job.';
    quizFeedback.classList.add('success');
  } else {
    quizFeedback.textContent = `Incorrect. The correct answer is: ${question.options[question.correct]}`;
    quizFeedback.classList.add('error');
  }

  if (currentQuizIndex < quizQuestions.length - 1) {
    nextQuizBtn.classList.remove('hidden');
  } else {
    nextQuizBtn.textContent = 'Restart quiz';
    nextQuizBtn.classList.remove('hidden');
  }
}

nextQuizBtn.addEventListener('click', () => {
  if (currentQuizIndex < quizQuestions.length - 1) {
    currentQuizIndex += 1;
    renderQuestion();
    return;
  }

  currentQuizIndex = 0;
  quizCorrectCount = 0;
  renderQuestion();
});

renderQuestion();
showSlide(0);
renderCounter();
