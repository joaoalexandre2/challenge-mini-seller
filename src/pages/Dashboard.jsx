import { useState } from 'react';
import LeadsList from '../components/LeadsList';
import LeadDetailPanel from '../components/LeadDetailPanel';
import OpportunitiesTable from '../components/OpportunitiesTable';

export default function Dashboard() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  const handleSelectLead = (lead) => setSelectedLead(lead);
  const handleClosePanel = () => setSelectedLead(null);
  const handleSaveLead = (updatedLead) => {
    setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
  };

  const handleConvertLead = (lead) => {
    const newOpportunity = {
      id: Date.now(),
      name: lead.name,
      stage: 'Prospect',
      amount: null,
      accountName: lead.company,
    };
    setOpportunities([...opportunities, newOpportunity]);
    setLeads(leads.filter(l => l.id !== lead.id));
    setSelectedLead(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <LeadsList onSelectLead={handleSelectLead} />
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={handleClosePanel}
          onSave={handleSaveLead}
        >
          <button
            onClick={() => handleConvertLead(selectedLead)}
            className="mt-4 p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Convert to Opportunity
          </button>
        </LeadDetailPanel>
      )}
      <OpportunitiesTable opportunities={opportunities} />
    </div>
  );
}