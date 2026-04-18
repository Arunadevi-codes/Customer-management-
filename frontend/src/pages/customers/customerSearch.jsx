import React from 'react';

const CustomersSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search customers..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full max-w-md border px-3 py-2 rounded"
      />
    </div>
  );
};

export default CustomersSearch;