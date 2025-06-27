// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4fdMT_GnEXk4hoAFLcfG4qcBHH6k7scI",
  authDomain: "voiceline-app.firebaseapp.com",
  projectId: "voiceline-app",
  storageBucket: "voiceline-app.firebasestorage.app",
  messagingSenderId: "12122109640",
  appId: "1:12122109640:web:dea72986bc570fa1ab17fd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// src/components/ui/index.js
import React from 'react';

export const Input = ({ ...props }) => (
  <input
    className="border p-2 rounded w-full"
    {...props}
  />
);

export const Button = ({ children, ...props }) => (
  <button
    className="text-white px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
    {...props}
  >
    {children}
  </button>
);

// App.js remains unchanged below

import React, { useState } from 'react';
import { collection, getDocs, deleteDoc, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Input, Button } from './components/ui';

function App() {
  // VoiceLine Web App – Fully Managed Dashboard with Edit, Delete, Filter, Export for Users, Clients, and Calls

  const [editingClientId, setEditingClientId] = useState(null);
  const [editClientForm, setEditClientForm] = useState({});
  const [editingCallId, setEditingCallId] = useState(null);
  const [editCallForm, setEditCallForm] = useState({});
  const [newUser, setNewUser] = useState({});
  const [newClient, setNewClient] = useState({});
  const [newCall, setNewCall] = useState({});
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState({});

  const deleteClient = async (email) => {
    const snapshot = await getDocs(collection(db, "clients"));
    snapshot.forEach(async (docSnap) => {
      if (docSnap.data().email === email) {
        await deleteDoc(doc(db, "clients", docSnap.id));
      }
    });
  };

  const startClientEdit = (client, id) => {
    setEditingClientId(id);
    setEditClientForm(client);
  };

  const saveClientEdit = async () => {
    const snapshot = await getDocs(collection(db, "clients"));
    snapshot.forEach(async (docSnap) => {
      if (docSnap.data().email === editingClientId) {
        await setDoc(doc(db, "clients", docSnap.id), editClientForm);
      }
    });
    setEditingClientId(null);
  };

  const deleteCall = async (id) => {
    const snapshot = await getDocs(collection(db, "calls"));
    snapshot.forEach(async (docSnap) => {
      if (docSnap.id === id) {
        await deleteDoc(doc(db, "calls", docSnap.id));
      }
    });
  };

  const startCallEdit = (call, id) => {
    setEditingCallId(id);
    setEditCallForm(call);
  };

  const saveCallEdit = async () => {
    const snapshot = await getDocs(collection(db, "calls"));
    snapshot.forEach(async (docSnap) => {
      if (docSnap.id === editingCallId) {
        await setDoc(doc(db, "calls", docSnap.id), editCallForm);
      }
    });
    setEditingCallId(null);
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  const startUserEdit = (user, id) => {
    setEditingUserId(id);
    setEditUserForm(user);
  };

  const saveUserEdit = async () => {
    await setDoc(doc(db, "users", editingUserId), editUserForm);
    setEditingUserId(null);
  };

  const addNewUser = async () => {
    await addDoc(collection(db, "users"), newUser);
    setNewUser({});
  };

  const addNewClient = async () => {
    await addDoc(collection(db, "clients"), newClient);
    setNewClient({});
  };

  const addNewCall = async () => {
    await addDoc(collection(db, "calls"), newCall);
    setNewCall({});
  };

  return (
    <>
      <h3 className="text-lg font-semibold mt-8">Add New User</h3>
      <div className="mb-6 flex gap-2">
        <Input placeholder="Name" value={newUser.name || ''} onChange={e => setNewUser(p => ({...p, name: e.target.value}))} />
        <Input placeholder="Email" value={newUser.email || ''} onChange={e => setNewUser(p => ({...p, email: e.target.value}))} />
        <Button onClick={addNewUser}>Add</Button>
      </div>

      <h3 className="text-lg font-semibold">Add New Client</h3>
      <div className="mb-6 flex gap-2">
        <Input placeholder="Name" value={newClient.name || ''} onChange={e => setNewClient(p => ({...p, name: e.target.value}))} />
        <Input placeholder="Email" value={newClient.email || ''} onChange={e => setNewClient(p => ({...p, email: e.target.value}))} />
        <Button onClick={addNewClient}>Add</Button>
      </div>

      <h3 className="text-lg font-semibold">Add New Call</h3>
      <div className="mb-6 flex gap-2">
        <Input placeholder="Date" value={newCall.date || ''} onChange={e => setNewCall(p => ({...p, date: e.target.value}))} />
        <Input placeholder="Duration" value={newCall.duration || ''} onChange={e => setNewCall(p => ({...p, duration: e.target.value}))} />
        <Input placeholder="Interpreter" value={newCall.interpreter || ''} onChange={e => setNewCall(p => ({...p, interpreter: e.target.value}))} />
        <Button onClick={addNewCall}>Add</Button>
      </div>
    </>
  );
}

export default App;
