import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';
import { Scale, Activity, Target, TrendingDown, Calendar, Dumbbell, Apple, Zap, Award, ChevronRight, Plus, Check, Star, Trophy, Flame, Heart, ThumbsUp, Sparkles, PartyPopper, Crown } from 'lucide-react';

const MaTransformationApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  
  // Données utilisateur personnalisées
  const [profile] = useState({
    currentWeight: 59,
    targetWeight: 55,
    currentWaist: 75, // Elle a dit "75 départ" donc je comprends qu'elle est déjà passée de 91 à 75
    startWaist: 91,
    targetWaist: 70,
    height: 158,
    weeklyWeightGoal: 2,
    weeklyWaistGoal: 2.5,
    sessionsPerWeek: 5,
    preferredTime: 'soir',
    motivation: "Le regard ébahi de mon copain"
  });

  const [todayData, setTodayData] = useState({
    weight: 59,
    waist: 75,
    caloriesConsumed: 0,
    caloriesBurned: 0,
    steps: 0,
    waterGlasses: 0,
    elasticExerciseDone: false,
    vacuumDone: false,
    sleepQuality: 0
  });

  const [weekProgress] = useState([
    { day: 'L', weight: 59, waist: 75, deficit: -450 },
    { day: 'M', weight: 58.7, waist: 74.6, deficit: -520 },
    { day: 'M', weight: 58.5, waist: 74.3, deficit: -480 },
    { day: 'J', weight: 58.2, waist: 74, deficit: -510 },
    { day: 'V', weight: 58, waist: 73.7, deficit: -490 },
    { day: 'S', weight: 57.8, waist: 73.4, deficit: -460 },
    { day: 'D', weight: 57.5, waist: 73.1, deficit: -500 }
  ]);

  // Calcul déficit calorique personnalisé (Formule Mifflin-St Jeor)
  const calculateDailyCalories = () => {
    const bmr = (10 * profile.currentWeight) + (6.25 * profile.height) - (5 * 28) - 161; // Age estimé
    const tdee = bmr * 1.3; // Activité légère
    const targetCalories = Math.round(tdee - 500);
    return { tdee: Math.round(tdee), target: targetCalories };
  };

  const calorieGoals = calculateDailyCalories();

  // Badges et accomplissements
  const [badges, setBadges] = useState([
    { id: 1, name: '1ère séance', icon: '🎯', unlocked: true, date: 'Aujourd\'hui' },
    { id: 2, name: 'Série de 3 jours', icon: '🔥', unlocked: false },
    { id: 3, name: '-1kg', icon: '⚖️', unlocked: false },
    { id: 4, name: '-1cm', icon: '📏', unlocked: false },
    { id: 5, name: 'Semaine complète', icon: '👑', unlocked: false },
    { id: 6, name: 'Déficit parfait', icon: '💎', unlocked: false },
    { id: 7, name: '-2kg', icon: '🌟', unlocked: false },
    { id: 8, name: 'Objectif atteint!', icon: '🏆', unlocked: false }
  ]);

  // Défis quotidiens
  const [dailyChallenges] = useState([
    { id: 1, title: '5 séries d\'élastiques', completed: false, points: 50 },
    { id: 2, title: '3 séries de vacuum', completed: false, points: 30 },
    { id: 3, title: 'Déficit calorique respecté', completed: false, points: 40 },
    { id: 4, title: '8 verres d\'eau', completed: false, points: 20 },
    { id: 5, title: '7000 pas', completed: false, points: 30 }
  ]);

  const [totalPoints, setTotalPoints] = useState(170);
  const [streak, setStreak] = useState(3);

  // Messages motivants personnalisés
  const motivationalMessages = [
    "Imagine le regard de ton copain quand il verra ta taille affinée ! 😍",
    "Tu l'as déjà fait une fois, tu peux le refaire ! 💪",
    "Chaque séance te rapproche de ton objectif ! 🎯",
    "Ta détermination est ta plus grande force ! ⚡",
    "-16cm en novembre, tu es une warrior ! 👑",
    "Les élastiques sont tes meilleurs alliés ! 💎",
    "Le vacuum travaille même quand tu te reposes ! ✨",
    "Tu ne construis pas juste un corps, tu reprends le contrôle ! 🔥"
  ];

  const [currentMessage, setCurrentMessage] = useState(motivationalMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Fonction de célébration
  const celebrate = (message) => {
    setCelebrationMessage(message);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  // Simuler la synchronisation des appareils
  const syncDevices = () => {
    celebrate("✨ Données synchronisées ! Balance Sydonia & Xiaomi connectées");
    // Animation de sync
  };

  // Marquer un exercice comme fait
  const completeExercise = (exerciseType) => {
    setTodayData({...todayData, [exerciseType]: true});
    celebrate(`🎉 Bravo ! ${exerciseType === 'elasticExerciseDone' ? 'Élastiques terminés' : 'Vacuum accompli'} !`);
    setTotalPoints(totalPoints + 50);
  };

  // Progression en pourcentage
  const weightProgress = ((profile.currentWeight - profile.targetWeight) / (59 - profile.targetWeight)) * 100;
  const waistProgress = ((profile.startWaist - profile.currentWaist) / (profile.startWaist - profile.targetWaist)) * 100;

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Hero section avec motivation */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <Flame className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight">MA TRANSFORMATION</h2>
                <p className="text-rose-100 text-sm font-medium">Série de {streak} jours ! 🔥</p>
              </div>
            </div>
            <button onClick={syncDevices} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Sync
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-4 border border-white/20">
            <p className="text-lg font-bold mb-2">💭 {currentMessage}</p>
            <div className="flex items-center gap-2 text-sm text-rose-100">
              <Heart className="w-4 h-4 fill-current" />
              <span>Tu es à {Math.round((profile.currentWeight - profile.targetWeight) * 100) / 100}kg de ton objectif</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <Scale className="w-5 h-5" />
                <span className="text-2xl font-black">{profile.currentWeight}kg</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div className="bg-white rounded-full h-2 transition-all duration-500" style={{width: `${100 - weightProgress}%`}}></div>
              </div>
              <p className="text-xs text-rose-100">Objectif: {profile.targetWeight}kg</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5" />
                <span className="text-2xl font-black">{profile.currentWaist}cm</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div className="bg-white rounded-full h-2 transition-all duration-500" style={{width: `${waistProgress}%`}}></div>
              </div>
              <p className="text-xs text-rose-100">Objectif: {profile.targetWaist}cm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Défis du jour */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            Défis du jour
          </h3>
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full font-black text-sm">
            {totalPoints} points
          </div>
        </div>

        <div className="space-y-3">
          {dailyChallenges.map((challenge) => (
            <div key={challenge.id} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${challenge.completed ? 'bg-green-50 border-2 border-green-300' : 'bg-gray-50 border-2 border-gray-200 hover:border-pink-300'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${challenge.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                  {challenge.completed ? <Check className="w-5 h-5 text-white" /> : <span className="text-white font-bold text-sm">{challenge.id}</span>}
                </div>
                <span className={`font-bold ${challenge.completed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                  {challenge.title}
                </span>
              </div>
              <span className="text-amber-600 font-black text-sm">+{challenge.points}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Programme d'exercices */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 shadow-lg border-2 border-purple-200">
        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-purple-600" />
          Programme du jour
        </h3>

        <div className="space-y-4">
          {/* Exercice élastiques */}
          <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-purple-100">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-black text-lg text-gray-900 mb-1">💪 Élastiques + Jambes 90°</h4>
                <p className="text-sm text-gray-600 mb-2">5 séries de 15 répétitions</p>
                <p className="text-xs text-gray-500 italic">Allongée, tire les élastiques vers la poitrine + lève les pieds à 90°</p>
              </div>
              <button 
                onClick={() => completeExercise('elasticExerciseDone')}
                disabled={todayData.elasticExerciseDone}
                className={`px-6 py-3 rounded-xl font-black transition-all ${todayData.elasticExerciseDone ? 'bg-green-500 text-white' : 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105'}`}
              >
                {todayData.elasticExerciseDone ? '✓ Fait !' : 'Terminer'}
              </button>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 mt-3">
              <p className="text-xs text-purple-900 font-semibold">⏱️ Repos: 30-45 secondes entre les séries</p>
            </div>
          </div>

          {/* Vacuum */}
          <div className="bg-white rounded-2xl p-5 shadow-md border-2 border-pink-100">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-black text-lg text-gray-900 mb-1">🫁 Vacuum Abdominal</h4>
                <p className="text-sm text-gray-600 mb-2">3 séries de 20-30 secondes</p>
                <p className="text-xs text-gray-500 italic">Expire tout l'air et rentre le ventre au maximum</p>
              </div>
              <button 
                onClick={() => completeExercise('vacuumDone')}
                disabled={todayData.vacuumDone}
                className={`px-6 py-3 rounded-xl font-black transition-all ${todayData.vacuumDone ? 'bg-green-500 text-white' : 'bg-pink-600 text-white hover:bg-pink-700 hover:scale-105'}`}
              >
                {todayData.vacuumDone ? '✓ Fait !' : 'Terminer'}
              </button>
            </div>
            <div className="bg-pink-50 rounded-xl p-3 mt-3">
              <p className="text-xs text-pink-900 font-semibold">⏱️ Repos: 1 minute entre les séries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphique de progression */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <TrendingDown className="w-6 h-6 text-green-600" />
          Progression hebdomadaire
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weekProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#666" style={{fontSize: '12px', fontWeight: 'bold'}} />
            <YAxis stroke="#666" style={{fontSize: '12px'}} />
            <Tooltip 
              contentStyle={{backgroundColor: '#fff', border: '2px solid #ec4899', borderRadius: '12px', fontWeight: 'bold'}}
            />
            <Line type="monotone" dataKey="weight" stroke="#ec4899" strokeWidth={3} dot={{fill: '#ec4899', r: 5}} name="Poids (kg)" />
            <Line type="monotone" dataKey="waist" stroke="#8b5cf6" strokeWidth={3} dot={{fill: '#8b5cf6', r: 5}} name="Tour de taille (cm)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const BadgesView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl">
        <h2 className="text-3xl font-black mb-2">🏆 MES VICTOIRES</h2>
        <p className="text-amber-100 font-semibold">Chaque pas compte, chaque effort est célébré !</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge) => (
          <div key={badge.id} className={`rounded-2xl p-6 text-center transition-all transform hover:scale-105 ${badge.unlocked ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl' : 'bg-gray-100 text-gray-400'}`}>
            <div className="text-5xl mb-3">{badge.icon}</div>
            <h3 className="font-black text-lg mb-1">{badge.name}</h3>
            {badge.unlocked && <p className="text-xs opacity-90">{badge.date}</p>}
            {!badge.unlocked && <p className="text-xs">À débloquer</p>}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-black text-gray-900 mb-4">📊 Statistiques</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Série actuelle</span>
            <span className="text-2xl font-black text-orange-600">{streak} jours 🔥</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Badges débloqués</span>
            <span className="text-2xl font-black text-purple-600">{badges.filter(b => b.unlocked).length}/{badges.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-semibold">Points totaux</span>
            <span className="text-2xl font-black text-amber-600">{totalPoints} pts</span>
          </div>
        </div>
      </div>
    </div>
  );

  const NutritionView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
        <h2 className="text-3xl font-black mb-2">🥗 NUTRITION</h2>
        <p className="text-green-100 font-semibold">Déficit calorique = succès garanti</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-black text-gray-900 mb-4">🎯 Objectif quotidien</h3>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border-2 border-green-200">
          <div className="text-center mb-4">
            <div className="text-5xl font-black text-green-600 mb-2">{calorieGoals.target}</div>
            <p className="text-gray-600 font-semibold">calories / jour</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 font-semibold">TDEE (maintenance)</span>
              <span className="font-black text-gray-900">{calorieGoals.tdee} cal</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-semibold">Déficit</span>
              <span className="font-black text-red-600">-500 cal</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Calories consommées aujourd'hui</label>
            <input 
              type="number" 
              value={todayData.caloriesConsumed}
              onChange={(e) => setTodayData({...todayData, caloriesConsumed: parseInt(e.target.value)})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl font-bold text-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              placeholder="Ex: 1400"
            />
          </div>

          <div className="bg-gray-50 rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-700">Bilan du jour</span>
              <span className={`text-2xl font-black ${todayData.caloriesConsumed <= calorieGoals.target ? 'text-green-600' : 'text-red-600'}`}>
                {todayData.caloriesConsumed > 0 ? (todayData.caloriesConsumed - calorieGoals.target > 0 ? '+' : '') + (todayData.caloriesConsumed - calorieGoals.target) + ' cal' : '---'}
              </span>
            </div>
            {todayData.caloriesConsumed > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all ${todayData.caloriesConsumed <= calorieGoals.target ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{width: `${Math.min((todayData.caloriesConsumed / calorieGoals.target) * 100, 100)}%`}}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-black text-gray-900 mb-4">💡 Conseils anti-craquage</h3>
        <div className="space-y-3">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <p className="text-sm font-semibold text-gray-900">🧠 Quand tu as des problèmes :</p>
            <p className="text-xs text-gray-600 mt-1">Écris ce que tu ressens, fais 10 minutes de marche, ou appelle une amie</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-xl">
            <p className="text-sm font-semibold text-gray-900">🤧 Si tu tombes malade :</p>
            <p className="text-xs text-gray-600 mt-1">Passe en mode maintenance (pas de déficit), repose-toi, et reprends doucement</p>
          </div>
          <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-xl">
            <p className="text-sm font-semibold text-gray-900">🍪 Envie de grignoter l'après-midi ?</p>
            <p className="text-xs text-gray-600 mt-1">Prévois des goûters sains dans ton budget calorique (fruits, yaourt protéiné)</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ProgressView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
        <h2 className="text-3xl font-black mb-2">📈 MA PROGRESSION</h2>
        <p className="text-purple-100 font-semibold">De 91cm à 75cm déjà... Continue ! 💪</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-pink-100 p-3 rounded-xl">
              <Scale className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h4 className="font-black text-gray-900">Poids</h4>
              <p className="text-xs text-gray-500">Objectif 2 semaines</p>
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-2">{profile.currentWeight} kg</div>
          <div className="flex items-center gap-2 text-sm mb-3">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-bold">-{59 - profile.currentWeight}kg</span>
            <span className="text-gray-500">/ -4kg</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all" style={{width: `${((59 - profile.currentWeight) / 4) * 100}%`}}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-black text-gray-900">Tour de taille</h4>
              <p className="text-xs text-gray-500">Objectif 2 semaines</p>
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-2">{profile.currentWaist} cm</div>
          <div className="flex items-center gap-2 text-sm mb-3">
            <TrendingDown className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-bold">-{75 - profile.currentWaist}cm</span>
            <span className="text-gray-500">/ -5cm</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full transition-all" style={{width: `${((75 - profile.currentWaist) / 5) * 100}%`}}></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-black text-gray-900 mb-4">🎉 Déjà accompli</h3>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-4xl font-black text-green-600 mb-1">-16cm</div>
              <p className="text-sm text-gray-600 font-semibold">de 91cm à 75cm</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-600 mb-1">-2.5kg</div>
              <p className="text-sm text-gray-600 font-semibold">en novembre</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-lg font-black text-gray-900">🏆 Tu as la preuve que ça marche !</p>
            <p className="text-sm text-gray-600 mt-1">Il suffit de recommencer ce qui a fonctionné</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-black text-gray-900 mb-4">📊 Données synchronisées</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Montre Xiaomi</p>
                <p className="text-xs text-gray-500">Pas, calories brûlées, sommeil</p>
              </div>
            </div>
            <div className="bg-green-500 w-3 h-3 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Scale className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Balance Sydonia</p>
                <p className="text-xs text-gray-500">Poids quotidien</p>
              </div>
            </div>
            <div className="bg-green-500 w-3 h-3 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-pink-500">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">MA TRANSFORMATION</h1>
              <p className="text-sm text-gray-600 font-semibold mt-1">Destination: 55kg & 70cm 🎯</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-black text-pink-600">{streak}</div>
                <div className="text-xs text-gray-500 font-bold">jours 🔥</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-purple-600">{totalPoints}</div>
                <div className="text-xs text-gray-500 font-bold">points ⭐</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="bg-white rounded-2xl shadow-md p-2 flex gap-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            🏠 Accueil
          </button>
          <button 
            onClick={() => setActiveTab('progress')}
            className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all ${activeTab === 'progress' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            📈 Progrès
          </button>
          <button 
            onClick={() => setActiveTab('nutrition')}
            className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all ${activeTab === 'nutrition' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            🥗 Nutrition
          </button>
          <button 
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all ${activeTab === 'badges' ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            🏆 Victoires
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'progress' && <ProgressView />}
        {activeTab === 'nutrition' && <NutritionView />}
        {activeTab === 'badges' && <BadgesView />}
      </div>

      {/* Célébration popup */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-6 rounded-3xl shadow-2xl animate-bounce">
            <p className="text-2xl font-black text-center">{celebrationMessage}</p>
          </div>
        </div>
      )}

      {/* Message motivant flottant */}
      <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-4 max-w-xs border-2 border-pink-300 animate-pulse">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-pink-500 flex-shrink-0" />
          <p className="text-sm font-bold text-gray-900">Le regard ébahi de ton copain t'attend au bout du chemin ! 😍✨</p>
        </div>
      </div>
    </div>
  );
};

export default MaTransformationApp;