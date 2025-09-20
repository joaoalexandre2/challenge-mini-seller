import { useState } from 'react';
import LeadsList from '../components/LeadsList';
import LeadDetailPanel from '../components/LeadDetailPanel';
import OpportunitiesTable from '../components/OpportunitiesTable';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleLeadsLoaded = (loadedLeads) => {
    setLeads(loadedLeads);
  };

  const handleSelectLead = (lead) => {
    setSelectedLead(lead);
  };

  const handleClosePanel = () => {
    setSelectedLead(null);
  };

  const handleSaveLead = (updatedLead) => {
    setLeads(prevLeads =>
      prevLeads.map(lead => lead.id === updatedLead.id ? updatedLead : lead)
    );
    setSelectedLead(null);
  };

  const handleConvertLead = (lead) => {
   
    const optimisticLeads = leads.filter(l => l.id !== lead.id);
    setLeads(optimisticLeads);
    const newOpportunity = {
      id: Date.now(),
      name: lead.name,
      stage: 'Prospect',
      amount: null,
      accountName: lead.company,
    };
    setOpportunities(prev => [...prev, newOpportunity]);
    setSelectedLead(null);

  
    setTimeout(() => {
      const success = Math.random() > 0.2; 
      if (!success) {
   
        setLeads(prev => [...prev, lead]);
        setOpportunities(prev => prev.filter(o => o.id !== newOpportunity.id));
        alert('Conversion failed. Please try again.');
      }
    }, 1500); 
  };

  return (
    <div className="p-4">
      <LeadsList onSelectLead={handleSelectLead} onLeadsLoaded={handleLeadsLoaded} />
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={handleClosePanel}
          onSave={handleSaveLead}
        >
          <button
            onClick={() => handleConvertLead(selectedLead)}
            className="mt-4 w-full sm:w-auto p-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm sm:text-base"
          >
            Convert to Opportunity
          </button>
        </LeadDetailPanel>
      )}
      <OpportunitiesTable opps={opportunities} />
    </div>
  );
}