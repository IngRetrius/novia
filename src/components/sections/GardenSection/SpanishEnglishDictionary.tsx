import React, { useState, useEffect } from 'react';

// Define interfaces for types
interface Word {
  spanish: string;
  english: string;
  category: string;
  example?: string;
  learned?: boolean;
  favorite?: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface Practice {
  word: Word;
  showAnswer: boolean;
  correct: boolean | null;
}

const SpanishEnglishDictionary: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('alphabetical');
  const [showExamples, setShowExamples] = useState<boolean>(true);
  
  // New state for enhanced features
  const [viewMode, setViewMode] = useState<'all' | 'favorites' | 'learned'>('all');
  const [isPracticing, setIsPracticing] = useState<boolean>(false);
  const [practiceWords, setPracticeWords] = useState<Practice[]>([]);
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState<number>(0);
  const [stats, setStats] = useState({
    totalWords: 0,
    learned: 0,
    favorites: 0
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if we have saved data in localStorage
        const savedData = localStorage.getItem('dictionaryWords');
        let demoData: Word[] = [];
        
        if (savedData) {
          demoData = JSON.parse(savedData);
        } else {
          // Extensive list of words with examples 
          demoData = [
            // Places
            { spanish: "restaurante", english: "restaurant", category: "places", example: "Vamos a cenar en este restaurante. (Let's have dinner at this restaurant.)", learned: false, favorite: false },
            { spanish: "hotel", english: "hotel", category: "places", example: "Me hospedo en un hotel cerca de la playa. (I'm staying at a hotel near the beach.)", learned: false, favorite: false },
            { spanish: "aeropuerto", english: "airport", category: "places", example: "El aeropuerto está lejos de la ciudad. (The airport is far from the city.)", learned: false, favorite: false },
            { spanish: "estación", english: "station", category: "places", example: "La estación de tren está allí. (The train station is there.)", learned: false, favorite: false },
            { spanish: "banco", english: "bank", category: "places", example: "Necesito ir al banco. (I need to go to the bank.)", learned: false, favorite: false },
            { spanish: "supermercado", english: "supermarket", category: "places", example: "Voy al supermercado a comprar comida. (I'm going to the supermarket to buy food.)", learned: false, favorite: false },
            { spanish: "farmacia", english: "pharmacy", category: "places", example: "Necesito medicinas de la farmacia. (I need medicine from the pharmacy.)", learned: false, favorite: false },
            { spanish: "hospital", english: "hospital", category: "places", example: "Mi amigo está en el hospital. (My friend is in the hospital.)", learned: false, favorite: false },
            { spanish: "escuela", english: "school", category: "places", example: "Los niños van a la escuela. (The children go to school.)", learned: false, favorite: false },
            { spanish: "universidad", english: "university", category: "places", example: "Estudio en la universidad. (I study at the university.)", learned: false, favorite: false },
            { spanish: "biblioteca", english: "library", category: "places", example: "Voy a estudiar en la biblioteca. (I'm going to study at the library.)", learned: false, favorite: false },
            { spanish: "playa", english: "beach", category: "places", example: "Me encanta nadar en la playa. (I love swimming at the beach.)", learned: false, favorite: false },
            { spanish: "parque", english: "park", category: "places", example: "Los domingos voy al parque. (On Sundays I go to the park.)", learned: false, favorite: false },
            // Food and drinks
            { spanish: "agua", english: "water", category: "food", example: "Quiero un vaso de agua. (I want a glass of water.)", learned: false, favorite: false },
            { spanish: "café", english: "coffee", category: "food", example: "Me gusta el café con leche. (I like coffee with milk.)", learned: false, favorite: false },
            { spanish: "té", english: "tea", category: "food", example: "Prefiero té con limón. (I prefer tea with lemon.)", learned: false, favorite: false },
            { spanish: "cerveza", english: "beer", category: "food", example: "Una cerveza, por favor. (A beer, please.)", learned: false, favorite: false },
            { spanish: "vino", english: "wine", category: "food", example: "Me gusta el vino tinto. (I like red wine.)", learned: false, favorite: false },
            { spanish: "pan", english: "bread", category: "food", example: "Quiero pan con queso. (I want bread with cheese.)", learned: false, favorite: false },
            { spanish: "queso", english: "cheese", category: "food", example: "Me encanta el queso español. (I love Spanish cheese.)", learned: false, favorite: false },
            { spanish: "carne", english: "meat", category: "food", example: "No como carne. (I don't eat meat.)", learned: false, favorite: false },
            { spanish: "pescado", english: "fish", category: "food", example: "El pescado está muy fresco. (The fish is very fresh.)", learned: false, favorite: false },
            { spanish: "fruta", english: "fruit", category: "food", example: "Como fruta todos los días. (I eat fruit every day.)", learned: false, favorite: false },
            { spanish: "verdura", english: "vegetable", category: "food", example: "Las verduras son saludables. (Vegetables are healthy.)", learned: false, favorite: false },
            // Articles and determiners
            { spanish: "el / la", english: "the", category: "articles", example: "El libro está en la mesa. (The book is on the table.)", learned: false, favorite: false },
            { spanish: "un / una", english: "a / an", category: "articles", example: "Quiero un café y una galleta. (I want a coffee and a cookie.)", learned: false, favorite: false },
            { spanish: "los / las", english: "the (plural)", category: "articles", example: "Los niños juegan con las pelotas. (The children play with the balls.)", learned: false, favorite: false },
            { spanish: "unos / unas", english: "some", category: "articles", example: "Necesito unos lápices y unas hojas. (I need some pencils and some sheets.)", learned: false, favorite: false },
            { spanish: "este / esta", english: "this", category: "articles", example: "Este hombre y esta mujer son mis amigos. (This man and this woman are my friends.)", learned: false, favorite: false },
            { spanish: "estos / estas", english: "these", category: "articles", example: "Estos libros y estas revistas son interesantes. (These books and these magazines are interesting.)", learned: false, favorite: false },
            { spanish: "ese / esa", english: "that", category: "articles", example: "¿Te gusta ese vestido o esa camisa? (Do you like that dress or that shirt?)", learned: false, favorite: false },
            { spanish: "esos / esas", english: "those", category: "articles", example: "Esos perros y esas gatas son muy lindos. (Those dogs and those cats are very cute.)", learned: false, favorite: false },
            { spanish: "aquel / aquella", english: "that (over there)", category: "articles", example: "Aquel edificio y aquella montaña están lejos. (That building and that mountain are far away.)", learned: false, favorite: false },
            { spanish: "aquellos / aquellas", english: "those (over there)", category: "articles", example: "Aquellos árboles y aquellas flores son hermosos. (Those trees and those flowers over there are beautiful.)", learned: false, favorite: false },
            
            // Pronouns
            { spanish: "yo", english: "I", category: "pronouns", example: "Yo hablo español. (I speak Spanish.)", learned: false, favorite: false },
            { spanish: "tú", english: "you (informal)", category: "pronouns", example: "¿Tú hablas inglés? (Do you speak English?)", learned: false, favorite: false },
            { spanish: "usted", english: "you (formal)", category: "pronouns", example: "¿Usted necesita ayuda? (Do you need help?)", learned: false, favorite: false },
            { spanish: "él", english: "he", category: "pronouns", example: "Él es mi hermano. (He is my brother.)", learned: false, favorite: false },
            { spanish: "ella", english: "she", category: "pronouns", example: "Ella es mi hermana. (She is my sister.)", learned: false, favorite: false },
            { spanish: "nosotros / nosotras", english: "we", category: "pronouns", example: "Nosotros vamos al cine. (We are going to the movies.)", learned: false, favorite: false },
            { spanish: "vosotros / vosotras", english: "you all (informal, Spain)", category: "pronouns", example: "¿Vosotros venís a la fiesta? (Are you all coming to the party?)", learned: false, favorite: false },
            { spanish: "ustedes", english: "you all (formal/Latin America)", category: "pronouns", example: "¿Ustedes quieren café? (Do you all want coffee?)", learned: false, favorite: false },
            { spanish: "ellos / ellas", english: "they", category: "pronouns", example: "Ellos estudian español. (They study Spanish.)", learned: false, favorite: false },
            { spanish: "me", english: "me", category: "pronouns", example: "Dame el libro. (Give me the book.)", learned: false, favorite: false },
            { spanish: "te", english: "you (object)", category: "pronouns", example: "Te quiero mucho. (I love you a lot.)", learned: false, favorite: false },
            { spanish: "lo / la", english: "him / her / it", category: "pronouns", example: "Lo vi ayer. / La conocí hoy. (I saw him yesterday. / I met her today.)", learned: false, favorite: false },
            { spanish: "nos", english: "us", category: "pronouns", example: "Nos gusta bailar. (We like to dance.)", learned: false, favorite: false },
            { spanish: "os", english: "you all (object)", category: "pronouns", example: "Os invito a cenar. (I invite you all to dinner.)", learned: false, favorite: false },
            { spanish: "les", english: "them", category: "pronouns", example: "Les envié un mensaje. (I sent them a message.)", learned: false, favorite: false },
            { spanish: "mío / mía", english: "mine", category: "pronouns", example: "Este libro es mío. (This book is mine.)", learned: false, favorite: false },
            { spanish: "tuyo / tuya", english: "yours", category: "pronouns", example: "Esta casa es tuya. (This house is yours.)", learned: false, favorite: false },
            { spanish: "suyo / suya", english: "his / hers / theirs", category: "pronouns", example: "El coche es suyo. (The car is his/hers/theirs.)", learned: false, favorite: false },
            
            // Common verbs
            { spanish: "ser", english: "to be (permanent)", category: "verbs", example: "Soy estudiante. (I am a student.)", learned: false, favorite: false },
            { spanish: "estar", english: "to be (temporary)", category: "verbs", example: "Estoy cansado. (I am tired.)", learned: false, favorite: false },
            { spanish: "tener", english: "to have", category: "verbs", example: "Tengo dos hermanos. (I have two brothers.)", learned: false, favorite: false },
            { spanish: "hacer", english: "to do / to make", category: "verbs", example: "Hago mi tarea todos los días. (I do my homework every day.)", learned: false, favorite: false },
            { spanish: "ir", english: "to go", category: "verbs", example: "Voy al supermercado. (I'm going to the supermarket.)", learned: false, favorite: false },
            { spanish: "venir", english: "to come", category: "verbs", example: "¿Vienes a la fiesta? (Are you coming to the party?)", learned: false, favorite: false },
            { spanish: "decir", english: "to say / to tell", category: "verbs", example: "¿Qué dices? (What are you saying?)", learned: false, favorite: false },
            { spanish: "hablar", english: "to speak / to talk", category: "verbs", example: "Hablo tres idiomas. (I speak three languages.)", learned: false, favorite: false },
            { spanish: "comer", english: "to eat", category: "verbs", example: "Como frutas todos los días. (I eat fruit every day.)", learned: false, favorite: false },
            { spanish: "beber", english: "to drink", category: "verbs", example: "Bebo agua, no alcohol. (I drink water, not alcohol.)", learned: false, favorite: false },
            { spanish: "vivir", english: "to live", category: "verbs", example: "Vivo en Madrid. (I live in Madrid.)", learned: false, favorite: false },
            { spanish: "trabajar", english: "to work", category: "verbs", example: "Trabajo en un banco. (I work in a bank.)", learned: false, favorite: false },
            { spanish: "estudiar", english: "to study", category: "verbs", example: "Estudio medicina. (I study medicine.)", learned: false, favorite: false },
            { spanish: "aprender", english: "to learn", category: "verbs", example: "Aprendo español. (I'm learning Spanish.)", learned: false, favorite: false },
            { spanish: "enseñar", english: "to teach", category: "verbs", example: "Enseño matemáticas. (I teach mathematics.)", learned: false, favorite: false },
            { spanish: "escribir", english: "to write", category: "verbs", example: "Escribo un libro. (I'm writing a book.)", learned: false, favorite: false },
            { spanish: "leer", english: "to read", category: "verbs", example: "Leo novelas. (I read novels.)", learned: false, favorite: false },
            { spanish: "escuchar", english: "to listen", category: "verbs", example: "Escucho música. (I listen to music.)", learned: false, favorite: false },
            { spanish: "mirar / ver", english: "to look / to see", category: "verbs", example: "Miro las estrellas. / Veo una película. (I look at the stars. / I watch a movie.)", learned: false, favorite: false },
            { spanish: "dormir", english: "to sleep", category: "verbs", example: "Duermo ocho horas por noche. (I sleep eight hours per night.)", learned: false, favorite: false },
            { spanish: "querer", english: "to want / to love", category: "verbs", example: "Quiero un helado. / Te quiero. (I want an ice cream. / I love you.)", learned: false, favorite: false },
            { spanish: "poder", english: "to be able to", category: "verbs", example: "No puedo venir hoy. (I can't come today.)", learned: false, favorite: false },
            { spanish: "saber", english: "to know (facts)", category: "verbs", example: "Sé la respuesta. (I know the answer.)", learned: false, favorite: false },
            { spanish: "conocer", english: "to know (people, places)", category: "verbs", example: "Conozco Madrid muy bien. (I know Madrid very well.)", learned: false, favorite: false },
            { spanish: "poner", english: "to put / to place", category: "verbs", example: "Pongo los libros en la mesa. (I put the books on the table.)", learned: false, favorite: false },
            { spanish: "salir", english: "to go out / to leave", category: "verbs", example: "Salgo con mis amigos. (I'm going out with my friends.)", learned: false, favorite: false },
            { spanish: "entrar", english: "to enter", category: "verbs", example: "Entro en la tienda. (I enter the store.)", learned: false, favorite: false },
            
            // Connectors
            { spanish: "y", english: "and", category: "connectors", example: "Café y tostadas. (Coffee and toast.)", learned: false, favorite: false },
            { spanish: "o", english: "or", category: "connectors", example: "¿Té o café? (Tea or coffee?)", learned: false, favorite: false },
            { spanish: "pero", english: "but", category: "connectors", example: "Es caro pero bueno. (It's expensive but good.)", learned: false, favorite: false },
            { spanish: "porque", english: "because", category: "connectors", example: "Estudio porque quiero aprender. (I study because I want to learn.)", learned: false, favorite: false },
            { spanish: "si", english: "if", category: "connectors", example: "Si llueve, no salimos. (If it rains, we don't go out.)", learned: false, favorite: false },
            { spanish: "cuando", english: "when", category: "connectors", example: "Te llamo cuando llegue. (I'll call you when I arrive.)", learned: false, favorite: false },
            { spanish: "como", english: "as / like", category: "connectors", example: "Canta como un profesional. (He/she sings like a professional.)", learned: false, favorite: false },
            { spanish: "aunque", english: "although / even though", category: "connectors", example: "Voy a salir aunque llueva. (I'm going out even though it's raining.)", learned: false, favorite: false },
            { spanish: "entonces", english: "then", category: "connectors", example: "Entonces, ¿qué hacemos? (So, what do we do?)", learned: false, favorite: false },
            // Prepositions
            { spanish: "a", english: "to / at", category: "prepositions", example: "Voy a la escuela. (I go to school.)", learned: false, favorite: false },
            { spanish: "de", english: "of / from", category: "prepositions", example: "Soy de España. (I am from Spain.)", learned: false, favorite: false },
            { spanish: "en", english: "in / on", category: "prepositions", example: "Estoy en casa. (I am at home.)", learned: false, favorite: false },
            { spanish: "con", english: "with", category: "prepositions", example: "Voy con mis amigos. (I'm going with my friends.)", learned: false, favorite: false },
            { spanish: "por", english: "for / by / through", category: "prepositions", example: "Lo hago por ti. (I do it for you.)", learned: false, favorite: false },
            { spanish: "para", english: "for / in order to", category: "prepositions", example: "Esto es para ti. (This is for you.)", learned: false, favorite: false },
            { spanish: "sin", english: "without", category: "prepositions", example: "Café sin azúcar. (Coffee without sugar.)", learned: false, favorite: false },
            { spanish: "sobre", english: "on / about", category: "prepositions", example: "El libro está sobre la mesa. (The book is on the table.)", learned: false, favorite: false },
            { spanish: "bajo", english: "under / below", category: "prepositions", example: "El gato está bajo la cama. (The cat is under the bed.)", learned: false, favorite: false },
            { spanish: "entre", english: "between", category: "prepositions", example: "La pelota está entre los dos coches. (The ball is between the two cars.)", learned: false, favorite: false },
            { spanish: "detrás de", english: "behind", category: "prepositions", example: "El perro está detrás de la casa. (The dog is behind the house.)", learned: false, favorite: false },
            { spanish: "delante de", english: "in front of", category: "prepositions", example: "La fuente está delante del edificio. (The fountain is in front of the building.)", learned: false, favorite: false },
            // Common words
            { spanish: "sí", english: "yes", category: "common", example: "Sí, por favor. (Yes, please.)", learned: false, favorite: false },
            { spanish: "no", english: "no", category: "common", example: "No, gracias. (No, thank you.)", learned: false, favorite: false },
            { spanish: "hola", english: "hello", category: "common", example: "¡Hola! ¿Cómo estás? (Hello! How are you?)", learned: false, favorite: false },
            { spanish: "adiós", english: "goodbye", category: "common", example: "Adiós, hasta mañana. (Goodbye, see you tomorrow.)", learned: false, favorite: false },
            { spanish: "gracias", english: "thank you", category: "common", example: "Muchas gracias por tu ayuda. (Thank you very much for your help.)", learned: false, favorite: false },
            { spanish: "por favor", english: "please", category: "common", example: "Un café, por favor. (A coffee, please.)", learned: false, favorite: false },
            { spanish: "de nada", english: "you're welcome", category: "common", example: "—Gracias. —De nada. (—Thank you. —You're welcome.)", learned: false, favorite: false },
            { spanish: "disculpe / perdón", english: "excuse me / sorry", category: "common", example: "Disculpe, ¿dónde está el baño? (Excuse me, where is the bathroom?)", learned: false, favorite: false },
            { spanish: "bien", english: "well / good", category: "common", example: "Todo está bien. (Everything is good.)", learned: false, favorite: false },
            { spanish: "mal", english: "bad / poorly", category: "common", example: "Me siento mal. (I feel bad.)", learned: false, favorite: false },
            // Common phrases
            { spanish: "¿Cómo estás?", english: "How are you?", category: "phrases", example: "Hola, ¿cómo estás hoy? (Hello, how are you today?)", learned: false, favorite: false },
            { spanish: "¿Cómo te llamas?", english: "What's your name?", category: "phrases", example: "Hola, ¿cómo te llamas? (Hello, what's your name?)", learned: false, favorite: false },
            { spanish: "Mucho gusto", english: "Nice to meet you", category: "phrases", example: "Mucho gusto en conocerte. (Nice to meet you.)", learned: false, favorite: false },
            { spanish: "¿Dónde está el baño?", english: "Where is the bathroom?", category: "phrases", example: "Disculpe, ¿dónde está el baño? (Excuse me, where is the bathroom?)", learned: false, favorite: false },
            { spanish: "No entiendo", english: "I don't understand", category: "phrases", example: "Lo siento, no entiendo. ¿Puedes repetirlo? (Sorry, I don't understand. Can you repeat it?)", learned: false, favorite: false },
            { spanish: "¿Hablas inglés?", english: "Do you speak English?", category: "phrases", example: "Perdón, ¿hablas inglés? (Sorry, do you speak English?)", learned: false, favorite: false },
            { spanish: "Hablo un poco de español", english: "I speak a little Spanish", category: "phrases", example: "No hablo mucho español, solo un poco. (I don't speak much Spanish, just a little.)", learned: false, favorite: false },
            { spanish: "¿Cuánto cuesta?", english: "How much does it cost?", category: "phrases", example: "¿Cuánto cuesta este libro? (How much does this book cost?)", learned: false, favorite: false },
            { spanish: "La cuenta, por favor", english: "The bill, please", category: "phrases", example: "Camarero, la cuenta, por favor. (Waiter, the bill, please.)", learned: false, favorite: false },
            { spanish: "¿Qué hora es?", english: "What time is it?", category: "phrases", example: "Disculpa, ¿qué hora es? (Excuse me, what time is it?)", learned: false, favorite: false },
            { spanish: "Me gusta", english: "I like", category: "phrases", example: "Me gusta el chocolate. (I like chocolate.)", learned: false, favorite: false },
            { spanish: "No me gusta", english: "I don't like", category: "phrases", example: "No me gusta el café. (I don't like coffee.)", learned: false, favorite: false },
            { spanish: "Tengo hambre", english: "I'm hungry", category: "phrases", example: "Tengo hambre, vamos a comer. (I'm hungry, let's eat.)", learned: false, favorite: false },
            { spanish: "Tengo sed", english: "I'm thirsty", category: "phrases", example: "Tengo sed, quiero agua. (I'm thirsty, I want water.)", learned: false, favorite: false },
            { spanish: "Estoy cansado/a", english: "I'm tired", category: "phrases", example: "Estoy cansada, quiero dormir. (I'm tired, I want to sleep.)", learned: false, favorite: false },
            { spanish: "¿A qué hora...?", english: "At what time...?", category: "phrases", example: "¿A qué hora abre el museo? (At what time does the museum open?)", learned: false, favorite: false },
            { spanish: "¿Cómo se dice...?", english: "How do you say...?", category: "phrases", example: "¿Cómo se dice 'apple' en español? (How do you say 'apple' in Spanish?)", learned: false, favorite: false },
            { spanish: "¿Qué significa...?", english: "What does ... mean?", category: "phrases", example: "¿Qué significa esta palabra? (What does this word mean?)", learned: false, favorite: false },
            { spanish: "¿Puedes repetir?", english: "Can you repeat?", category: "phrases", example: "¿Puedes repetir más despacio, por favor? (Can you repeat more slowly, please?)", learned: false, favorite: false },
            { spanish: "¿Puedo pagar con tarjeta?", english: "Can I pay with card?", category: "phrases", example: "¿Puedo pagar con tarjeta de crédito? (Can I pay with credit card?)", learned: false, favorite: false },
            // Time expressions
            { spanish: "ahora", english: "now", category: "common", example: "Quiero comer ahora. (I want to eat now.)", learned: false, favorite: false },
            { spanish: "después", english: "after / later", category: "common", example: "Nos vemos después. (See you later.)", learned: false, favorite: false },
            { spanish: "antes", english: "before", category: "common", example: "Llámame antes de salir. (Call me before leaving.)", learned: false, favorite: false },
            { spanish: "siempre", english: "always", category: "common", example: "Siempre llego temprano. (I always arrive early.)", learned: false, favorite: false },
            { spanish: "nunca", english: "never", category: "common", example: "Nunca como carne. (I never eat meat.)", learned: false, favorite: false },
            { spanish: "a veces", english: "sometimes", category: "common", example: "A veces voy al cine. (Sometimes I go to the movies.)", learned: false, favorite: false },
            { spanish: "hoy", english: "today", category: "common", example: "Hoy hace buen tiempo. (Today the weather is good.)", learned: false, favorite: false },
            { spanish: "mañana", english: "tomorrow", category: "common", example: "Mañana voy al médico. (Tomorrow I'm going to the doctor.)", learned: false, favorite: false },
            { spanish: "ayer", english: "yesterday", category: "common", example: "Ayer fui al cine. (Yesterday I went to the movies.)", learned: false, favorite: false },        
          ];
        }
        
        setWords(demoData);
        updateStats(demoData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Update stats whenever words change
  const updateStats = (wordsList: Word[]) => {
    setStats({
      totalWords: wordsList.length,
      learned: wordsList.filter(word => word.learned).length,
      favorites: wordsList.filter(word => word.favorite).length
    });
  };

  // Save words to localStorage whenever they change
  useEffect(() => {
    if (words.length > 0) {
      localStorage.setItem('dictionaryWords', JSON.stringify(words));
      updateStats(words);
    }
  }, [words]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };

  const toggleExamples = () => {
    setShowExamples(!showExamples);
  };

  const toggleFavorite = (index: number) => {
    const newWords = [...words];
    newWords[index].favorite = !newWords[index].favorite;
    setWords(newWords);
  };

  const toggleLearned = (index: number) => {
    const newWords = [...words];
    newWords[index].learned = !newWords[index].learned;
    setWords(newWords);
  };

  const startPractice = () => {
    // Select 10 random words to practice
    let wordsToUse: Word[] = [];
    
    if (viewMode === 'favorites') {
      wordsToUse = words.filter(word => word.favorite);
    } else if (viewMode === 'learned') {
      wordsToUse = words.filter(word => word.learned);
    } else if (activeCategory !== 'all') {
      wordsToUse = words.filter(word => word.category === activeCategory);
    } else {
      wordsToUse = [...words];
    }

    // If there are no words to practice, don't start
    if (wordsToUse.length === 0) return;

    // Shuffle and pick up to 10 words
    const shuffled = [...wordsToUse].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(10, shuffled.length));
    
    // Create practice objects
    const practice: Practice[] = selected.map(word => ({
      word,
      showAnswer: false,
      correct: null
    }));
    
    setPracticeWords(practice);
    setCurrentPracticeIndex(0);
    setIsPracticing(true);
  };

  const endPractice = () => {
    setIsPracticing(false);
    setPracticeWords([]);
  };

  const showAnswer = () => {
    const newPracticeWords = [...practiceWords];
    newPracticeWords[currentPracticeIndex].showAnswer = true;
    setPracticeWords(newPracticeWords);
  };

  const markAnswer = (isCorrect: boolean) => {
    const newPracticeWords = [...practiceWords];
    newPracticeWords[currentPracticeIndex].correct = isCorrect;
    setPracticeWords(newPracticeWords);
    
    // Auto mark as learned if correct
    if (isCorrect) {
      const currentWord = practiceWords[currentPracticeIndex].word;
      const wordIndex = words.findIndex(w => w.spanish === currentWord.spanish);
      if (wordIndex !== -1) {
        const newWords = [...words];
        newWords[wordIndex].learned = true;
        setWords(newWords);
      }
    }
    
    // Move to next word after a short delay
    setTimeout(() => {
      if (currentPracticeIndex < practiceWords.length - 1) {
        setCurrentPracticeIndex(currentPracticeIndex + 1);
      } else {
        // Practice complete
        setTimeout(() => {
          setIsPracticing(false);
        }, 1500);
      }
    }, 1000);
  };

  const categories: Category[] = [
    { id: 'all', name: 'All Words' },
    { id: 'articles', name: 'Articles & Determiners' },
    { id: 'pronouns', name: 'Pronouns' },
    { id: 'verbs', name: 'Verbs' },
    { id: 'prepositions', name: 'Prepositions' },
    { id: 'connectors', name: 'Connectors' },
    { id: 'common', name: 'Common Words' },
    { id: 'phrases', name: 'Useful Phrases' },
    { id: 'food', name: 'Food & Drinks' },
    { id: 'places', name: 'Places' },
    { id: 'numbers', name: 'Numbers' },
    { id: 'other', name: 'Other' }
  ];

  // Filter words based on active filters
  const filteredWords = words.filter(word => {
    // Filter by search term
    const matchesSearch = word.spanish.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (word.example && word.example.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by category
    const matchesCategory = activeCategory === 'all' || word.category === activeCategory;
    
    // Filter by view mode
    const matchesViewMode = 
      viewMode === 'all' || 
      (viewMode === 'favorites' && word.favorite) || 
      (viewMode === 'learned' && word.learned);
    
    return matchesSearch && matchesCategory && matchesViewMode;
  });

  // Sort filtered words
  const sortedWords = [...filteredWords].sort((a, b) => {
    if (sortOrder === 'alphabetical') {
      return a.spanish.toLowerCase() < b.spanish.toLowerCase() ? -1 : 1;
    } else if (sortOrder === 'category') {
      // Sort by category first
      if (a.category !== b.category) {
        return a.category < b.category ? -1 : 1;
      }
      // Then by Spanish word
      return a.spanish.toLowerCase() < b.spanish.toLowerCase() ? -1 : 1;
    }
    return 0;
  });

  // Animation keyframes
  const keyframes = `
    @keyframes appear {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    
    @keyframes grow {
      0% { transform: scaleY(0); transform-origin: bottom; }
      100% { transform: scaleY(1); transform-origin: bottom; }
    }
    
    @keyframes bloom {
      0% { transform-origin: center; transform: scale(0); }
      100% { transform-origin: center; transform: scale(1); }
    }
    
    @keyframes sway {
      0% { transform: rotate(0deg); }
      50% { transform: rotate(5deg); }
      100% { transform: rotate(0deg); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes slideIn {
      0% { transform: translateX(100%); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }
  `;
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <style>{keyframes}</style>
      
      {isPracticing ? (
        // Practice mode view
        <div className="flex flex-col h-full bg-purple-50 p-4 rounded-lg shadow-md animate-[slideIn_0.3s_ease-out]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-800">Practice Mode</h2>
            <div className="text-sm text-purple-700">
              Card {currentPracticeIndex + 1} of {practiceWords.length}
            </div>
            <button
              onClick={endPractice}
              className="px-3 py-1 bg-purple-200 text-purple-800 rounded hover:bg-purple-300 transition"
            >
              Exit Practice
            </button>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mb-6 transform transition-all duration-300">
              <div className="text-center">
                <p className="text-sm text-purple-500 mb-2">
                  {practiceWords[currentPracticeIndex]?.word.category.charAt(0).toUpperCase() + 
                   practiceWords[currentPracticeIndex]?.word.category.slice(1)}
                </p>
                <h3 className="text-3xl font-bold text-purple-900 mb-4">
                  {practiceWords[currentPracticeIndex]?.word.english}
                </h3>
                
                {practiceWords[currentPracticeIndex]?.showAnswer ? (
                  <div className={`mt-8 p-4 rounded-lg transition-all duration-500 ${
                    practiceWords[currentPracticeIndex]?.correct === true 
                      ? 'bg-green-100 text-green-800'
                      : practiceWords[currentPracticeIndex]?.correct === false
                      ? 'bg-red-100 text-red-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    <p className="text-2xl font-bold">
                      {practiceWords[currentPracticeIndex]?.word.spanish}
                    </p>
                    <p className="text-sm mt-2 italic">
                      {practiceWords[currentPracticeIndex]?.word.example}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={showAnswer}
                    className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition animate-[pulse_2s_infinite]"
                  >
                    Show Answer
                  </button>
                )}
                
                {practiceWords[currentPracticeIndex]?.showAnswer && 
                 practiceWords[currentPracticeIndex]?.correct === null && (
                  <div className="mt-6 flex justify-center gap-4">
                    <button
                      onClick={() => markAnswer(false)}
                      className="px-6 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition"
                    >
                      I was wrong
                    </button>
                    <button
                      onClick={() => markAnswer(true)}
                      className="px-6 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition"
                    >
                      I was right
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              {practiceWords.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-6 h-2 rounded-full ${
                    index === currentPracticeIndex 
                      ? 'bg-purple-600' 
                      : index < currentPracticeIndex 
                      ? 'bg-purple-300' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Dictionary view
        <>
          <div className="p-4 bg-purple-700 text-white">
            <h1 className="text-2xl font-bold mb-2">Spanish-English Dictionary</h1>
            <p className="text-sm">A collection of {words.length} common Spanish words and phrases with English translations</p>
            
            {/* Progress stats */}
            <div className="mt-3 flex space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
                <span>{stats.learned} words learned</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></div>
                <span>{stats.favorites} favorites</span>
              </div>
              <div className="flex items-center ml-auto">
                <button
                  onClick={startPractice}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  disabled={filteredWords.length === 0}
                >
                  Practice These Words
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white shadow-md">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search Spanish or English words..."
                className="w-full p-2 border border-gray-300 rounded"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            {/* View filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                className={`px-3 py-1 text-sm rounded ${viewMode === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setViewMode('all')}
              >
                All Words
              </button>
              <button
                className={`px-3 py-1 text-sm rounded ${viewMode === 'favorites' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setViewMode('favorites')}
              >
                Favorites
              </button>
              <button
                className={`px-3 py-1 text-sm rounded ${viewMode === 'learned' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setViewMode('learned')}
              >
                Learned
              </button>
            </div>
            
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-3 py-1 text-sm rounded ${activeCategory === category.id ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4 items-center">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortOrder === 'alphabetical'}
                    onChange={() => handleSortChange('alphabetical')}
                    className="mr-2"
                  />
                  Alphabetical
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortOrder === 'category'}
                    onChange={() => handleSortChange('category')}
                    className="mr-2"
                  />
                  By Category
                </label>
              </div>
              
              <div className="ml-auto">
                <button 
                  onClick={toggleExamples}
                  className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition"
                >
                  {showExamples ? "Hide Examples" : "Show Examples"}
                </button>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : (
            <div className="flex-1 p-4 overflow-auto">
              {filteredWords.length === 0 ? (
                <div className="text-center p-8 text-gray-500">
                  No words found matching your search.
                </div>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="p-2 text-left border-b border-purple-300 w-1/5">Spanish</th>
                      <th className="p-2 text-left border-b border-purple-300 w-1/5">English</th>
                      {showExamples && <th className="p-2 text-left border-b border-purple-300 w-2/5">Example</th>}
                      <th className="p-2 text-center border-b border-purple-300 w-1/5">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedWords.map((word, index) => (
                      <tr 
                        key={index} 
                        className={`hover:bg-purple-50 ${
                          word.learned ? 'bg-green-50' : 
                          index % 2 === 0 ? 'bg-white' : 'bg-purple-50/30'
                        }`}
                      >
                        <td className="p-2 border-b border-gray-200 font-medium">{word.spanish}</td>
                        <td className="p-2 border-b border-gray-200">{word.english}</td>
                        {showExamples && <td className="p-2 border-b border-gray-200 text-gray-700 italic">{word.example}</td>}
                        <td className="p-2 border-b border-gray-200 text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => toggleFavorite(words.findIndex(w => w.spanish === word.spanish))}
                              className={`p-1 rounded-full ${word.favorite ? 'text-yellow-500 bg-yellow-100' : 'text-gray-400 hover:text-yellow-500'}`}
                              title={word.favorite ? "Remove from favorites" : "Add to favorites"}
                            >
                              {/* Star icon */}
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => toggleLearned(words.findIndex(w => w.spanish === word.spanish))}
                              className={`p-1 rounded-full ${word.learned ? 'text-green-500 bg-green-100' : 'text-gray-400 hover:text-green-500'}`}
                              title={word.learned ? "Mark as not learned" : "Mark as learned"}
                            >
                              {/* Check icon */}
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SpanishEnglishDictionary;
  