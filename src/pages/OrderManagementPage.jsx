// src/pages/OrderManagementPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { db } from '../firebase/firebase.js';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle.js';

// Import ikon dari lucide-react
import {
  ArrowLeft, Eye, Trash2, Loader2, Search, Filter, Calendar,
  CheckCircle, XCircle, CircleHelp
} from 'lucide-react';

function OrderManagementPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  // NEW: Panggil usePageTitle
  usePageTitle("Manejemen Pesanan");

  // State untuk modal kustom
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [orderToDelete, setOrderToDelete] = useState(null);

  // State untuk filter & pencarian
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [startDateFilter, setStartDateFilter] = useState(''); // New state for start date filter
  const [endDateFilter, setEndDateFilter] = useState('');   // New state for end date filter

  // State untuk mengontrol visibilitas filter di mobile
  const [showMobileFilters, setShowMobileFilters] = useState(false);


  // Fungsi untuk menampilkan modal pesan
  const showModal = (type, message) => {
    setModalMessage(message);
    if (type === 'success') {
      setShowSuccessModal(true);
    } else if (type === 'error') {
      setShowErrorModal(true);
    }
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ordersCollectionRef = collection(db, 'orders');
      const querySnapshot = await getDocs(ordersCollectionRef);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort orders by orderDate in descending order (terbaru di atas)
      ordersData.sort((a, b) => {
        const dateA = a.orderDate ? new Date(a.orderDate) : new Date(0);
        const dateB = b.orderDate ? new Date(b.orderDate) : new Date(0);
        return dateB - dateA;
      });
      setOrders(ordersData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Gagal memuat pesanan. Silakan coba lagi nanti.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const orderDocRef = doc(db, 'orders', orderId);
      await updateDoc(orderDocRef, { status: newStatus });
      showModal('success', 'Status pesanan berhasil diperbarui!');
      fetchOrders(); // Refresh daftar pesanan
    } catch (err) {
      console.error("Error updating order status:", err);
      showModal('error', 'Gagal memperbarui status pesanan. Silakan coba lagi.');
    }
  };

  const confirmDeleteOrder = (order) => {
    setOrderToDelete(order);
    setShowConfirmDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!orderToDelete) return;

    try {
      const orderDocRef = doc(db, 'orders', orderToDelete.id);
      await deleteDoc(orderDocRef);
      showModal('success', `Pesanan #${orderToDelete.id.substring(0, 6)}... berhasil dihapus!`);
      setShowConfirmDeleteModal(false);
      setOrderToDelete(null);
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
      showModal('error', 'Gagal menghapus pesanan. Silakan coba lagi.');
    }
  };

  const handleShowDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };

  // --- Filter Logic ---
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);
  const handlePaymentMethodFilterChange = (e) => setPaymentMethodFilter(e.target.value);
  const handleStartDateChange = (e) => setStartDateFilter(e.target.value);
  const handleEndDateChange = (e) => setEndDateFilter(e.target.value);

  let filteredOrders = orders.filter(order => {
    const matchesSearch =
      (order.customerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.id?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPaymentMethod = paymentMethodFilter === 'all' || order.paymentMethod === paymentMethodFilter;

    // Date filtering logic
    const orderDate = order.orderDate ? new Date(order.orderDate) : null;
    let matchesDate = true;

    if (startDateFilter) {
      const start = new Date(startDateFilter);
      // Set time to start of day for accurate comparison
      start.setHours(0, 0, 0, 0);
      if (orderDate) {
        matchesDate = matchesDate && (orderDate >= start);
      } else {
        matchesDate = false; // If no orderDate, it can't match start date filter
      }
    }

    if (endDateFilter) {
      const end = new Date(endDateFilter);
      // Set time to end of day for accurate comparison
      end.setHours(23, 59, 59, 999);
      if (orderDate) {
        matchesDate = matchesDate && (orderDate <= end);
      } else {
        matchesDate = false; // If no orderDate, it can't match end date filter
      }
    }


    return matchesSearch && matchesStatus && matchesPaymentMethod && matchesDate;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#d9ecb1] font-inter">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-[#99cc66] mb-4" size={48} />
          <div className="text-center text-xl font-semibold text-[#254222]">Memuat daftar pesanan...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#d9ecb1] font-inter">
        <div className="flex flex-col items-center p-8 bg-[#FFFDF5] rounded-lg shadow-lg">
          <XCircle className="text-red-600 mb-4" size={48} />
          <div className="text-center text-xl font-semibold text-red-600">{error}</div>
          <button
            onClick={fetchOrders}
            className="mt-6 py-2 px-5 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                       bg-transparent border-2 border-[#6699cc] text-[#6699cc] hover:bg-[#6699cc] hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#6699cc] focus:ring-opacity-50"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-7xl font-inter min-h-screen my-8">
      <h1 className="text-4xl font-extrabold text-[#254222] mb-8 text-center drop-shadow-sm">Manajemen Pesanan</h1>

      {/* Tombol Kembali dan Tampilkan/Sembunyikan Filter Mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="py-2 px-5 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                     bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#254222] focus:ring-opacity-50 flex items-center justify-center w-full sm:w-auto"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Kembali ke Dashboard
        </button>

        {/* Tombol Tampilkan/Sembunyikan Filter (hanya di mobile) */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden py-2 px-5 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                     bg-transparent border-2 border-[#6699cc] text-[#6699cc] hover:bg-[#6699cc] hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#6699cc] focus:ring-opacity-50 flex items-center justify-center w-full sm:w-auto"
        >
          <Filter className="h-5 w-5 mr-2" />
          {showMobileFilters ? 'Sembunyikan Filter' : 'Tampilkan Filter'}
        </button>
      </div>

      {/* Filter dan Pencarian */}
      <div className={`bg-[#FFFDF5] p-6 rounded-lg shadow-md mb-8 border border-[#cae4c5] lg:block ${showMobileFilters ? 'block' : 'hidden'}`}>
        <h2 className="text-xl font-semibold text-[#254222] mb-4 flex items-center">
          <Filter className="mr-2" size={20} /> Filter & Pencarian Pesanan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"> {/* Adjusted grid for dates */}
          {/* Search Bar */}
          <div className="relative md:col-span-2 lg:col-span-1">
            <input
              type="text"
              placeholder="Cari pelanggan atau ID..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="py-2 pl-10 pr-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] text-[#254222] shadow-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Filter Status */}
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] bg-white text-[#254222] shadow-sm"
          >
            <option value="all">Semua Status</option>
            <option value="Tertunda">Tertunda</option>
            <option value="Diproses">Diproses</option>
            <option value="Selesai">Selesai</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>

          {/* Filter Metode Pembayaran */}
          <select
            value={paymentMethodFilter}
            onChange={handlePaymentMethodFilterChange}
            className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] bg-white text-[#254222] shadow-sm"
          >
            <option value="all">Semua Metode Pembayaran</option>
            <option value="bankTransfer">Transfer Bank</option>
            <option value="eWallet">E-Wallet</option>
            <option value="cod">COD</option>
          </select>

          {/* Filter Tanggal Mulai */}
          <div className="relative">
            <input
              type="date"
              value={startDateFilter}
              onChange={handleStartDateChange}
              className="py-2 pl-10 pr-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] text-[#254222] shadow-sm"
              aria-label="Tanggal Mulai"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {/* Filter Tanggal Akhir */}
          <div className="relative">
            <input
              type="date"
              value={endDateFilter}
              onChange={handleEndDateChange}
              className="py-2 pl-10 pr-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66] text-[#254222] shadow-sm"
              aria-label="Tanggal Akhir"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 && !loading && !error ? (
        <div className="bg-[#FFFDF5] p-10 rounded-lg shadow-md border border-[#cae4c5] text-center text-[#254222] text-lg font-semibold">
          Tidak ada pesanan yang ditemukan sesuai kriteria Anda.
        </div>
      ) : (
        <div className="overflow-x-auto bg-[#FFFDF5] rounded-lg shadow-md border border-[#cae4c5]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-[#cae4c5] text-[#254222] uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID Pesanan</th>
                <th className="py-3 px-6 text-left">Pelanggan</th>
                <th className="py-3 px-6 text-left">No. Telepon</th>
                <th className="py-3 px-6 text-left">Tanggal</th>
                <th className="py-3 px-6 text-left">Metode Pembayaran</th>
                <th className="py-3 px-6 text-right">Total</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-[#254222] text-sm">
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-[#f2f7ed] transition-colors duration-150">
                  <td className="py-4 px-6 text-left font-medium">
                    {order.id.substring(0, 6)}...{order.id.substring(order.id.length - 4)}
                  </td>
                  <td className="py-4 px-6 text-left">{order.customerInfo?.name || 'N/A'}</td>
                  <td className="py-4 px-6 text-left">{order.customerInfo?.phone || 'N/A'}</td>
                  <td className="py-4 px-6 text-left">
                    {order.orderDate ? new Date(order.orderDate).toLocaleDateString('id-ID', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    }) : 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-left">
                    {order.paymentMethod === 'bankTransfer' ? 'Transfer Bank' :
                      order.paymentMethod === 'eWallet' ? 'E-Wallet' :
                        order.paymentMethod === 'cod' ? 'COD' : 'N/A'}
                  </td>
                  <td className="py-4 px-6 text-right">Rp {order.totalAmount ? order.totalAmount.toLocaleString('id-ID') : 'N/A'}</td>
                  <td className="py-4 px-6 text-left">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className={`py-1 px-3 rounded-full text-xs font-semibold
                          ${order.status === 'Tertunda' ? 'bg-yellow-200 text-yellow-800' :
                          order.status === 'Diproses' ? 'bg-[#cae4c5] text-[#254222]' :
                            order.status === 'Selesai' ? 'bg-[#99cc66] text-[#FFFDF5]' :
                              order.status === 'Dibatalkan' ? 'bg-red-200 text-red-800' :
                                'bg-gray-200 text-gray-800'}
                          transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#99cc66] focus:border-[#99cc66]
                      `}
                    >
                      <option value="Tertunda">Tertunda</option>
                      <option value="Diproses">Diproses</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex item-center justify-center space-x-2">
                      <button
                        onClick={() => handleShowDetail(order)}
                        className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                        title="Lihat Detail"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => confirmDeleteOrder(order)}
                        className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors duration-200"
                        title="Hapus Pesanan"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Detail Pesanan */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFDF5] rounded-lg shadow-xl p-6 w-full max-w-md mx-auto border border-[#cae4c5]">
            <h2 className="text-2xl font-bold text-[#254222] mb-4 text-center">Detail Pesanan #{selectedOrder.id.substring(0, 6)}...</h2>

            <div className="space-y-2 mb-4 text-[#254222]">
              <p><strong>Pelanggan:</strong> {selectedOrder.customerInfo?.name || 'N/A'}</p>
              <p><strong>No. Telepon:</strong> {selectedOrder.customerInfo?.phone || 'N/A'}</p>
              <p><strong>Email:</strong> {selectedOrder.customerInfo?.email || 'N/A'}</p>
              <p><strong>Alamat:</strong> {selectedOrder.customerInfo?.address || 'N/A'}</p>
              <p><strong>Tanggal Pesanan:</strong> {selectedOrder.orderDate ? new Date(selectedOrder.orderDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</p>
              <p><strong>Metode Pembayaran:</strong>
                {selectedOrder.paymentMethod === 'bankTransfer' ? 'Transfer Bank' :
                  selectedOrder.paymentMethod === 'eWallet' ? 'E-Wallet' :
                    selectedOrder.paymentMethod === 'cod' ? 'Cash On Delivery (COD)' : 'N/A'}
              </p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              {selectedOrder.customerInfo?.notes && <p><strong>Catatan:</strong> {selectedOrder.customerInfo.notes}</p>}
            </div>

            <h3 className="text-xl font-semibold text-[#254222] mb-2">Item Pesanan:</h3>
            <ul className="list-disc pl-5 mb-4 max-h-48 overflow-y-auto">
              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                selectedOrder.items.map((item, index) => (
                  <li key={index} className="text-[#254222]">
                    {item.name} (x{item.quantity}) - Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </li>
                ))
              ) : (
                <li className="text-[#254222]">Tidak ada item dalam pesanan ini.</li>
              )}
            </ul>

            <div className="border-t pt-4 mt-4 text-right border-[#cae4c5]">
              <p className="text-lg font-semibold text-[#254222]">Subtotal: Rp {selectedOrder.subtotal ? selectedOrder.subtotal.toLocaleString('id-ID') : 'N/A'}</p>
              <p className="text-lg font-semibold text-[#254222]">Biaya Pengiriman: Rp {selectedOrder.deliveryFee ? selectedOrder.deliveryFee.toLocaleString('id-ID') : 'N/A'}</p>
              <p className="text-xl font-bold text-[#99cc66] mt-2">Total: Rp {selectedOrder.totalAmount ? selectedOrder.totalAmount.toLocaleString('id-ID') : 'N/A'}</p>
            </div>

            <button
              onClick={handleCloseDetailModal}
              className="mt-6 w-full py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                         bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222] focus:outline-none focus:ring-2 focus:ring-[#99cc66]"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFDF5] p-8 rounded-lg shadow-xl max-w-sm w-full text-center border border-[#99cc66]">
            <CheckCircle className="text-[#99cc66] mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-[#254222] mb-4">Berhasil!</h3>
            <p className="text-[#254222] mb-6">{modalMessage}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="py-2 px-5 rounded-lg text-base font-semibold transition-colors duration-300
                         bg-[#99cc66] text-[#254222] hover:bg-[#7aaf4f] focus:outline-none focus:ring-2 focus:ring-[#99cc66]"
            >
              Oke
            </button>
          </div>
        </div>
      )}

      {/* Modal Error */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFDF5] p-8 rounded-lg shadow-xl max-w-sm w-full text-center border border-red-600">
            <XCircle className="text-red-600 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-[#254222] mb-4">Terjadi Kesalahan!</h3>
            <p className="text-[#254222] mb-6">{modalMessage}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="py-2 px-5 rounded-lg text-base font-semibold transition-colors duration-300
                         bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showConfirmDeleteModal && orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFDF5] p-8 rounded-lg shadow-xl max-w-sm w-full text-center border border-red-600">
            <CircleHelp className="text-[#6699cc] mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-[#254222] mb-4">Konfirmasi Penghapusan</h3>
            <p className="text-[#254222] mb-6">
              Apakah Anda yakin ingin menghapus pesanan #<span className="font-semibold">{orderToDelete.id.substring(0, 6)}...</span> ini?
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowConfirmDeleteModal(false)}
                className="py-2 px-5 rounded-lg text-base font-semibold transition-colors duration-300
                           bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="py-2 px-5 rounded-lg text-base font-semibold transition-colors duration-300
                           bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderManagementPage;
