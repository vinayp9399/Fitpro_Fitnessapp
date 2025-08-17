"use client";

import { useEffect, useMemo, useState } from "react";

const DEFAULT_USER_ID = "demo-user";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalCalories = useMemo(
    () => meals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0),
    [meals]
  );
  const totalWorkoutMinutes = useMemo(
    () => workouts.reduce((sum, w) => sum + (Number(w.durationMinutes) || 0), 0),
    [workouts]
  );

  // Calculate macro totals
  const totalProtein = useMemo(
    () => meals.reduce((sum, m) => sum + (Number(m.proteinGrams) || 0), 0),
    [meals]
  );
  const totalCarbs = useMemo(
    () => meals.reduce((sum, m) => sum + (Number(m.carbsGrams) || 0), 0),
    [meals]
  );
  const totalFat = useMemo(
    () => meals.reduce((sum, m) => sum + (Number(m.fatGrams) || 0), 0),
    [meals]
  );

  // Prepare chart data
  const weeklyWorkoutData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayWorkouts = workouts.filter(w => w.date === date);
      const totalMinutes = dayWorkouts.reduce((sum, w) => sum + (Number(w.durationMinutes) || 0), 0);
      const totalCaloriesBurned = dayWorkouts.reduce((sum, w) => sum + (Number(w.caloriesBurned) || 0), 0);
      
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        minutes: totalMinutes,
        caloriesBurned: totalCaloriesBurned
      };
    });
  }, [workouts]);

  const weeklyCalorieData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayMeals = meals.filter(m => m.date === date);
      const totalCalories = dayMeals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0);
      
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        calories: totalCalories
      };
    });
  }, [meals]);

  const macroBreakdown = useMemo(() => {
    const totalMacros = totalProtein + totalCarbs + totalFat;
    if (totalMacros === 0) return [];
    
    return [
      { name: 'Protein', value: totalProtein, color: '#3B82F6', percentage: Math.round((totalProtein / totalMacros) * 100) },
      { name: 'Carbs', value: totalCarbs, color: '#10B981', percentage: Math.round((totalCarbs / totalMacros) * 100) },
      { name: 'Fat', value: totalFat, color: '#F59E0B', percentage: Math.round((totalFat / totalMacros) * 100) }
    ];
  }, [totalProtein, totalCarbs, totalFat]);

  // Workout type breakdown
  const workoutTypeBreakdown = useMemo(() => {
    const typeCounts = {};
    workouts.forEach(workout => {
      const type = workout.type || 'Other';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    return Object.entries(typeCounts).map(([type, count], index) => ({
      type,
      count,
      color: colors[index % colors.length],
      percentage: Math.round((count / workouts.length) * 100) || 0
    }));
  }, [workouts]);

  async function fetchData() {
    setLoading(true);
    const [wRes, mRes] = await Promise.all([
      fetch(`/api/workouts?userId=${DEFAULT_USER_ID}`),
      fetch(`/api/meals?userId=${DEFAULT_USER_ID}`),
    ]);
    const [wJson, mJson] = await Promise.all([wRes.json(), mRes.json()]);
    setWorkouts(wJson);
    setMeals(mJson);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleAddWorkout(formData) {
    const payload = {
      userId: DEFAULT_USER_ID,
      date: formData.get("date"),
      type: formData.get("type"),
      durationMinutes: Number(formData.get("durationMinutes")),
      caloriesBurned: Number(formData.get("caloriesBurned")) || 0,
      notes: formData.get("notes") || "",
    };
    await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await fetchData();
  }

  async function handleAddMeal(formData) {
    const payload = {
      userId: DEFAULT_USER_ID,
      date: formData.get("date"),
      name: formData.get("name"),
      calories: Number(formData.get("calories")),
      proteinGrams: Number(formData.get("proteinGrams")) || 0,
      carbsGrams: Number(formData.get("carbsGrams")) || 0,
      fatGrams: Number(formData.get("fatGrams")) || 0,
      notes: formData.get("notes") || "",
    };
    await fetch("/api/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    await fetchData();
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <header className="min-h-screen fixed border-b bg-white w-60 bg-gradient-to-br from-blue-900/100 via-purple-900/100 to-pink-900/100">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div>
            <div className="flex items-center gap-4 space-x-3">
              <div className="w-15 h-15 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                </svg>
              </div>
              <div>
                <h1 className="text-2xl text-white font-semibold">Vinay</h1>
              </div>
            </div>
            <nav className="mt-10">
              <a href="/dashboard" className="pl-10 text-lg/10 text-gray-200 hover:bg-gray-900 flex items-center space-x-3 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </a>
              <a href="/workouts" className="pl-10 text-lg/10 text-gray-200 hover:bg-gray-900 flex items-center space-x-3 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Workouts</span>
              </a>
              <a href="/meals" className="pl-10 text-lg/10 text-gray-200 hover:bg-gray-900 flex items-center space-x-3 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01M9 9h.01M15 9h.01" />
                </svg>
                <span>Meals</span>
              </a>
              <a href="/" className="pl-10 text-lg/10 text-gray-200 hover:bg-gray-900 flex items-center space-x-3 rounded">Log Out</a>
            </nav>
            <div className="flex items-center space-x-3 justify-center mt-50">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl text-white font-semibold">Fitpro</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main role="main" className="bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50 mx-auto grid max-w-5xl gap-6 px-4 py-6 ml-60 md:grid-cols-3">
        <section className="md:col-span-2 space-y-6">
          {/* <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-pink-900/60">
              <div className="flex items-center gap-4 space-x-0 mb-5">
              <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg text-white font-semibold">Add Workout</h1>
              </div>
            </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  await handleAddWorkout(fd);
                  e.currentTarget.reset();
                }}
                className="grid gap-3"
              >
                <input className="input" name="date" type="date" required />
                <input className="input" name="type" placeholder="Type (e.g., Run)" required />
                <div className="grid grid-cols-2 gap-3">
                  <input className="input" name="durationMinutes" type="number" min="0" placeholder="Minutes" required />
                  <input className="input" name="caloriesBurned" type="number" min="0" placeholder="Calories burned" />
                </div>
                <textarea className="input" name="notes" placeholder="Notes" rows={2} />
                <button type="submit" className="btn">Save Workout</button>
              </form>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-pink-900/60">
              <div className="flex items-center gap-4 space-x-0 mb-5">
              <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01M9 9h.01M15 9h.01" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg text-white font-semibold">Add Meal</h1>
              </div>
            </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  await handleAddMeal(fd);
                  e.currentTarget.reset();
                }}
                className="grid gap-3"
              >
                <input className="input" name="date" type="date" required />
                <input className="input" name="name" placeholder="Meal name" required />
                <div className="grid grid-cols-2 gap-3">
                  <input className="input" name="calories" type="number" min="0" placeholder="Calories" required />
                  <input className="input" name="proteinGrams" type="number" min="0" placeholder="Protein (g)" />
                  <input className="input" name="carbsGrams" type="number" min="0" placeholder="Carbs (g)" />
                  <input className="input" name="fatGrams" type="number" min="0" placeholder="Fat (g)" />
                </div>
                <textarea className="input" name="notes" placeholder="Notes" rows={2} />
                <button type="submit" className="btn">Save Meal</button>
              </form>
            </div>
          </div> */}

          {/* Charts Section */}
          <div className="grid gap-6 md:grid-cols-2">

          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
              <div className="flex items-center gap-4 space-x-0 mb-5">
              <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg text-white font-semibold">Weekly Workout Minutes</h1>
              </div>
            </div>
              <div className="h-48 flex items-end justify-between space-x-2">
                {weeklyWorkoutData.map((day, index) => (
                  <div key={day.date} className="flex flex-col items-center space-y-2">
                    <div className="text-xs text-white">{day.date}</div>
                    <div
                      className="w-8 bg-blue-500 rounded-t"
                      style={{
                        height: `${Math.max((day.minutes / 60) * 100, 8)}px`
                      }}
                      title={`${day.minutes} minutes`}
                    />
                    <div className="text-xs text-white">{day.minutes}m</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
              <div className="flex items-center gap-4 space-x-0 mb-5">
              <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg text-white font-semibold">Weekly Calories</h1>
              </div>
            </div>
            
              <div className="h-48 flex items-end justify-between space-x-2">
                {weeklyCalorieData.map((day, index) => (
                  <div key={day.date} className="flex flex-col items-center space-y-2">
                    <div className="text-xs text-white">{day.date}</div>
                    <div
                      className="w-8 bg-green-500 rounded-t"
                      style={{
                        height: `${Math.max((day.calories / 2000) * 100, 8)}px`
                      }}
                      title={`${day.calories} calories`}
                    />
                    <div className="text-xs text-white">{day.calories}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
              <div className="flex items-center gap-4 space-x-0 mb-5">
              <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg text-white font-semibold">Recent Workouts</h1>
              </div>
            </div>
         
            {loading ? (
              <p className="text-sm text-white">Loading...</p>
            ) : workouts.length === 0 ? (
              <p className="text-sm text-white">No workouts yet.</p>
            ) : (
              <ul className="divide-y">
                {workouts.map((w) => (
                  <li key={w._id} className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{w.type}</p>
                        <p className="text-xs text-white">
                          {new Date(w.date).toLocaleDateString()} • {w.durationMinutes} min • {w.caloriesBurned || 0} kcal
                        </p>
                      </div>
                      {w.notes && <p className="text-xs text-white">{w.notes}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
              <div className="flex items-center gap-4 space-x-0 mb-5">
              <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01M9 9h.01M15 9h.01" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg text-white font-semibold">Recent Meals</h1>
              </div>
            </div>
          
            {loading ? (
              <p className="text-sm text-white">Loading...</p>
            ) : meals.length === 0 ? (
              <p className="text-sm text-white">No meals yet.</p>
            ) : (
              <ul className="divide-y">
                {meals.map((m) => (
                  <li key={m._id} className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{m.name}</p>
                        <p className="text-xs text-white">
                          {new Date(m.date).toLocaleDateString()} • {m.calories} kcal • P{m.proteinGrams || 0} C{m.carbsGrams || 0} F{m.fatGrams || 0}
                        </p>
                      </div>
                      {m.notes && <p className="text-xs text-white">{m.notes}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <aside className="space-y-6">

        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
              <div className="flex items-center gap-4 space-x-0 mb-5">
              <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg text-white font-semibold">Today's Summary</h1>
              </div>
            </div>
          
            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white">Total calories</span>
                <span className="font-semibold text-white">{totalCalories}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Workout minutes</span>
                <span className="font-semibold text-white">{totalWorkoutMinutes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Protein</span>
                <span className="font-semibold text-white">{totalProtein}g</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Carbs</span>
                <span className="font-semibold text-white">{totalCarbs}g</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Fat</span>
                <span className="font-semibold text-white">{totalFat}g</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
              <div className="flex items-center gap-4 space-x-0 mb-5">
              <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01M9 9h.01M15 9h.01" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg text-white font-semibold">Macro Breakdown</h1>
              </div>
            </div>
          
            <div className="space-y-3">
              {macroBreakdown.map((macro) => (
                <div key={macro.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{macro.name}</span>
                    <span className="font-medium">{macro.value}g ({macro.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${macro.percentage}%`,
                        backgroundColor: macro.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
              <div className="flex items-center gap-4 space-x-0 mb-5">
              <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg text-white font-semibold">Workout Types</h1>
              </div>
            </div>
          
            <div className="space-y-3">
              {workoutTypeBreakdown.length > 0 ? (
                workoutTypeBreakdown.map((workout) => (
                  <div key={workout.type} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{workout.type}</span>
                      <span className="font-medium">{workout.count} ({workout.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${workout.percentage}%`,
                          backgroundColor: workout.color
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white text-center py-4">No workouts yet</p>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function Card({ title, children, icon }) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-3 mb-4">
        {icon && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}
