import React from 'react';
import { Edit, Trash2, Mail, Phone, MapPin, Users } from 'lucide-react';

const ViewCustomers = ({ customers = [], onEdit, onDelete }) => {
  // Safe fallback
  const safeCustomers = customers || [];

  // Show empty state when no customers
  if (!safeCustomers || safeCustomers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <Users size={64} className="mb-4 text-gray-300" />
          <p className="text-lg font-medium text-gray-700">No customers found</p>
          <p className="text-sm text-gray-400 mt-1">
            Click the "Add Customer" button to create your first customer
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">

          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {safeCustomers.map((customer) => (
              <tr key={customer._id} className="hover:bg-gray-50 transition-colors duration-200">

                {/* Customer Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {customer.name?.charAt(0).toUpperCase() || 'C'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{customer.name}</p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Mail size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{customer.email}</span>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Phone size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{customer.phone}</span>
                  </div>
                </td>

                {/* Address */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {customer.address || '—'}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(customer)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Customer"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(customer._id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Customer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Showing {safeCustomers.length} customer{safeCustomers.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default ViewCustomers;