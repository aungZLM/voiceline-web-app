// VoiceLine Web App – Fully Managed Dashboard with Edit, Delete, Filter, Export for Users, Clients, and Calls

// Existing imports and Dashboard setup remain unchanged above...

  const [editingClientId, setEditingClientId] = useState(null);
  const [editClientForm, setEditClientForm] = useState({});
  const [editingCallId, setEditingCallId] = useState(null);
  const [editCallForm, setEditCallForm] = useState({});

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

// Inside return(), below user table:

      <h3 className="text-lg font-semibold mt-8">Client Directory</h3>
      <table className="min-w-full table-auto border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c, i) => (
            <tr key={i} className="even:bg-gray-50">
              {editingClientId === c.email ? (
                <>
                  <td className="border px-2 py-1"><Input value={editClientForm.name} onChange={e => setEditClientForm(prev => ({ ...prev, name: e.target.value }))} /></td>
                  <td className="border px-2 py-1"><Input value={editClientForm.email} onChange={e => setEditClientForm(prev => ({ ...prev, email: e.target.value }))} /></td>
                  <td className="border px-2 py-1">
                    <Button onClick={saveClientEdit} className="bg-green-500 text-sm mr-1">Save</Button>
                    <Button onClick={() => setEditingClientId(null)} className="bg-gray-500 text-sm">Cancel</Button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border px-2 py-1">{c.name}</td>
                  <td className="border px-2 py-1">{c.email}</td>
                  <td className="border px-2 py-1">
                    <Button onClick={() => startClientEdit(c, c.email)} className="bg-yellow-500 text-sm mr-1">Edit</Button>
                    <Button onClick={() => deleteClient(c.email)} className="bg-red-500 text-sm">Delete</Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-lg font-semibold">Call History</h3>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Duration</th>
            <th className="border px-2 py-1">Interpreter</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((c, i) => (
            <tr key={i} className="even:bg-gray-50">
              {editingCallId === c.id ? (
                <>
                  <td className="border px-2 py-1"><Input value={editCallForm.date} onChange={e => setEditCallForm(prev => ({ ...prev, date: e.target.value }))} /></td>
                  <td className="border px-2 py-1"><Input value={editCallForm.duration} onChange={e => setEditCallForm(prev => ({ ...prev, duration: e.target.value }))} /></td>
                  <td className="border px-2 py-1"><Input value={editCallForm.interpreter} onChange={e => setEditCallForm(prev => ({ ...prev, interpreter: e.target.value }))} /></td>
                  <td className="border px-2 py-1">
                    <Button onClick={saveCallEdit} className="bg-green-500 text-sm mr-1">Save</Button>
                    <Button onClick={() => setEditingCallId(null)} className="bg-gray-500 text-sm">Cancel</Button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border px-2 py-1">{c.date}</td>
                  <td className="border px-2 py-1">{c.duration}</td>
                  <td className="border px-2 py-1">{c.interpreter}</td>
                  <td className="border px-2 py-1">
                    <Button onClick={() => startCallEdit(c, c.id)} className="bg-yellow-500 text-sm mr-1">Edit</Button>
                    <Button onClick={() => deleteCall(c.id)} className="bg-red-500 text-sm">Delete</Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
