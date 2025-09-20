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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-4 sm:p-6 rounded-xl w-full max-w-md sm:max-w-lg mx-4 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Lead Details</h2>
        <div className="space-y-4">
          <p><strong className="text-gray-100">ID:</strong> {editedLead.id}</p>
          <p><strong className="text-gray-100">Name:</strong> {editedLead.name}</p>
          <p><strong className="text-gray-100">Company:</strong> {editedLead.company}</p>
          <div>
            <label className="block text-gray-300 text-sm sm:text-base font-medium">Email:</label>
            <input
              type="email"
              value={editedLead.email || ''}
              onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm sm:text-base font-medium">Status:</label>
            <select
              value={editedLead.status || 'New'}
              onChange={(e) => setEditedLead({ ...editedLead, status: e.target.value })}
              className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm sm:text-base"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
            </select>
          </div>
          {error && <p className="text-red-400 text-sm sm:text-base">{error}</p>}
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={onClose} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 text-sm sm:text-base shadow-md">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 text-sm sm:text-base shadow-md">
              Save
            </button>
          </div>
          {children && 
          <div className="mt-4">{children}</div>
          }
        </div>
      </div>
    </div>
  );
}