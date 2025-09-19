import { useState } from 'react';

export default function LeadDetailPanel({ lead, onClose, onSave }) {
  const [editedLead, setEditedLead] = useState({ ...lead });
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSave = () => {
    if (!validateEmail(editedLead.email)) {
      setError('Invalid email format');
      return;
    }
    onSave(editedLead);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Lead Details</h2>
        <div className="space-y-4">
          <p><strong>ID:</strong> {editedLead.id}</p>
          <p><strong>Name:</strong> {editedLead.name}</p>
          <p><strong>Company:</strong> {editedLead.company}</p>
          <div>
            <label className="block">Email:</label>
            <input
              type="email"
              value={editedLead.email}
              onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block">Status:</label>
            <select
              value={editedLead.status}
              onChange={(e) => setEditedLead({ ...editedLead, status: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
            </select>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Cancel
            </button>
            <button onClick={handleSave} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}