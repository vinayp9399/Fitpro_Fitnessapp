"use client";

export default function Home() {
  // Function to update carousel dots
  const updateDots = (activeIndex) => {
    for (let i = 0; i < 3; i++) {
      const dot = document.getElementById(`dot-${i}`);
      if (dot) {
        if (i === activeIndex) {
          dot.className = "w-3 h-3 bg-blue-500 rounded-full transition-colors";
        } else {
          dot.className = "w-3 h-3 bg-gray-300 rounded-full transition-colors hover:bg-gray-400";
        }
      }
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 fixed z-50 w-full">
        <div className="max-w-7xl px-2 py-2 ml-10 mr-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fitpro</h1>
              </div>
            </div>
            <nav className="flex space-x-6">
              <a href="/dashboard" className="text-sm text-white hover:font-bold flex items-center space-x-1 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Dashboard</span>
              </a>
              {/* <a href="/workouts" className="text-sm text-white hover:font-bold flex items-center space-x-1 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Workouts</span>
              </a>
              <a href="/meals" className="text-sm text-white hover:font-bold flex items-center space-x-1 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01M9 9h.01M15 9h.01" />
                </svg>
                <span>Meals</span>
              </a> */}
              <a href="/login" className="text-sm text-white hover:font-bold transition-colors">Login</a>
              <a href="/signup" className="text-sm text-white hover:font-bold transition-colors">Sign Up</a>
            </nav>
          </div>
        </div>
      </header>

      <main role="main" className="bg-gradient-to-br from-blue-900/95 via-purple-900/95 to-pink-900/95">
        {/* Hero Section */}
        <section className="relative text-center mb-16 overflow-hidden h-screen">
          {/* Background Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40 z-10"></div>
          <div className="absolute inset-0 h-150" style={{
            backgroundImage: `url("https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114137.jpg?semt=ais_hybrid&w=740&q=80")`
          }}></div>
          
          <div className="relative z-20 py-30 px-8">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Track Your Fitness Journey</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Monitor workouts, track nutrition, and achieve your health goals with our simple and intuitive fitness tracking app.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/signup" className="bg-white text-blue-600 px-8 py-3 text-lg font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg">Get Started Free</a>
              <a href="/dashboard" className="px-8 py-3 text-lg border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors">Try Demo</a>
            </div>
          </div>
        </section>

                        {/* Feature Carousel */}
                <section className="relative mb-16 overflow-hidden rounded-2xl">
                  {/* Background Pattern */}
                  
                  <div className="relative z-10 py-8 px-8">
                    <h3 className="text-2xl text-white font-semibold text-center mb-8">App Features Showcase</h3>
                    <div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="flex transition-transform duration-500 ease-in-out" id="carousel">
              <div className="w-full flex-shrink-0 p-8 md:p-12 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Smart Workout Tracking</h4>
                    <p className="text-[#46184a] mb-6">
                      Log your exercises with precision. Track duration, calories burned, and personal notes. 
                      View your workout history and progress over time.
                    </p>
                    <ul className="space-y-2 text-sm text-[#46184a]">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="green" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Multiple exercise types supported
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="green" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Calorie burn calculations
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="green" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Personal workout notes
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h5 className="font-semibold text-gray-900">Workout Dashboard</h5>
                      <p className="text-sm text-gray-600">Track your fitness progress</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex-shrink-0 p-8 md:p-12 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Nutrition & Macro Tracking</h4>
                    <p className="text-[#46184a] mb-6">
                      Monitor your daily nutrition intake with detailed macro tracking. 
                      Log meals, snacks, and beverages with comprehensive nutritional information.
                    </p>
                    <ul className="space-y-2 text-sm text-[#46184a]">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="green" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Calorie counting made simple
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="green" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Protein, carbs, and fat tracking
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="green" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Meal planning and notes
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01M9 9h.01M15 9h.01" />
                        </svg>
                      </div>
                      <h5 className="font-semibold text-gray-900">Nutrition Dashboard</h5>
                      <p className="text-sm text-gray-600">Track your daily intake</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex-shrink-0 p-8 md:p-12 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Progress Analytics</h4>
                    <p className="text-[#46184a] mb-6">
                      Visualize your fitness journey with interactive charts and graphs. 
                      Track weekly trends, set goals, and celebrate your achievements.
                    </p>
                    <ul className="space-y-2 text-sm text-[#46184a]">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="green" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Weekly progress charts
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="green" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Macro breakdown visualization
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="green" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Goal setting and tracking
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h5 className="font-semibold text-gray-900">Analytics Dashboard</h5>
                      <p className="text-sm text-gray-600">Visualize your progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carousel Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button 
                onClick={() => document.getElementById('carousel').style.transform = 'translateX(0)'}
                className="w-3 h-3 bg-blue-500 rounded-full transition-colors"
                id="dot-0"
              />
              <button 
                onClick={() => document.getElementById('carousel').style.transform = 'translateX(-100%)'}
                className="w-3 h-3 bg-gray-300 rounded-full transition-colors hover:bg-gray-400"
                id="dot-1"
              />
              <button 
                onClick={() => document.getElementById('carousel').style.transform = 'translateX(-200%)'}
                className="w-3 h-3 bg-gray-300 rounded-full transition-colors hover:bg-gray-400"
                id="dot-2"
              />
            </div>

            {/* Carousel Arrows */}
            <button 
              onClick={() => {
                const carousel = document.getElementById('carousel');
                const currentTransform = carousel.style.transform;
                if (currentTransform === 'translateX(-200%)' || currentTransform === '') {
                  carousel.style.transform = 'translateX(-100%)';
                  updateDots(1);
                } else if (currentTransform === 'translateX(-100%)') {
                  carousel.style.transform = 'translateX(0)';
                  updateDots(0);
                } else {
                  carousel.style.transform = 'translateX(-200%)';
                  updateDots(2);
                }
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => {
                const carousel = document.getElementById('carousel');
                const currentTransform = carousel.style.transform;
                if (currentTransform === '' || currentTransform === 'translateX(0)') {
                  carousel.style.transform = 'translateX(-100%)';
                  updateDots(1);
                } else if (currentTransform === 'translateX(-100%)') {
                  carousel.style.transform = 'translateX(-200%)';
                  updateDots(2);
                } else {
                  carousel.style.transform = 'translateX(0)';
                  updateDots(0);
                }
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative mb-16 overflow-hidden rounded-2xl bg-white ml-8 mr-8">
          {/* Background Pattern */}
          
          <div className="relative z-10 py-12 px-8 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
            <h3 className="text-2xl font-semibold text-center mb-12">Why Choose Our Fitness Tracker?</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-3">Easy Tracking</h4>
              <p className="text-[#46184a]">Log workouts and meals in seconds with our streamlined interface</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-3">Detailed Analytics</h4>
              <p className="text-[#46184a]">View calories, macros, and workout progress at a glance</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-3">Secure & Private</h4>
              <p className="text-[#46184a]">Your data is protected with secure authentication</p>
            </div>
          </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative mb-16 overflow-hidden rounded-2xl ml-8 mr-8 bg-white">
          {/* Background Pattern */}
          
          <div className="relative z-10 py-12 px-8 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
            <h3 className="text-2xl font-semibold text-center mb-12">How It Works</h3>
            <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center group">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">1</div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-200 rounded-full"></div>
              </div>
              <h4 className="text-lg font-semibold mb-3">Sign Up</h4>
              <p className="text-[#46184a]">Create your free account in under 2 minutes</p>
            </div>
            <div className="text-center group">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">2</div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-green-200 rounded-full"></div>
              </div>
              <h4 className="text-lg font-semibold mb-3">Start Tracking</h4>
              <p className="text-[#46184a]">Log your workouts and meals as you go</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">3</div>
              <h4 className="text-lg font-semibold mb-3">See Progress</h4>
              <p className="text-[#46184a]">Monitor your fitness journey with detailed insights</p>
            </div>
          </div>
          </div>
        </section>

        {/* App Features Section */}
        <section className="mb-16 px-8 py-8">
          <h3 className="text-2xl text-white font-semibold text-center mb-12">App Features</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Workout Tracking</h4>
                  <ul className="text-sm text-[#46184a] space-y-1">
                    <li>• Log exercise type and duration</li>
                    <li>• Track calories burned</li>
                    <li>• Add notes and personal records</li>
                    <li>• View workout history</li>
                  </ul>
                  {/* <a href="/workouts" className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700">Manage workouts →</a> */}
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01M9 9h.01M15 9h.01" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Nutrition Tracking</h4>
                  <ul className="text-sm text-[#46184a] space-y-1">
                    <li>• Record meals and snacks</li>
                    <li>• Track calories and macros</li>
                    <li>• Monitor protein, carbs, and fats</li>
                    <li>• Add custom notes</li>
                  </ul>
                  {/* <a href="/meals" className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700">Manage meals →</a> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="mb-16 px-8 py-8">
          <h3 className="text-2xl text-white font-semibold text-center mb-8">Dashboard Overview</h3>
          <div className="rounded-lg shadow bg-white p-8 text-center bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50">
            <h4 className="text-lg font-semibold mb-4">Your Personal Fitness Command Center</h4>
            <p className="text-[#46184a] mb-6">
              Get a complete view of your daily activity, nutrition intake, and progress trends all in one place.
            </p>
            <div className="grid gap-4 md:grid-cols-3 text-sm">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold text-blue-600">Daily Summary</div>
                <div className="text-gray-600">Calories, macros, and workout minutes</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold text-green-600">Quick Add</div>
                <div className="text-gray-600">Fast workout and meal logging</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold text-purple-600">Recent Activity</div>
                <div className="text-gray-600">Latest workouts and meals</div>
              </div>
            </div>
            <a href="/dashboard" className="mt-6 inline-block btn">Open Dashboard</a>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative text-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50"></div>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='cta' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='%233B82F6' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23cta)'/%3E%3C/svg%3E")`
          }}></div>
          
          <div className="relative z-10 py-12 px-8 bg-black">
            <h3 className="text-2xl text-white font-semibold mb-4">Ready to Start Your Fitness Journey?</h3>
            <p className="text-gray-300 mb-6">Join thousands of users who are already tracking their progress</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/signup" className="bg-white rounded px-8 py-3 text-lg">Create Free Account</a>
              <a href="/login" className="px-8 py-3 text-lg border border-white rounded-md text-white">Sign In</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
