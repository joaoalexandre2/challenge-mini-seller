import { useState, useEffect } from 'react';

export default function LeadsList({ onSelectLead, onLeadsLoaded }) {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true);
      try {
        console.log('Tentando carregar leads de:', '/src/data/leads.json'); // Log do caminho
        const response = await fetch('/src/data/leads.json'); // Caminho relativo ao root
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('Leads carregados com sucesso:', data); // Log dos dados
        setLeads(data);
        if (onLeadsLoaded) onLeadsLoaded(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Erro ao carregar leads:', err.message); // Log do erro específico
        setError('Failed to load leads');
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [onLeadsLoaded]);

  // Persistência em localStorage (restaura filtro e ordenação)
  useEffect(() => {
    const savedFilter = localStorage.getItem('filterStatus');
    const savedSort = localStorage.getItem('sortDirection');
    if (savedFilter) setFilterStatus(savedFilter);
    if (savedSort) setSortDirection(savedSort);
  }, []);

  useEffect(() => {
    localStorage.setItem('filterStatus', filterStatus);
    localStorage.setItem('sortDirection', sortDirection);
  }, [filterStatus, sortDirection]);

  const filteredLeads = leads
    .filter(lead =>
      (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       lead.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === 'All' || lead.status === filterStatus)
    )
    .sort((a, b) => sortDirection === 'desc' ? b.score - a.score : a.score - b.score);

  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (filteredLeads.length === 0) return <div className="text-center py-4">No leads found</div>;

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name/company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/3"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/3"
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
        </select>
        <button
          onClick={() => setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sort by Score ({sortDirection === 'desc' ? '↓' : '↑'})
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredLeads.map(lead => (
          <div
            key={lead.id}
            onClick={() => onSelectLead(lead)}
            className="cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="font-bold">{lead.name}</h3>
            <p>{lead.company}</p>
            <p className="text-gray-600">Score: {lead.score}</p>
            <p className="text-sm text-gray-500">Status: {lead.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}