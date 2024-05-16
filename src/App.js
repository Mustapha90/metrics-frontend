import React from 'react';
import MetricsViewer from './components/MetricsViewer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="bg-blue-600 w-full p-4">
        <h1 className="text-3xl font-bold text-white text-center">
          Metrics Dashboard
        </h1>
      </header>
      <main className="flex flex-col items-center mt-8 w-full px-4">
        <MetricsViewer />
      </main>
    </div>
  );
}

export default App;
