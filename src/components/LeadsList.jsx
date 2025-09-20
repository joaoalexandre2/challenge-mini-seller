// import { useState, useEffect, useMemo } from "react";
// import debounce from "lodash/debounce";
// import { Linkedin, Github } from "lucide-react"; // Social icons
// import LeadDetailPanel from "./LeadDetailPanel"; // Import the panel
// import leadsData from "../data/leads.json"; // Direct import from src/data/

// export default function LeadsList({ onSelectLead, onLeadsLoaded }) {
//   const [leads, setLeads] = useState([]);
//   const [opportunities, setOpportunities] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [sortDirection, setSortDirection] = useState("desc");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [visibleLeadsCount, setVisibleLeadsCount] = useState(20);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [editedValues, setEditedValues] = useState({
//     value: 0,
//     accountName: "",
//   });

//   const debouncedSetSearchTerm = useMemo(
//     () => debounce((value) => setSearchTerm(value), 300),
//     []
//   );

//   useEffect(() => {
//     const loadLeads = async () => {
//       setIsLoading(true);
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 500));
//         if (!leadsData || leadsData.length === 0) {
//           throw new Error("No leads data available");
//         }
//         setLeads(leadsData);
//         if (onLeadsLoaded) onLeadsLoaded(leadsData);
//         setIsLoading(false);
//       } catch (err) {
//         console.error("Error loading leads:", err);
//         setError("Failed to load leads.");
//         setIsLoading(false);
//       }
//     };
//     loadLeads();
//   }, [onLeadsLoaded]);

//   useEffect(() => {
//     const savedFilter = localStorage.getItem("filterStatus");
//     const savedSort = localStorage.getItem("sortDirection");
//     const savedSearch = localStorage.getItem("searchTerm");
//     if (savedFilter) setFilterStatus(savedFilter);
//     if (savedSort) setSortDirection(savedSort);
//     if (savedSearch) setSearchTerm(savedSearch);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("filterStatus", filterStatus);
//     localStorage.setItem("sortDirection", sortDirection);
//     localStorage.setItem("searchTerm", searchTerm);
//   }, [filterStatus, sortDirection, searchTerm]);

//   const filteredLeads = useMemo(() => {
//     return leads
//       .filter(
//         (lead) =>
//           (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             lead.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
//           (filterStatus === "All" || lead.status === filterStatus)
//       )
//       .sort((a, b) =>
//         sortDirection === "desc" ? b.score - a.score : a.score - b.score
//       );
//   }, [leads, searchTerm, filterStatus, sortDirection]);

//   const resetFilters = () => {
//     setSearchTerm("");
//     setFilterStatus("All");
//     setSortDirection("desc");
//     localStorage.removeItem("searchTerm");
//     localStorage.removeItem("filterStatus");
//     localStorage.removeItem("sortDirection");
//     setVisibleLeadsCount(20);
//   };

//   const handleConvertLead = (leadId) => {
//     const lead = leads.find((l) => l.id === leadId);
//     if (!lead) return;
//     setSelectedLead(lead);
//     setEditedValues({
//       value: lead.value || 0,
//       accountName: lead.company || "N/A",
//     });
//     setIsModalOpen(true);
//   };

//   const handleSaveOpportunity = (editedLead) => {
//     const newOpportunity = {
//       id: `opp-${Date.now()}-${editedLead.id}`,
//       name: editedLead.name,
//       status: editedLead.status,
//       value: editedValues.value || 0,
//       accountName: editedValues.accountName || "N/A",
//     };
//     setOpportunities((prev) => [...prev, newOpportunity]);
//     setLeads((prevLeads) => prevLeads.filter((l) => l.id !== editedLead.id));
//     setIsModalOpen(false);
//     setSelectedLead(null);
//     setEditedValues({ value: 0, accountName: "" });
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//       if (
//         scrollHeight - scrollTop - clientHeight < 100 &&
//         visibleLeadsCount < filteredLeads.length
//       ) {
//         setIsLoading(true);
//         setTimeout(() => {
//           setVisibleLeadsCount((prev) =>
//             Math.min(prev + 20, filteredLeads.length)
//           );
//           setIsLoading(false);
//         }, 300);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [visibleLeadsCount, filteredLeads.length]);

