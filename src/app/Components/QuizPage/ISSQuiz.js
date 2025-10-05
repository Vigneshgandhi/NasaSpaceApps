import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Star, Rocket, Trophy, RotateCcw, Skull, Sword } from "lucide-react";

const API_URL = "https://opentdb.com/api.php?amount=10&category=17&type=multiple";

const rankTitles = [
  { min: 0, max: 40, title: "🛰️ Cadet", color: "text-gray-300" },
  { min: 41, max: 80, title: "🚀 Pilot", color: "text-blue-400" },
  { min: 81, max: 100, title: "🌠 Commander", color: "text-yellow-400" }
];

export default function ISSQuiz() {
  const [gameState, setGameState] = useState("intro"); // intro, rules, quiz, results
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch questions from API
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      
      // Process questions to match our format
      const processedQuestions = data.results.map(q => ({
        question: q.question,
        correct_answer: q.correct_answer,
        incorrect_answers: q.incorrect_answers,
        all_answers: [...q.incorrect_answers, q.correct_answer]
          .sort(() => Math.random() - 0.5)
      }));
      
      setQuestions(processedQuestions);
      setLoading(false);
    } catch (err) {
      setError("Failed to load questions. Please try again.");
      setLoading(false);
    }
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === "quiz" && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (gameState === "quiz" && timeLeft === 0 && !showResult) {
      handleAnswer(null);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState, showResult]);

  // Start quiz
  const startQuiz = () => {
    setGameState("rules");
  };

  // Begin gameplay
  const beginGame = () => {
    setGameState("quiz");
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(15);
    setShowResult(false);
    setSelectedAnswer(null);
    fetchQuestions();
  };

  // Handle answer selection
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    // Check if answer is correct
    const isCorrect = answer === questions[currentQuestion]?.correct_answer;
    if (isCorrect) {
      setScore(score + 10);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(15);
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        setGameState("results");
      }
    }, 2000);
  };

  // Restart quiz
  const restartQuiz = () => {
    setGameState("intro");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(15);
  };

  // Get user rank
  const getUserRank = () => {
    return rankTitles.find(rank => score >= rank.min && score <= rank.max) || rankTitles[0];
  };

  // Render stars based on score
  const renderStars = () => {
    const stars = [];
    const starCount = Math.floor(score / 10);
    
    for (let i = 0; i < starCount; i++) {
      stars.push(
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
          className="text-yellow-400"
        >
          <Star className="w-6 h-6" fill="currentColor" />
        </motion.div>
      );
    }
    
    return stars;
  };

  if (loading && gameState === "quiz") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold">Loading Mission Data...</h2>
          <p className="text-gray-400 mt-2">Preparing your space knowledge challenge</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Mission Control Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Button onClick={restartQuiz} className="bg-blue-600 hover:bg-blue-700">
            Return to Base
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
      {/* Space background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          suppressHydrationWarning={true}/>
        ))}
        
        {/* Twinkling stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Distant planets */}
        <motion.div
          className="absolute rounded-full bg-gradient-to-br from-purple-900 to-indigo-800"
          style={{
            top: '20%',
            left: '10%',
            width: '80px',
            height: '80px',
          }}
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        
        <motion.div
          className="absolute rounded-full bg-gradient-to-br from-blue-900 to-cyan-700"
          style={{
            top: '70%',
            right: '15%',
            width: '120px',
            height: '120px',
          }}
          animate={{
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
        
        {/* Nebula effect */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-900 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Intro Screen */}
        {gameState === "intro" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mx-auto w-32 h-32 mb-8"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl w-full h-full flex items-center justify-center">
                <Rocket className="h-16 w-16 text-cyan-400" />
              </div>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Mission: Knowledge
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-blue-300">
              The ISS Challenge
            </h2>
            
            <div className="max-w-2xl mx-auto mb-10">
              <p className="text-xl md:text-2xl mb-4">Welcome aboard, Commander! 🚀</p>
              <p className="text-lg md:text-xl text-blue-200 mb-4">
                Your mission is to prove your space knowledge and earn your ISS Certification.
              </p>
              <p className="text-lg md:text-xl text-blue-200">
                Answer the questions, collect stars, and see if you can make it to orbit! 🌍✨
              </p>
            </div>
            
            <Button 
              onClick={startQuiz}
              className="text-xl px-8 py-6 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 shadow-lg shadow-cyan-500/30"
            >
              Start Quiz
            </Button>
          </motion.div>
        )}

        {/* Rules Screen */}
        {gameState === "rules" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 max-w-2xl mx-auto shadow-xl">
              <Card.Body className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-cyan-300">Mission Briefing</h2>
                
                <div className="space-y-6 text-lg">
                  <div className="flex items-start">
                    <div className="bg-cyan-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
                    <p className="text-blue-200">You'll face 10 random questions about NASA and the International Space Station.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-cyan-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
                    <p className="text-blue-200">Each correct answer gives you <span className="text-yellow-300 font-bold">+10 points</span> and a <Star className="inline w-5 h-5 text-yellow-300" fill="currentColor" /> star.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-cyan-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
                    <p className="text-blue-200">You have <span className="text-red-400 font-bold">15 seconds</span> per question — think fast! ⏱️</p>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-xl font-bold mb-4 text-cyan-300">Earn bonus ranks:</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <span className="text-blue-200">0–40 points</span>
                        <span className="font-bold text-gray-400">🛰️ Cadet</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <span className="text-blue-200">50–80 points</span>
                        <span className="font-bold text-blue-400">🚀 Pilot</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                        <span className="text-blue-200">90–100 points</span>
                        <span className="font-bold text-yellow-300">🌠 Commander</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 text-center">
                  <Button 
                    onClick={beginGame}
                    className="text-xl px-8 py-6 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 shadow-lg shadow-green-500/30"
                  >
                    Begin Mission
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        )}

        {/* Quiz Screen */}
        {gameState === "quiz" && questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8"
          >
            {/* Progress and Score */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-lg text-blue-200">
                Question <span className="font-bold">{currentQuestion + 1}</span> of {questions.length}
              </div>
              <div className="text-lg text-blue-200">
                Score: <span className="font-bold text-yellow-300">{score}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-4 mb-8 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-cyan-400 to-purple-500 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Timer */}
            <div className="flex justify-center mb-8">
              <div className={`text-3xl font-bold ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
                ⏱️ {timeLeft}s
              </div>
            </div>
            
            {/* Question Card */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 mb-8 shadow-xl">
              <Card.Body className="p-6">
                <h2 
                  className="text-xl md:text-2xl font-bold mb-6 text-blue-200"
                  dangerouslySetInnerHTML={{ __html: questions[currentQuestion]?.question }}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentQuestion]?.all_answers.map((answer, index) => {
                    const isSelected = selectedAnswer === answer;
                    const isCorrect = answer === questions[currentQuestion]?.correct_answer;
                    let buttonClass = "p-4 text-left w-full transition-all rounded-lg border";
                    
                    if (showResult) {
                      if (isCorrect) {
                        buttonClass += " bg-green-500/20 border-green-500/50 text-green-300";
                      } else if (isSelected) {
                        buttonClass += " bg-red-500/20 border-red-500/50 text-red-300";
                      } else {
                        buttonClass += " bg-gray-800/50 border-gray-700 text-blue-200";
                      }
                    } else {
                      buttonClass += " bg-gray-800/50 hover:bg-gray-700/50 border-gray-700 text-blue-200";
                    }
                    
                    return (
                      <Button
                        key={index}
                        onClick={() => !showResult && handleAnswer(answer)}
                        disabled={showResult}
                        className={buttonClass}
                      >
                        <div 
                          className="w-full text-left"
                          dangerouslySetInnerHTML={{ __html: answer }}
                        />
                      </Button>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
            
            {/* Feedback */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center p-4 rounded-lg backdrop-blur-sm border ${
                    selectedAnswer === questions[currentQuestion]?.correct_answer 
                      ? 'bg-green-500/20 border-green-500/50 text-green-300' 
                      : 'bg-red-500/20 border-red-500/50 text-red-300'
                  }`}
                >
                  {selectedAnswer === questions[currentQuestion]?.correct_answer ? (
                    <div className="flex items-center justify-center">
                      <span className="text-2xl mr-2">✅</span>
                      <span className="text-xl font-bold">Mission Success!</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-center">
                        <span className="text-2xl mr-2">❌</span>
                        <span className="text-xl font-bold">Meteor Missed the Target!</span>
                      </div>
                      <p className="mt-2">
                        Correct answer: <span 
                          className="font-bold"
                          dangerouslySetInnerHTML={{ 
                            __html: questions[currentQuestion]?.correct_answer 
                          }} 
                        />
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Results Screen */}
        {gameState === "results" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="py-12 text-center"
          >
            <div className="max-w-2xl mx-auto">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="mx-auto w-32 h-32 mb-8"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl w-full h-full flex items-center justify-center">
                  <Trophy className="h-16 w-16 text-yellow-400" />
                </div>
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-6 text-blue-200">Mission Complete, Commander!</h2>
              
              <div className="text-2xl mb-8 text-blue-300">
                You've scored <span className="font-bold text-yellow-400">{score}</span> points
              </div>
              
              <div className="text-3xl font-bold mb-10">
                Rank: <span className={getUserRank().color}>{getUserRank().title}</span>
              </div>
              
              {/* Fun Animation */}
              <div className="relative w-full h-64 flex items-center justify-center mb-10">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-8xl mb-4"
                >
                  🚀
                </motion.div>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity
                  }}
                  className="absolute top-10 text-4xl"
                >
                  ⭐
                </motion.div>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                  className="absolute top-20 right-20 text-3xl"
                >
                  🌟
                </motion.div>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    duration: 1.8,
                    repeat: Infinity,
                    delay: 1
                  }}
                  className="absolute bottom-10 left-20 text-3xl"
                >
                  ✨
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity
                  }}
                  className="absolute bottom-5 right-10 text-5xl"
                >
                  🌍
                </motion.div>
              </div>
              
              {/* Stars */}
              <div className="flex justify-center flex-wrap gap-4 mb-12">
                {renderStars()}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  onClick={restartQuiz}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 shadow-lg shadow-cyan-500/30"
                >
                  <RotateCcw className="mr-5 h-5 w-5" />
                  Play Again
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
