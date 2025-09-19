import { useState } from 'react';

export default function LeadDetailPanel({ lead, onClose, onSave, children }) {
  const [editedLead, setEditedLead] = useState(lead || {});
  const [error, setError] = useState(null);

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedLead.email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError(null);
    onSave(editedLead);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-2 sm:p-4 rounded-lg w-full max-w-md sm:max-w-lg mx-2">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Lead Details</h2>
        <div className="space-y-2 sm:space-y-4">
          <p><strong>ID:</strong> {editedLead.id}</p>
          <p><strong>Name:</strong> {editedLead.name}</p>
          <p><strong>Company:</strong> {editedLead.company}</p>
          <div>
            <label className="block text-sm sm:text-base">Email:</label>
            <input
              type="email"
              value={editedLead.email || ''}
              onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
              className="w-full p-1 sm:p-2 border rounded text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base">Status:</label>
            <select
              value={editedLead.status || 'New'}
              onChange={(e) => setEditedLead({ ...editedLead, status: e.target.value })}
              className="w-full p-1 sm:p-2 border rounded text-sm sm:text-base"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}
          <div className="flex justify-end gap-2 mt-2 sm:mt-4">
            <button onClick={onClose} className="p-1 sm:p-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm sm:text-base">
              Cancel
            </button>
            <button onClick={handleSave} className="p-1 sm:p-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base">
              Save
            </button>
          </div>
          {children && <div className="mt-2 sm:mt-4">{children}</div>}
        </div>
      </div>
    </div>
  );
}