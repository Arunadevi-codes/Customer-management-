// src/components/Customers/useCustomers.js
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import API from "../../services/api";

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / limit) || 1;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const res = await API.get(
        `/customers?offset=${offset}&limit=${limit}&search=${debouncedSearch}`
      );
      setCustomers(res.data.customers);
      setTotal(res.data.total);
    } catch {
      toast.error("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleAddClick = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedCustomerId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSaveCustomer = async (formData) => {
    try {
      if (editingCustomer) {
        await API.put(`/customers/${editingCustomer._id}`, formData);
        toast.success("Customer updated successfully!");
      } else {
        await API.post("/customers", formData);
        toast.success("Customer added successfully!");
      }
      fetchCustomers();
      setIsModalOpen(false);
      setEditingCustomer(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await API.delete(`/customers/${selectedCustomerId}`);
      toast.success("Customer deleted successfully!");
      fetchCustomers();
      setIsDeleteModalOpen(false);
      setSelectedCustomerId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  return {
    customers,
    loading,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    editingCustomer,
    page,
    setPage,
    limit,
    setLimit,
    total,
    totalPages,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleSaveCustomer,
    handleConfirmDelete,
  };
};