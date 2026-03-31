const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

const languagesData = {
    "English": {
        questions: [
            "What is FREETV?",
            "Does FreeTV offer regional language channels?",
            "Which are the devices on which FreeTV app can be used?",
            "Do I need an Internet connection for FREETV?",
            "How can I download FreeTV App?"
        ],
        answers: [
            "FreeTV is a platform offering free Live TV channels, Movies, Music, Series, TV shows, Devotional content, Education, and OTT content without subscription charges.",
            "Yes, we offer a variety of channels in regional languages including Hindi, Tamil, Telugu, Malayalam, Bengali, and more.",
            "FreeTV App can be installed on Google & Android version 7 and above supported TV devices.",
            "Yes, you need an active Internet connection to access and stream content on FREETV.",
            "You can download FreeTV App from www.freetvindia.com/download or via your local cable operator/Internet service provider."
        ]
    },
    "": {
        questions: [
            "FREETV क्या है?",
            "क्या FREETV क्षेत्रीय भाषा चैनल प्रदान करता है?",
            "किन उपकरणों पर FREETV ऐप का उपHindiयोग किया जा सकता है?",
            "क्या FREETV के लिए इंटरनेट कनेक्शन चाहिए?",
            "मैं FREETV ऐप कैसे डाउनलोड कर सकता हूँ?"
        ],
        answers: [
            "FREETV एक ऐसा प्लेटफ़ॉर्म है जो मुफ्त लाइव टीवी चैनल, फिल्में, संगीत, श्रृंखला, टीवी शो, भक्ति, शिक्षा और OTT सामग्री प्रदान करता है।",
            "हाँ, हम हिंदी, तमिल, तेलुगु, मलयालम, बंगाली और अन्य क्षेत्रीय भाषाओं में चैनल प्रदान करते हैं।",
            "FREETV ऐप सभी Google और Android 7+ टीवी डिवाइसेस पर इंस्टॉल हो सकता है।",
            "हाँ, FREETV के लिए सक्रिय इंटरनेट कनेक्शन आवश्यक है।",
            "आप www.freetvindia.com/download से या अपने स्थानीय केबल ऑपरेटर से डाउनलोड कर सकते हैं।"
        ]
    },
    "Marathi": {
        questions: [
            "FREETV काय आहे?",
            "FREETV प्रादेशिक भाषा चॅनेल ऑफर करतो का?",
            "FREETV अ‍ॅप कोणत्या उपकरणांवर वापरता येईल?",
            "FREETV वापरण्यासाठी इंटरनेट कनेक्शन आवश्यक आहे का?",
            "मी FREETV अ‍ॅप कसे डाउनलोड करू शकतो?"
        ],
        answers: [
            "FREETV हा एक प्लॅटफॉर्म आहे जो मोफत लाईव्ह टीव्ही चॅनेल, चित्रपट, संगीत, मालिका, टीव्ही शो, भक्ती, शिक्षण आणि OTT सामग्री ऑफर करतो.",
            "होय, आम्ही हिंदी, तमिळ, तेलुगु, मल्याळम, बंगाली आणि इतर भाषांमध्ये चॅनेल ऑफर करतो.",
            "FREETV अ‍ॅप सर्व Google व Android 7+ टीवी डिवाइसेसवर वापरता येतो.",
            "होय, FREETV वापरण्यासाठी सक्रिय इंटरनेट कनेक्शन आवश्यक आहे.",
            "तुम्ही www.freetvindia.com/download वरून किंवा स्थानिक केबल ऑपरेटरकडून डाउनलोड करू शकता."
        ]
    }
};

let selectedLanguage = "";
let answeredQuestions = [];

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showLanguageOptions() {
    const langDiv = document.createElement('div');
    langDiv.classList.add('language-buttons');

    ["Hindi", "English", "Marathi"].forEach(lang => {
        const button = document.createElement('button');
        button.textContent = lang;
        button.addEventListener('click', () => {
            appendMessage('user', lang);
            selectedLanguage = lang;
            answeredQuestions = [];
            showQuestions();
        });
        langDiv.appendChild(button);
    });

    const wrapper = document.createElement('div');
    wrapper.classList.add('chat-message', 'bot-message');
    wrapper.appendChild(langDiv);
    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showQuestions() {
    const remainingQuestions = languagesData[selectedLanguage].questions
        .map((q, i) => ({ index: i, text: q }))
        .filter(q => !answeredQuestions.includes(q.index));

    if (remainingQuestions.length === 0) {
        showHelpOptions();
        return;
    }

    const quesDiv = document.createElement('div');
    quesDiv.classList.add('question-buttons');
    remainingQuestions.forEach(({ index, text }) => {
        const button = document.createElement('button');
        button.textContent = `${index + 1}. ${text}`;
        button.addEventListener('click', () => handleQuestionClick(index));
        quesDiv.appendChild(button);
    });

    const wrapper = document.createElement('div');
    wrapper.classList.add('chat-message', 'bot-message');
    wrapper.appendChild(quesDiv);
    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleQuestionClick(index) {
    appendMessage('user', `${index + 1}. ${languagesData[selectedLanguage].questions[index]}`);
    setTimeout(() => {
        appendMessage('bot', languagesData[selectedLanguage].answers[index]);
        answeredQuestions.push(index);
        setTimeout(showQuestions, 800);
    }, 600);
}

function showHelpOptions() {
    appendMessage('bot', "Do you need any help?");
    const helpDiv = document.createElement('div');
    helpDiv.classList.add('help-buttons');

    const yesBtn = document.createElement('button');
    yesBtn.textContent = "Yes";
    yesBtn.addEventListener('click', () => {
        answeredQuestions = [];
        showQuestions();
    });

    const noBtn = document.createElement('button');
    noBtn.textContent = "No";
    noBtn.addEventListener('click', () => {
        appendMessage('bot', "Thank you!");
    });

    helpDiv.appendChild(yesBtn);
    helpDiv.appendChild(noBtn);

    const wrapper = document.createElement('div');
    wrapper.classList.add('chat-message', 'bot-message');
    wrapper.appendChild(helpDiv);
    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function initialGreet() {
    appendMessage('bot', "Hey! I'm your assistant. How can I help you?");
    setTimeout(showLanguageOptions, 800);
}

window.onload = initialGreet;
