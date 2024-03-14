const express = require('express');
const natural = require('natural');
const i18n = require('i18n');
const app = express();

// Configure i18n
i18n.configure({
    locales: ['en', 'ta'],
    defaultLocale: 'en',
    directory: __dirname + '/locales'
});
app.use(i18n.init);

// Set up static files
app.use(express.static('public'));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// NLP processing
const tokenizer = new natural.WordTokenizer();

// Routes
app.get('/', (req, res) => {
    res.render('index', { locale: req.getLocale() });
});

app.post('/query', (req, res) => {
    const query = req.query.message;
    // const token = tokenizer.tokenize(query);
    // Perform NLP processing here
    // You can use tokenizer.tokenize(query) to tokenize the query
    // Then analyze tokens to determine the appropriate response
    // For simplicity, we'll just send a generic response
    const response = req.__("Welcome to our legal chatbot!"); // Example response from JSON
    res.send(response);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// const i18next = require('i18next');
// const Natural = require('natural');

// // Initialize i18next with the supported languages
// i18next.init({
//   lng: 'en',
//   resources: {
//     en: {
//       translation: {
//         greeting: 'Hello!',
//         goodbye: 'Goodbye!'
//       }
//     },
//     es: {
//       translation: {
//         greeting: '¡Hola!',
//         goodbye: '¡Adiós!'
//       }
//     }
//   }
// });

// // Initialize Natural language classifier
// const classifier = new Natural.BayesClassifier();

// // Train the classifier with some example text in different languages
// classifier.addDocument('Hello', 'en');
// classifier.addDocument('¡Hola!', 'es');

// // Function to detect the language of a given text
// function detectLanguage(text) {
//   return classifier.classify(text);
// }

// // Function to get a translated response based on the detected language
// function getResponse(text) {
//   const lang = detectLanguage(text);
//   return i18next.t(text, { lng: lang });
// }

// // Example usage
// const userInput = 'Hello';
// const response = getResponse(userInput);
// console.log(response);