//   if (isLoading && leads.length === 0) {
//     return (
//       <div className="text-center py-8 bg-white min-h-screen flex items-center justify-center transition-opacity duration-300 opacity-100">
//         <div className="text-gray-900 text-xl font-semibold">Loading...</div>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="text-center py-8 bg-white min-h-screen flex items-center justify-center transition-opacity duration-300 opacity-100">
//         <div className="text-red-600 text-xl font-semibold">{error}</div>
//       </div>
//     );
//   }
//   if (filteredLeads.length === 0) {
//     return (
//       <div className="text-center py-8 bg-white min-h-screen flex items-center justify-center transition-opacity duration-300 opacity-100">
//         <div className="text-gray-900 text-xl font-semibold mb-4">
//           No leads found
//         </div>
//         <button
//           onClick={resetFilters}
//           className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
//         >
//           Reset Filters
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Main content */}
//       <div className="px-2 sm:px-6 py-4 sm:py-6 bg-gray-50 w-[calc(100vw-50px)] max-w-none transition-opacity duration-300 opacity-100 flex-1">
//         {/* Sticky top bar */}
//         <div className="sticky top-0 z-40 bg-gray-50 mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2 sm:gap-4 p-2">
//           <div className="relative w-full sm:w-auto">
//             <input
//               type="text"
//               placeholder="Search by name/company..."
//               onChange={(e) => debouncedSetSearchTerm(e.target.value)}
//               value={searchTerm}
//               className="p-4 sm:p-5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base w-full min-w-[250px]"
//             />
//           </div>
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="p-2 sm:p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base w-full sm:w-auto"
//           >
//             <option value="All">All Statuses</option>
//             <option value="New">New</option>
//             <option value="Contacted">Contacted</option>
//             <option value="Qualified">Qualified</option>
//           </select>
//           <button
//             onClick={() =>
//               setSortDirection(sortDirection === "desc" ? "asc" : "desc")
//             }
//             className="p-2 sm:p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base shadow-md w-full sm:w-auto"
//           >
//             Sort by Score ({sortDirection === "desc" ? "↓" : "↑"})
//           </button>
//           <button
//             onClick={resetFilters}
//             className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base w-full sm:w-auto"
//           >
//             Reset Filters
//           </button>
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base w-full sm:w-auto"
//           >
//             Opportunities
//           </button>
//         </div>

//         {/* Leads grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 sm:gap-2 w-full">
//           {filteredLeads.slice(0, visibleLeadsCount).map((lead) => (
//             <div
//               key={lead.id}
//               className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 flex flex-col items-center"
//               onClick={() => onSelectLead(lead)}
//             >
//               <h3 className="font-bold text-sm sm:text-lg text-gray-900 mb-1 line-clamp-1 text-center">
//                 {lead.name}
//               </h3>
//               <p className="text-gray-600 text-xs sm:text-sm mb-1 line-clamp-1 text-center">
//                 {lead.company}
//               </p>
//               <p className="text-gray-900 text-xs sm:text-sm mb-2 text-center">
//                 Score: {lead.score}
//               </p>
//               <p className="text-gray-500 text-xs sm:text-sm mb-3 line-clamp-1 text-center">
//                 Status: {lead.status}
//               </p>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleConvertLead(lead.id);
//                 }}
//                 className="w-full py-1 sm:py-2 bg-[#064E3B] text-white rounded-md hover:bg-[#0A6F4E] transition-all duration-200 text-xs sm:text-sm font-medium text-center"
//               >
//                 Convert to Opportunity
//               </button>
//             </div>
//           ))}
//         </div>

//         {isLoading && visibleLeadsCount < filteredLeads.length && (
//           <div className="text-center py-2 sm:py-4 text-gray-900">
//             Loading more...
//           </div>
//         )}

