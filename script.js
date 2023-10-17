let questions = [
    {
        "question": "Wer komponierte das Stück 'Eine kleine Nachtmusik'?",
        "answer_1": "Robbie Williams",
        "answer_2": "Wolfgang Amadeus Mozart",
        "answer_3": "Scooter",
        "answer_4": "Franz Schubert",
        "right_answer": 2
    },

    {
        "question": "Wie viele Pokemon gibt es, Stand 05.10.2023?",
        "answer_1": "1292",
        "answer_2": "2043",
        "answer_3": "792",
        "answer_4": "4021",
        "right_answer": 1
    },

    {
        "question": "Was ist ein Smart Contract?",
        "answer_1": "verschlüsselter elektronischer Rechnungsversand",
        "answer_2": "eine revolutionäre CNC-Maschine",
        "answer_3": "eine Art digitaler Vertrag auf Basis der Blockchain-Technologie",
        "answer_4": "automatische Erstellung von Texten und Bildern bei Texteingaben",
        "right_answer": 3
    },

    {
        "question": "Was ist Prompt Engeneering?",
        "answer_1": "die Kunst, Flugzeugmotoren zu entwickeln",
        "answer_2": "ein Prozess, bei dem Blumenarrangements entworfen werden",
        "answer_3": "eine Methode zur Verbesserung des Schuhdesigns",
        "answer_4": "Gestaltung von Eingabeaufforderungen für KI-Modelle, um gewünschte Antworten zu erhalten",
        "right_answer": 4
    },

    {
        "question": "Was ist eine Fiat-Währung?",
        "answer_1": "eine staatlich ausgegebene Währung, die nicht durch physische Vermögenswerte gedeckt ist",
        "answer_2": "ein Begriff für digitale Kryptowährungen wie Bitcoin und Ethereum",
        "answer_3": "ein altes chinesisches Tauschmittel",
        "answer_4": "eine Art von italienischer Pasta",
        "right_answer": 1
    },

    {
        "question": "Wer ist der bekannteste Musiker der 2000er?",
        "answer_1": "Elvis Presley",
        "answer_2": "Wolfgang Amadeus Mozart",
        "answer_3": "Eminem",
        "answer_4": "Frank Sinatra",
        "right_answer": 3
    },

    {
        "question": "Was ist 1971 passiert?",
        "answer_1": "der Mensch landete erstmals auf dem Mars",
        "answer_2": "der Euro wurde eingeführt",
        "answer_3": "Präsident Nixon hob die Bindung des US-Dollars an den Goldstandard auf",
        "answer_4": "der erste Computer wurde im Auftrag der US-Armee gebaut",
        "right_answer": 3
    },
];

let rightQuestions = 0;
let currentQuestion = 0;
let audio_success = new Audio('audio/correct.wav');
let audio_fail = new Audio('audio/wrong.wav');

function init() {
    document.getElementById('questions_length').innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else { 
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function answer(selection) {
    let question = questions[currentQuestion];
    // console.log('selected answer is', selection);
    let selectedQuestionNumber = selection.slice(-1);
    // console.log('selectedQuestionNumber is', selectedQuestionNumber);
    // console.log('Current question is', question['right_answer']);

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        //console.log('Richtige Antwort!');
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audio_success.play();
        rightQuestions++;
    } else {
        //console.log('Falsche Antwort');
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audio_fail.play();
    }

    document.getElementById('next-Button').disabled = false;
}

function nextQuestion() {
    currentQuestion++; // z.B. von 0 auf 1
    document.getElementById('next-Button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = 'img/think.jpg';
    document.getElementById('question-body').style = '';
    document.getElementById('end-screen').style = 'display: none';

    rightQuestions = 0;
    currentQuestion = 0;
    init();
}

function showEndScreen() {
    document.getElementById('end-screen').style = '';
    document.getElementById('question-body').style = 'display: none';
    document.getElementById('questions-amount').innerHTML = questions.length;
    document.getElementById('question-right-amount').innerHTML = rightQuestions;
    document.getElementById('header-image').src = 'img/trophy.jpg';
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);

    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
    // console.log('Fortschritt:', percent);
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('question-text').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}