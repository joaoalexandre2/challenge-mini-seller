export default function OpportunitiesTable({ opps }) {
  return (
    <div className="p-2 sm:p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Opportunities</h2>
      {opps.length === 0 ? (
        <p className="text-center py-2 sm:py-4">No opportunities yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm sm:text-base min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-1 sm:p-2 border">ID</th>
                <th className="p-1 sm:p-2 border">Name</th>
                <th className="p-1 sm:p-2 border">Stage</th>
                <th className="p-1 sm:p-2 border">Amount</th>
                <th className="p-1 sm:p-2 border">Account</th>
              </tr>
            </thead>
            <tbody>
              {opps.map(opportunity => (
                <tr key={opportunity.id} className="border">
                  <td className="p-1 sm:p-2 border">{opportunity.id}</td>
                  <td className="p-1 sm:p-2 border">{opportunity.name}</td>
                  <td className="p-1 sm:p-2 border">{opportunity.stage}</td>
                  <td className="p-1 sm:p-2 border">{opportunity.amount || 'N/A'}</td>
                  <td className="p-1 sm:p-2 border">{opportunity.accountName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}