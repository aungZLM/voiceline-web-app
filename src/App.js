// VoiceLine Web App – Styled Like recruitment-engagement-app

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Temporary fallback components
const Card = ({ children, className = "" }) => <div className={`p-4 rounded-xl shadow bg-white ${className}`}>{children}</div>;
const CardContent = ({ children, className = "" }) => <div className={className}>{children}</div>;
const Button = ({ children, className = "", ...props }) => (
  <button className={`px-4 py-2 text-white rounded ${className}`} {...props}>{children}</button>
);
const Input = ({ className = "", ...props }) => <input className={`p-2 border rounded w-full ${className}`} {...props} />;
const Label = ({ children, htmlFor }) => <label htmlFor={htmlFor} className="block font-medium mb-1">{children}</label>;

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <Card className="w-full max-w-md shadow-xl p-6 bg-white rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-2 text-indigo-700">VoiceLine Portal</h1>
        <p className="text-sm text-center text-gray-600 mb-6">Login to manage your interpreter assignments</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required className="mt-1" />
          </div>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700" type="submit">Sign In</Button>
        </form>
        <p className="text-sm text-center mt-4">Don't have an account? <a href="/register" className="text-indigo-600 hover:underline">Create one</a></p>
      </Card>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Interpreter Management Dashboard</h2>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">Logout</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-white shadow rounded-xl"><CardContent className="p-4">Active Interpreters: 4</CardContent></Card>
        <Card className="bg-white shadow rounded-xl"><CardContent className="p-4">Pending Payments: 2</CardContent></Card>
        <Card className="bg-white shadow rounded-xl"><CardContent className="p-4">Unread Messages: 0</CardContent></Card>
        <Card className="bg-white shadow rounded-xl"><CardContent className="p-4">Today's Assignments: 0</CardContent></Card>
      </div>

      <h3 className="text-lg font-semibold mb-4 text-gray-700">Interpreter Profiles</h3>
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {["Maria Garcia", "Ahmed Ali", "Fatima Noor"].map((name, index) => (
          <Card key={index} className="bg-white shadow rounded-xl">
            <CardContent className="p-4">
              <p className="font-semibold">Name: <span className="text-gray-700">{name}</span></p>
              <p>Languages: English, Spanish</p>
              <p>Experience: {2 + index} years</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-2 text-gray-700">Upload Translation Document</h3>
      <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-3 max-w-lg">
        <Input type="file" disabled className="file:bg-indigo-600 file:text-white" />
        <Button disabled className="bg-indigo-400 cursor-not-allowed">Upload</Button>
        <p className="text-sm text-gray-500">(Upload disabled in demo version)</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
