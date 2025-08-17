"use client";

import { useEffect, useState } from "react";

const DEFAULT_USER_ID = "demo-user";

export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMeals() {
    setLoading(true);
    const res = await fetch(`/api/meals?userId=${DEFAULT_USER_ID}`);
    const json = await res.json();
    setMeals(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchMeals();
  }, []);

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
    await fetchMeals();
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
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

      <main role="main" className="bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50 mx-auto max-w-5xl ml-60 px-4 py-6 space-y-6">
      <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
              <div className="flex items-center space-x-0 mb-5">
              <div>
                <h1 className="text-lg text-white font-semibold">Add Meals</h1>
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

        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
              <div className="flex items-center space-x-0 mb-5">
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
                      <p className="text-xs text-gray-600">
                        {new Date(m.date).toLocaleDateString()} • {m.calories} kcal • P{m.proteinGrams || 0} C{m.carbsGrams || 0} F{m.fatGrams || 0}
                      </p>
                    </div>
                    {m.notes && <p className="text-xs text-gray-500">{m.notes}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
