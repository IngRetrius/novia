import React, { useState, useEffect } from 'react';

// Define las interfaces para los tipos
interface Word {
  spanish: string;
  english: string;
  category: string;
  example?: string; // Ejemplo de uso opcional
}

interface Category {
  id: string;
  name: string;
}

const SpanishEnglishDictionary: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('alphabetical');
  const [showExamples, setShowExamples] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Lista extendida de palabras con ejemplos
        const demoData: Word[] = [
          // Artículos y determinantes
          { spanish: "el / la", english: "the", category: "articles", example: "El libro está en la mesa. (The book is on the table.)" },
          { spanish: "un / una", english: "a / an", category: "articles", example: "Quiero un café y una galleta. (I want a coffee and a cookie.)" },
          { spanish: "los / las", english: "the (plural)", category: "articles", example: "Los niños juegan con las pelotas. (The children play with the balls.)" },
          { spanish: "unos / unas", english: "some", category: "articles", example: "Necesito unos lápices y unas hojas. (I need some pencils and some sheets.)" },
          { spanish: "este / esta", english: "this", category: "articles", example: "Este hombre y esta mujer son mis amigos. (This man and this woman are my friends.)" },
          { spanish: "estos / estas", english: "these", category: "articles", example: "Estos libros y estas revistas son interesantes. (These books and these magazines are interesting.)" },
          { spanish: "ese / esa", english: "that", category: "articles", example: "¿Te gusta ese vestido o esa camisa? (Do you like that dress or that shirt?)" },
          { spanish: "esos / esas", english: "those", category: "articles", example: "Esos perros y esas gatas son muy lindos. (Those dogs and those cats are very cute.)" },
          { spanish: "aquel / aquella", english: "that (over there)", category: "articles", example: "Aquel edificio y aquella montaña están lejos. (That building and that mountain are far away.)" },
          { spanish: "aquellos / aquellas", english: "those (over there)", category: "articles", example: "Aquellos árboles y aquellas flores son hermosos. (Those trees and those flowers over there are beautiful.)" },
          
          // Pronombres
          { spanish: "yo", english: "I", category: "pronouns", example: "Yo hablo español. (I speak Spanish.)" },
          { spanish: "tú", english: "you (informal)", category: "pronouns", example: "¿Tú hablas inglés? (Do you speak English?)" },
          { spanish: "usted", english: "you (formal)", category: "pronouns", example: "¿Usted necesita ayuda? (Do you need help?)" },
          { spanish: "él", english: "he", category: "pronouns", example: "Él es mi hermano. (He is my brother.)" },
          { spanish: "ella", english: "she", category: "pronouns", example: "Ella es mi hermana. (She is my sister.)" },
          { spanish: "nosotros / nosotras", english: "we", category: "pronouns", example: "Nosotros vamos al cine. (We are going to the movies.)" },
          { spanish: "vosotros / vosotras", english: "you all (informal, Spain)", category: "pronouns", example: "¿Vosotros venís a la fiesta? (Are you all coming to the party?)" },
          { spanish: "ustedes", english: "you all (formal/Latin America)", category: "pronouns", example: "¿Ustedes quieren café? (Do you all want coffee?)" },
          { spanish: "ellos / ellas", english: "they", category: "pronouns", example: "Ellos estudian español. (They study Spanish.)" },
          { spanish: "me", english: "me", category: "pronouns", example: "Dame el libro. (Give me the book.)" },
          { spanish: "te", english: "you (object)", category: "pronouns", example: "Te quiero mucho. (I love you a lot.)" },
          { spanish: "lo / la", english: "him / her / it", category: "pronouns", example: "Lo vi ayer. / La conocí hoy. (I saw him yesterday. / I met her today.)" },
          { spanish: "nos", english: "us", category: "pronouns", example: "Nos gusta bailar. (We like to dance.)" },
          { spanish: "os", english: "you all (object)", category: "pronouns", example: "Os invito a cenar. (I invite you all to dinner.)" },
          { spanish: "les", english: "them", category: "pronouns", example: "Les envié un mensaje. (I sent them a message.)" },
          { spanish: "mío / mía", english: "mine", category: "pronouns", example: "Este libro es mío. (This book is mine.)" },
          { spanish: "tuyo / tuya", english: "yours", category: "pronouns", example: "Esta casa es tuya. (This house is yours.)" },
          { spanish: "suyo / suya", english: "his / hers / theirs", category: "pronouns", example: "El coche es suyo. (The car is his/hers/theirs.)" },
          
          // Verbos comunes
          { spanish: "ser", english: "to be (permanent)", category: "verbs", example: "Soy estudiante. (I am a student.)" },
          { spanish: "estar", english: "to be (temporary)", category: "verbs", example: "Estoy cansado. (I am tired.)" },
          { spanish: "tener", english: "to have", category: "verbs", example: "Tengo dos hermanos. (I have two brothers.)" },
          { spanish: "hacer", english: "to do / to make", category: "verbs", example: "Hago mi tarea todos los días. (I do my homework every day.)" },
          { spanish: "ir", english: "to go", category: "verbs", example: "Voy al supermercado. (I'm going to the supermarket.)" },
          { spanish: "venir", english: "to come", category: "verbs", example: "¿Vienes a la fiesta? (Are you coming to the party?)" },
          { spanish: "decir", english: "to say / to tell", category: "verbs", example: "¿Qué dices? (What are you saying?)" },
          { spanish: "hablar", english: "to speak / to talk", category: "verbs", example: "Hablo tres idiomas. (I speak three languages.)" },
          { spanish: "comer", english: "to eat", category: "verbs", example: "Como frutas todos los días. (I eat fruit every day.)" },
          { spanish: "beber", english: "to drink", category: "verbs", example: "Bebo agua, no alcohol. (I drink water, not alcohol.)" },
          { spanish: "vivir", english: "to live", category: "verbs", example: "Vivo en Madrid. (I live in Madrid.)" },
          { spanish: "trabajar", english: "to work", category: "verbs", example: "Trabajo en un banco. (I work in a bank.)" },
          { spanish: "estudiar", english: "to study", category: "verbs", example: "Estudio medicina. (I study medicine.)" },
          { spanish: "aprender", english: "to learn", category: "verbs", example: "Aprendo español. (I'm learning Spanish.)" },
          { spanish: "enseñar", english: "to teach", category: "verbs", example: "Enseño matemáticas. (I teach mathematics.)" },
          { spanish: "escribir", english: "to write", category: "verbs", example: "Escribo un libro. (I'm writing a book.)" },
          { spanish: "leer", english: "to read", category: "verbs", example: "Leo novelas. (I read novels.)" },
          { spanish: "escuchar", english: "to listen", category: "verbs", example: "Escucho música. (I listen to music.)" },
          { spanish: "mirar / ver", english: "to look / to see", category: "verbs", example: "Miro las estrellas. / Veo una película. (I look at the stars. / I watch a movie.)" },
          { spanish: "dormir", english: "to sleep", category: "verbs", example: "Duermo ocho horas por noche. (I sleep eight hours per night.)" },
          
          // Preposiciones
          { spanish: "a", english: "to / at", category: "prepositions", example: "Voy a la escuela. (I go to school.)" },
          { spanish: "de", english: "of / from", category: "prepositions", example: "Soy de España. (I am from Spain.)" },
          { spanish: "en", english: "in / on", category: "prepositions", example: "Estoy en casa. (I am at home.)" },
          { spanish: "con", english: "with", category: "prepositions", example: "Voy con mis amigos. (I'm going with my friends.)" },
          { spanish: "por", english: "for / by / through", category: "prepositions", example: "Lo hago por ti. (I do it for you.)" },
          { spanish: "para", english: "for / in order to", category: "prepositions", example: "Esto es para ti. (This is for you.)" },
          { spanish: "sin", english: "without", category: "prepositions", example: "Café sin azúcar. (Coffee without sugar.)" },
          { spanish: "sobre", english: "on / about", category: "prepositions", example: "El libro está sobre la mesa. (The book is on the table.)" },
          { spanish: "bajo", english: "under / below", category: "prepositions", example: "El gato está bajo la cama. (The cat is under the bed.)" },
          { spanish: "entre", english: "between", category: "prepositions", example: "La pelota está entre los dos coches. (The ball is between the two cars.)" },
          { spanish: "detrás de", english: "behind", category: "prepositions", example: "El perro está detrás de la casa. (The dog is behind the house.)" },
          { spanish: "delante de", english: "in front of", category: "prepositions", example: "La fuente está delante del edificio. (The fountain is in front of the building.)" },
          { spanish: "dentro de", english: "inside", category: "prepositions", example: "Las llaves están dentro del cajón. (The keys are inside the drawer.)" },
          { spanish: "fuera de", english: "outside", category: "prepositions", example: "Los niños juegan fuera de la casa. (The children play outside the house.)" },
          { spanish: "cerca de", english: "near", category: "prepositions", example: "Vivo cerca de la universidad. (I live near the university.)" },
          { spanish: "lejos de", english: "far from", category: "prepositions", example: "El pueblo está lejos de la ciudad. (The village is far from the city.)" },
          
          // Conectores
          { spanish: "y", english: "and", category: "connectors", example: "Café y tostadas. (Coffee and toast.)" },
          { spanish: "o", english: "or", category: "connectors", example: "¿Té o café? (Tea or coffee?)" },
          { spanish: "pero", english: "but", category: "connectors", example: "Es caro pero bueno. (It's expensive but good.)" },
          { spanish: "porque", english: "because", category: "connectors", example: "Estudio porque quiero aprender. (I study because I want to learn.)" },
          { spanish: "si", english: "if", category: "connectors", example: "Si llueve, no salimos. (If it rains, we don't go out.)" },
          { spanish: "cuando", english: "when", category: "connectors", example: "Te llamo cuando llegue. (I'll call you when I arrive.)" },
          { spanish: "como", english: "as / like", category: "connectors", example: "Canta como un profesional. (He/she sings like a professional.)" },
          { spanish: "aunque", english: "although / even though", category: "connectors", example: "Voy a salir aunque llueva. (I'm going out even though it's raining.)" },
          { spanish: "mientras", english: "while", category: "connectors", example: "Leo mientras espero. (I read while I wait.)" },
          { spanish: "entonces", english: "then", category: "connectors", example: "Entonces, ¿qué hacemos? (So, what do we do?)" },
          { spanish: "por lo tanto", english: "therefore", category: "connectors", example: "Estudió mucho, por lo tanto aprobó. (He studied a lot, therefore he passed.)" },
          { spanish: "sin embargo", english: "however", category: "connectors", example: "Es difícil, sin embargo voy a intentarlo. (It's difficult, however I'm going to try it.)" },
          { spanish: "además", english: "furthermore / in addition", category: "connectors", example: "Me gusta el libro, además es barato. (I like the book, furthermore it's cheap.)" },
          
          // Palabras comunes
          { spanish: "sí", english: "yes", category: "common", example: "Sí, por favor. (Yes, please.)" },
          { spanish: "no", english: "no", category: "common", example: "No, gracias. (No, thank you.)" },
          { spanish: "hola", english: "hello", category: "common", example: "¡Hola! ¿Cómo estás? (Hello! How are you?)" },
          { spanish: "adiós", english: "goodbye", category: "common", example: "Adiós, hasta mañana. (Goodbye, see you tomorrow.)" },
          { spanish: "gracias", english: "thank you", category: "common", example: "Muchas gracias por tu ayuda. (Thank you very much for your help.)" },
          { spanish: "por favor", english: "please", category: "common", example: "Un café, por favor. (A coffee, please.)" },
          { spanish: "de nada", english: "you're welcome", category: "common", example: "—Gracias. —De nada. (—Thank you. —You're welcome.)" },
          { spanish: "disculpe / perdón", english: "excuse me / sorry", category: "common", example: "Disculpe, ¿dónde está el baño? (Excuse me, where is the bathroom?)" },
          { spanish: "bien", english: "well / good", category: "common", example: "Todo está bien. (Everything is good.)" },
          { spanish: "mal", english: "bad / poorly", category: "common", example: "Me siento mal. (I feel bad.)" },
          { spanish: "ahora", english: "now", category: "common", example: "Quiero comer ahora. (I want to eat now.)" },
          { spanish: "después", english: "after / later", category: "common", example: "Nos vemos después. (See you later.)" },
          { spanish: "antes", english: "before", category: "common", example: "Llámame antes de salir. (Call me before leaving.)" },
          { spanish: "siempre", english: "always", category: "common", example: "Siempre llego temprano. (I always arrive early.)" },
          { spanish: "nunca", english: "never", category: "common", example: "Nunca como carne. (I never eat meat.)" },
          { spanish: "a veces", english: "sometimes", category: "common", example: "A veces voy al cine. (Sometimes I go to the movies.)" },
          { spanish: "mucho", english: "a lot / much", category: "common", example: "Te extraño mucho. (I miss you a lot.)" },
          { spanish: "poco", english: "little / few", category: "common", example: "Tengo poco tiempo. (I have little time.)" },
          { spanish: "todo", english: "all / everything", category: "common", example: "Todo está listo. (Everything is ready.)" },
          { spanish: "nada", english: "nothing", category: "common", example: "No quiero nada. (I don't want anything.)" },
          { spanish: "algo", english: "something", category: "common", example: "¿Quieres algo de beber? (Do you want something to drink?)" },
          { spanish: "alguien", english: "someone", category: "common", example: "¿Hay alguien aquí? (Is there someone here?)" },
          { spanish: "nadie", english: "nobody", category: "common", example: "No hay nadie en casa. (There's nobody at home.)" },
          
          // Frases útiles
          { spanish: "¿Cómo estás?", english: "How are you?", category: "phrases", example: "Hola, ¿cómo estás hoy? (Hello, how are you today?)" },
          { spanish: "¿Cómo te llamas?", english: "What's your name?", category: "phrases", example: "Hola, ¿cómo te llamas? (Hello, what's your name?)" },
          { spanish: "Me llamo...", english: "My name is...", category: "phrases", example: "Me llamo Juan. (My name is Juan.)" },
          { spanish: "Mucho gusto", english: "Nice to meet you", category: "phrases", example: "Mucho gusto en conocerte. (Nice to meet you.)" },
          { spanish: "¿Qué hora es?", english: "What time is it?", category: "phrases", example: "Disculpa, ¿qué hora es? (Excuse me, what time is it?)" },
          { spanish: "¿De dónde eres?", english: "Where are you from?", category: "phrases", example: "¿De dónde eres? Soy de México. (Where are you from? I'm from Mexico.)" },
          { spanish: "Soy de...", english: "I'm from...", category: "phrases", example: "Soy de Argentina. (I'm from Argentina.)" },
          { spanish: "¿Cuánto cuesta?", english: "How much does it cost?", category: "phrases", example: "Disculpe, ¿cuánto cuesta este libro? (Excuse me, how much does this book cost?)" },
          { spanish: "No entiendo", english: "I don't understand", category: "phrases", example: "Lo siento, no entiendo. ¿Puedes repetirlo? (Sorry, I don't understand. Can you repeat it?)" },
          { spanish: "¿Hablas inglés?", english: "Do you speak English?", category: "phrases", example: "Perdón, ¿hablas inglés? (Sorry, do you speak English?)" },
          { spanish: "Hablo un poco de español", english: "I speak a little Spanish", category: "phrases", example: "No hablo mucho español, solo un poco. (I don't speak much Spanish, just a little.)" },
          { spanish: "¿Dónde está el baño?", english: "Where is the bathroom?", category: "phrases", example: "Disculpe, ¿dónde está el baño? (Excuse me, where is the bathroom?)" },
          { spanish: "Tengo hambre", english: "I'm hungry", category: "phrases", example: "Tengo hambre, vamos a comer algo. (I'm hungry, let's eat something.)" },
          { spanish: "Tengo sed", english: "I'm thirsty", category: "phrases", example: "Tengo sed, ¿me das un vaso de agua? (I'm thirsty, can you give me a glass of water?)" },
          { spanish: "Hasta luego", english: "See you later", category: "phrases", example: "Me tengo que ir. Hasta luego. (I have to go. See you later.)" },
          { spanish: "Hasta mañana", english: "See you tomorrow", category: "phrases", example: "Buenas noches, hasta mañana. (Good night, see you tomorrow.)" },
          { spanish: "Buenas noches", english: "Good night", category: "phrases", example: "Ya es tarde. Buenas noches. (It's late. Good night.)" },
          { spanish: "Buenos días", english: "Good morning", category: "phrases", example: "Buenos días, ¿cómo amaneciste? (Good morning, how did you sleep?)" },
          { spanish: "Buenas tardes", english: "Good afternoon", category: "phrases", example: "Buenas tardes a todos. (Good afternoon everyone.)" }
        ];
        
        setWords(demoData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

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

  const categories: Category[] = [
    { id: 'all', name: 'Todas las palabras' },
    { id: 'articles', name: 'Artículos y determinantes' },
    { id: 'pronouns', name: 'Pronombres' },
    { id: 'verbs', name: 'Verbos' },
    { id: 'prepositions', name: 'Preposiciones' },
    { id: 'connectors', name: 'Conectores' },
    { id: 'common', name: 'Palabras comunes' },
    { id: 'phrases', name: 'Frases útiles' },
    { id: 'other', name: 'Otros' }
  ];

  // Filter words
  const filteredWords = words.filter(word => {
    const matchesSearch = word.spanish.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (word.example && word.example.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || word.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort words
  const sortedWords = [...filteredWords].sort((a, b) => {
    if (sortOrder === 'alphabetical') {
      return a.spanish.toLowerCase() < b.spanish.toLowerCase() ? -1 : 1;
    } else if (sortOrder === 'category') {
      // Primero ordenar por categoría
      if (a.category !== b.category) {
        return a.category < b.category ? -1 : 1;
      }
      // Luego por palabra española
      return a.spanish.toLowerCase() < b.spanish.toLowerCase() ? -1 : 1;
    }
    return 0;
  });

  // Animation keyframes for the garden
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
  `;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <style>{keyframes}</style>
      <div className="p-4 bg-purple-700 text-white">
        <h1 className="text-2xl font-bold mb-2">Diccionario Español-Inglés</h1>
        <p className="text-sm">Una colección de {words.length} palabras y frases comunes en español con traducciones al inglés</p>
      </div>
      
      <div className="p-4 bg-white shadow-md">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar palabras en español o inglés..."
            className="w-full p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
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
              Alfabético
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sort"
                checked={sortOrder === 'category'}
                onChange={() => handleSortChange('category')}
                className="mr-2"
              />
              Por Categoría
            </label>
          </div>
          
          <div className="ml-auto">
            <button 
              onClick={toggleExamples}
              className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition"
            >
              {showExamples ? "Ocultar ejemplos" : "Mostrar ejemplos"}
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="p-8 text-center">Cargando...</div>
      ) : (
        <div className="flex-1 p-4 overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-100">
                <th className="p-2 text-left border-b border-purple-300 w-1/4">Español</th>
                <th className="p-2 text-left border-b border-purple-300 w-1/4">Inglés</th>
                {showExamples && <th className="p-2 text-left border-b border-purple-300 w-1/2">Ejemplo</th>}
              </tr>
            </thead>
            <tbody>
              {sortedWords.map((word, index) => (
                <tr 
                  key={index} 
                  className={`hover:bg-purple-50 ${index % 2 === 0 ? 'bg-white' : 'bg-purple-50/30'}`}
                >
                  <td className="p-2 border-b border-gray-200 font-medium">{word.spanish}</td>
                  <td className="p-2 border-b border-gray-200">{word.english}</td>
                  {showExamples && <td className="p-2 border-b border-gray-200 text-gray-700 italic">{word.example}</td>}
                </tr>
              ))}
              {sortedWords.length === 0 && (
                <tr>
                  <td colSpan={showExamples ? 3 : 2} className="p-4 text-center text-gray-500">
                    No se encontraron palabras con tu búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SpanishEnglishDictionary;