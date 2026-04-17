import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import API from "../../services/api";
import ViewCustomers from './ViewCustomer';
import AddEditCustomers from './AddEditCustomer';
import DeleteCustomer from './DeleteCustomer';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      toast.error("Failed to fetch customers");
    }
  };

  // Open add modal
  const handleAddClick = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  // Open edit modal
  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  // Open delete confirmation
  const handleDeleteClick = (id) => {
    setSelectedCustomerId(id);
    setIsDeleteModalOpen(true);
  };

  // Save customer (Create/Update)
  const handleSaveCustomer = async (formData) => {
    try {
      if (editingCustomer) {
        await API.put(`/customers/${editingCustomer._id}`, formData);
        toast.success("Customer updated successfully!");
      } else {
        await API.post("/customers", formData);
        toast.success("Customer added successfully!");
      }
      fetchCustomers(); // Refresh the list
      setIsModalOpen(false);
      setEditingCustomer(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    try {
      await API.delete(`/customers/${selectedCustomerId}`);
      fetchCustomers(); // Refresh the list
      toast.success("Customer deleted successfully!");
      setIsDeleteModalOpen(false);
      setSelectedCustomerId(null);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  return (
    <div className="p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your customer database</p>
        </div>
        
        <button
          onClick={handleAddClick}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Plus size={18} />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search customers by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* View Component - Customer Table */}
      <ViewCustomers
        customers={filteredCustomers}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Add/Edit Customer Modal */}
      {isModalOpen && (
        <AddEditCustomers
          customer={editingCustomer}
          onSave={handleSaveCustomer}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Delete Customer Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteCustomer
          onConfirm={handleConfirmDelete}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Customers;