//         {/* Opportunities modal */}
//         {isModalOpen && selectedLead && (
//           <LeadDetailPanel
//             lead={{
//               ...selectedLead,
//               value: editedValues.value,
//               accountName: editedValues.accountName,
//             }}
//             onClose={() => {
//               setIsModalOpen(false);
//               setSelectedLead(null);
//               setEditedValues({ value: 0, accountName: "" });
//             }}
//             onSave={handleSaveOpportunity}
//           >
//             <div className="space-y-4">
//               {/* Inputs */}
//               <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-1 text-center">
//                   Value ($):
//                 </label>
//                 <input
//                   type="number"
//                   value={editedValues.value || ""}
//                   onChange={(e) =>
//                     setEditedValues({
//                       ...editedValues,
//                       value: e.target.value ? parseFloat(e.target.value) : 0,
//                     })
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-center"
//                   placeholder="Optional"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-1 text-center">
//                   Account Name:
//                 </label>
//                 <input
//                   type="text"
//                   value={editedValues.accountName || ""}
//                   onChange={(e) =>
//                     setEditedValues({
//                       ...editedValues,
//                       accountName: e.target.value,
//                     })
//                   }
//                   className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-center"
//                   placeholder="Enter account name"
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-center gap-4 mt-4">
//                 <button
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     setSelectedLead(null);
//                     setEditedValues({ value: 0, accountName: "" });
//                   }}
//                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-sm sm:text-base"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleSaveOpportunity(selectedLead)}
//                   className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 text-sm sm:text-base"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </LeadDetailPanel>
//         )}
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-6 mt-8">
//         <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-6">
//           <p className="text-sm text-gray-300 mb-4 sm:mb-0">
//             © {new Date().getFullYear()} João Kirst. All rights reserved.
//           </p>
//           <div className="flex space-x-6">
//             <a
//               href="https://www.linkedin.com/in/joaokirst/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-200"
//             >
//               <Linkedin size={20} />
//               <span className="text-sm">LinkedIn</span>
//             </a>
//             <a
//               href="https://github.com/joaoalexandre2"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-200"
//             >
//               <Github size={20} />
//               <span className="text-sm">GitHub</span>
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import { useState, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import { Linkedin, Github } from "lucide-react"; // Social icons
import LeadDetailPanel from "./LeadDetailPanel"; // Modal component for lead details
import leadsData from "../data/leads.json"; // Local JSON data

export default function LeadsList({ onSelectLead, onLeadsLoaded }) {
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleLeadsCount, setVisibleLeadsCount] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [editedValues, setEditedValues] = useState({
    value: 0,
    accountName: "",
  });

  const debouncedSetSearchTerm = useMemo(
    () => debounce((value) => setSearchTerm(value), 300),
    []
  );

  useEffect(() => {
    const loadLeads = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (!leadsData || leadsData.length === 0) {
          throw new Error("No leads data available");
        }
        setLeads(leadsData);
        if (onLeadsLoaded) onLeadsLoaded(leadsData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading leads:", err);
        setError("Failed to load leads.");
        setIsLoading(false);
      }
    };
    loadLeads();
  }, [onLeadsLoaded]);

  useEffect(() => {
    const savedFilter = localStorage.getItem("filterStatus");
    const savedSort = localStorage.getItem("sortDirection");
    const savedSearch = localStorage.getItem("searchTerm");
    if (savedFilter) setFilterStatus(savedFilter);
    if (savedSort) setSortDirection(savedSort);
    if (savedSearch) setSearchTerm(savedSearch);
  }, []);

  useEffect(() => {
    localStorage.setItem("filterStatus", filterStatus);
    localStorage.setItem("sortDirection", sortDirection);
    localStorage.setItem("searchTerm", searchTerm);
  }, [filterStatus, sortDirection, searchTerm]);

  const filteredLeads = useMemo(() => {
    return leads
      .filter(
        (lead) =>
          (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (filterStatus === "All" || lead.status === filterStatus)
      )
      .sort((a, b) =>
        sortDirection === "desc" ? b.score - a.score : a.score - b.score
      );
  }, [leads, searchTerm, filterStatus, sortDirection]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilterStatus("All");
    setSortDirection("desc");
    localStorage.removeItem("searchTerm");
    localStorage.removeItem("filterStatus");
    localStorage.removeItem("sortDirection");
    setVisibleLeadsCount(20);
  };

  const handleConvertLead = (leadId) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;
    setSelectedLead(lead);
    setEditedValues({
      value: lead.value || 0,
      accountName: lead.company || "N/A",
    });
    setIsModalOpen(true);
  };

  const handleSaveOpportunity = (editedLead) => {
    const newOpportunity = {
      id: `opp-${Date.now()}-${editedLead.id}`,
      name: editedLead.name,
      status: editedLead.status,
      value: editedValues.value || 0,
      accountName: editedValues.accountName || "N/A",
    };
    setOpportunities((prev) => [...prev, newOpportunity]);
    setLeads((prevLeads) => prevLeads.filter((l) => l.id !== editedLead.id));
    setIsModalOpen(false);
    setSelectedLead(null);
    setEditedValues({ value: 0, accountName: "" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (
        scrollHeight - scrollTop - clientHeight < 100 &&
        visibleLeadsCount < filteredLeads.length
      ) {
        setIsLoading(true);
        setTimeout(() => {
          setVisibleLeadsCount((prev) =>
            Math.min(prev + 20, filteredLeads.length)
          );
          setIsLoading(false);
        }, 300);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleLeadsCount, filteredLeads.length]);

  if (isLoading && leads.length === 0) {
    return (
      <div className="text-center py-8 bg-white min-h-screen flex items-center justify-center transition-opacity duration-300 opacity-100">
        <div className="text-gray-900 text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-white min-h-screen flex items-center justify-center transition-opacity duration-300 opacity-100">
        <div className="text-red-600 text-xl font-semibold">{error}</div>
      </div>
    );
  }

  if (filteredLeads.length === 0) {
    return (
      <div className="text-center py-8 bg-white min-h-screen flex items-center justify-center transition-opacity duration-300 opacity-100">
        <div className="text-gray-900 text-xl font-semibold mb-4">
          No leads found
        </div>
        <button
          onClick={resetFilters}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="px-2 sm:px-6 py-4 sm:py-6 bg-gray-50 w-[calc(100vw-50px)] max-w-none transition-opacity duration-300 opacity-100 flex-1">
        {/* Sticky top bar with title and buttons */}
        <div className="sticky top-0 z-40 bg-gray-50 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
            Challenge Mini Seller
          </h1>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by name/company..."
                onChange={(e) => debouncedSetSearchTerm(e.target.value)}
                value={searchTerm}
                className="p-4 sm:p-5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base w-full min-w-[250px]"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 sm:p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base w-full sm:w-auto"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
            </select>
            <button
              onClick={() =>
                setSortDirection(sortDirection === "desc" ? "asc" : "desc")
              }
              className="p-2 sm:p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base shadow-md w-full sm:w-auto"
            >
              Sort by Score ({sortDirection === "desc" ? "↓" : "↑"})
            </button>
            <button
              onClick={resetFilters}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base w-full sm:w-auto"
            >
              Reset Filters
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base w-full sm:w-auto"
            >
              Opportunities
            </button>
          </div>
        </div>

        {/* Leads grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 sm:gap-2 w-full">
          {filteredLeads.slice(0, visibleLeadsCount).map((lead) => (
            <div
              key={lead.id}
              className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 flex flex-col items-center"
              onClick={() => onSelectLead(lead)}
            >
              <h3 className="font-bold text-sm sm:text-lg text-gray-900 mb-1 line-clamp-1 text-center">
                {lead.name}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-1 line-clamp-1 text-center">
                {lead.company}
              </p>
              <p className="text-gray-900 text-xs sm:text-sm mb-2 text-center">
                Score: {lead.score}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mb-3 line-clamp-1 text-center">
                Status: {lead.status}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleConvertLead(lead.id);
                }}
                className="w-full py-1 sm:py-2 bg-[#064E3B] text-white rounded-md hover:bg-[#0A6F4E] transition-all duration-200 text-xs sm:text-sm font-medium text-center"
              >
                Convert to Opportunity
              </button>
            </div>
          ))}
        </div>

        {isLoading && visibleLeadsCount < filteredLeads.length && (
          <div className="text-center py-2 sm:py-4 text-gray-900">
            Loading more...
          </div>
        )}

        {/* Opportunities modal */}
        {isModalOpen && !selectedLead && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-5 text-center">
                Opportunities
              </h2>
              {opportunities.length === 0 ? (
                <p className="text-gray-500 text-lg text-center">
                  No opportunities yet
                </p>
              ) : (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border-b border-gray-300 p-2 text-center text-gray-700 text-sm">
                        Name
                      </th>
                      <th className="border-b border-gray-300 p-2 text-center text-gray-700 text-sm">
                        Account Name
                      </th>
                      <th className="border-b border-gray-300 p-2 text-center text-gray-700 text-sm">
                        Value ($)
                      </th>
                      <th className="border-b border-gray-300 p-2 text-center text-gray-700 text-sm">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {opportunities.map((opp) => (
                      <tr
                        key={opp.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="p-2 text-gray-900 text-sm text-center">
                          {opp.name}
                        </td>
                        <td className="p-2 text-gray-900 text-sm text-center">
                          {opp.accountName}
                        </td>
                        <td className="p-2 text-gray-900 text-sm text-center">
                          {opp.value || 0}
                        </td>
                        <td className="p-2 text-gray-900 text-sm text-center">
                          {opp.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Lead conversion modal */}
        {selectedLead && isModalOpen && (
          <LeadDetailPanel
            lead={{
              ...selectedLead,
              value: editedValues.value,
              accountName: editedValues.accountName,
            }}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedLead(null);
              setEditedValues({ value: 0, accountName: "" });
            }}
            onSave={handleSaveOpportunity}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1 text-center">
                  Value ($):
                </label>
                <input
                  type="number"
                  value={editedValues.value || ""}
                  onChange={(e) =>
                    setEditedValues({
                      ...editedValues,
                      value: e.target.value ? parseFloat(e.target.value) : 0,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-center"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1 text-center">
                  Account Name:
                </label>
                <input
                  type="text"
                  value={editedValues.accountName || ""}
                  onChange={(e) =>
                    setEditedValues({
                      ...editedValues,
                      accountName: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-center"
                  placeholder="Enter account name"
                />
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedLead(null);
                    setEditedValues({ value: 0, accountName: "" });
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveOpportunity(selectedLead)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 text-sm sm:text-base"
                >
                  Save
                </button>
              </div>
            </div>
          </LeadDetailPanel>
        )}
      </div>


      {/* Footer */}
      <footer className="bg-white text-gray-800 py-6 border-t border-gray-200">
        <div className="container mx-auto flex flex-col items-center justify-center px-6 space-y-4">
          {/* Social links */}
          <div className="flex space-x-6 justify-center">
            {/* LinkedIn link */}
            <a
              href="https://www.linkedin.com/in/joaokirst/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-600 transition-colors duration-200"
            >
              <Linkedin size={24} />
              <span className="text-sm sm:text-base">LinkedIn</span>
            </a>

            {/* GitHub link */}
            <a
              href="https://github.com/joaoalexandre2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-gray-600 transition-colors duration-200"
            >
              <Github size={24} />
              <span className="text-sm sm:text-base">GitHub</span>
            </a>
          </div>

          {/* Copyright text */}
          <p className="text-sm sm:text-base text-center">
            © {new Date().getFullYear()} João Kirst. All rights reserved.
          </p>
        </div>
      </footer>


    </div>
  );
}

