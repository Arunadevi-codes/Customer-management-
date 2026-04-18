import React from 'react';

const CustomersPagination = ({ 
  page, 
  totalPages, 
  limit, 
  onPageChange, 
  onLimitChange 
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <select
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        className="border px-2 py-1 rounded"
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
      </select>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-1 border rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        
        <span className="px-3 py-1">
          Page {page} of {totalPages}
        </span>
        
        <button
          onClick={() => onPageChange(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-3 py-1 border rounded ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomersPagination;