import { useState, useEffect } from 'react';

export default function OpportunitiesTable({ opportunities, onConvert }) {
  const [opps, setOpps] = useState(opportunities);

  useEffect(() => {
    setOpps(opportunities);
  }, [opportunities]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Opportunities</h2>
      {opps.length === 0 ? (
        <p className="text-center py-4">No opportunities yet</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Stage</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Account</th>
            </tr>
          </thead>
          <tbody>
            {opps.map(opportunity => (
              <tr key={opportunity.id} className="border">
                <td className="p-2 border">{opportunity.id}</td>
                <td className="p-2 border">{opportunity.name}</td>
                <td className="p-2 border">{opportunity.stage}</td>
                <td className="p-2 border">{opportunity.amount || 'N/A'}</td>
                <td className="p-2 border">{opportunity.accountName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}