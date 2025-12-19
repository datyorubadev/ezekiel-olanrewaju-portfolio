import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { AllProjects } from './pages/AllProjects';

import { ChatWidget } from './components/ChatWidget';
import { BackgroundMusic } from './components/BackgroundMusic';
import { Preloader } from './components/Preloader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
      <ChatWidget />
      <BackgroundMusic />
      <Preloader />
    </Router>
  );
}

export default App;
