import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { MockInterview } from './pages/MockInterview';
import { DailyTasks } from './pages/DailyTasks';
import { Feedback } from './pages/Feedback';
import { Journey } from './pages/Journey';
import { Register } from './pages/Auth/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/mock-interview" element={<Layout><MockInterview /></Layout>} />
        <Route path="/daily-tasks" element={<Layout><DailyTasks /></Layout>} />
        <Route path="/feedback" element={<Layout><Feedback /></Layout>} />
        <Route path="/journey" element={<Layout><Journey /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;