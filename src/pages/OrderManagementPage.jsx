// src/pages/OrderManagementPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function OrderManagementPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const ordersCollectionRef = collection(db, 'orders');
      const querySnapshot = await getDocs(ordersCollectionRef);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort orders by orderDate in descending order (terbaru di atas)
      ordersData.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      setOrders(ordersData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Gagal memuat pesanan. Silakan coba lagi nanti.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const orderDocRef = doc(db, 'orders', orderId);
      await updateDoc(orderDocRef, { status: newStatus });
      alert('Status pesanan berhasil diperbarui!');
      fetchOrders(); // Refresh daftar pesanan
    } catch (err) {
      console.error("Error updating order status:", err);
      alert('Gagal memperbarui status pesanan. Silakan coba lagi.');
    }
  };

  const handleDeleteOrder = async (orderId, orderName) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus pesanan #${orderName} ini?`)) {
      try {
        const orderDocRef = doc(db, 'orders', orderId);
        await deleteDoc(orderDocRef);
        alert('Pesanan berhasil dihapus!');
        fetchOrders(); // Refresh daftar pesanan
      } catch (err) {
        console.error("Error deleting order:", err);
        alert('Gagal menghapus pesanan. Silakan coba lagi.');
      }
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

  if (loading) {
    // Menggunakan main-accent
    return <div className="text-center p-8 text-xl font-semibold text-[#99cc66] font-inter">Memuat daftar pesanan...</div>;
  }

  if (error) {
    // Menggunakan warna bawaan Tailwind (merah)
    return <div className="text-center p-8 text-xl font-semibold text-red-600 font-inter">{error}</div>;
  }

  return (
    // Menggunakan background #d9ecb1 dan font-inter
    <div className="container mx-auto p-8 bg-[#d9ecb1] rounded-lg shadow-lg max-w-7xl font-inter">
      {/* Menggunakan dark-neutral */}
      <h1 className="text-3xl font-bold text-[#254222] mb-6 text-center">Manajemen Pesanan</h1>

      {/* Tombol kembali ke Dashboard */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => navigate('/admin/dashboard')}
          // Tombol outline dark-neutral
          className="py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                     bg-transparent border-2 border-[#254222] text-[#254222] hover:bg-[#254222] hover:text-[#FFFDF5] focus:outline-none focus:ring-2 focus:ring-[#254222] focus:ring-opacity-50 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0L3.586 10a1 1 0 010-1.414l4.707-4.707a1 1 0 011.414 1.414L6.414 9H16a1 1 0 110 2H6.414l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Kembali ke Dashboard
        </button>
      </div>

      {orders.length === 0 ? (
        // Menggunakan dark-neutral
        <div className="text-center text-[#254222] text-lg p-10">Tidak ada pesanan saat ini.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#FFFDF5] border border-gray-200 rounded-lg"> {/* Background tabel #FFFDF5 */}
            <thead>
              <tr className="bg-[#cae4c5] text-[#254222] uppercase text-sm leading-normal"> {/* Header tabel secondary-neutral background, dark-neutral text */}
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
            <tbody className="text-[#254222] text-sm"> {/* Body tabel dark-neutral text */}
              {orders.map(order => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-[#f2f7ed]"> {/* Hover background lebih terang */}
                  <td className="py-3 px-6 text-left font-medium">
                    {order.id.substring(0, 6)}...{order.id.substring(order.id.length - 4)}
                  </td>
                  <td className="py-3 px-6 text-left">{order.customerInfo?.name || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{order.customerInfo?.phone || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">
                    {new Date(order.orderDate).toLocaleDateString('id-ID', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {order.paymentMethod === 'bankTransfer' ? 'Transfer Bank' :
                     order.paymentMethod === 'eWallet' ? 'E-Wallet' :
                     order.paymentMethod === 'cod' ? 'COD' : 'N/A'}
                  </td>
                  <td className="py-3 px-6 text-right">Rp {order.totalAmount ? order.totalAmount.toLocaleString('id-ID') : 'N/A'}</td>
                  <td className="py-3 px-6 text-left">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className={`py-1 px-3 rounded-full text-xs font-semibold
                        ${order.status === 'Tertunda' ? 'bg-yellow-200 text-yellow-800' :
                          order.status === 'Diproses' ? 'bg-[#cae4c5] text-[#254222]' : // Diproses: secondary-neutral background, dark-neutral text
                          order.status === 'Selesai' ? 'bg-[#99cc66] text-[#FFFDF5]' : // Selesai: main-accent background, light krem text
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
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center space-x-2">
                      <button
                        onClick={() => handleShowDetail(order)}
                        // Tombol outline secondary-neutral kecil
                        className="bg-transparent border-2 border-[#cae4c5] text-[#254222] px-3 py-1 rounded-md text-xs hover:bg-[#cae4c5] hover:text-[#254222] transition-colors duration-300 transform active:scale-95"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id, order.id.substring(0, 6))}
                        // Tombol outline merah kecil
                        className="bg-transparent border-2 border-red-600 text-red-600 px-3 py-1 rounded-md text-xs hover:bg-red-600 hover:text-white transition-colors duration-300 transform active:scale-95"
                      >
                        Hapus
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFDF5] rounded-lg shadow-xl p-6 w-full max-w-md mx-auto"> {/* Background modal #FFFDF5 */}
            {/* Menggunakan dark-neutral */}
            <h2 className="text-2xl font-bold text-[#254222] mb-4">Detail Pesanan #{selectedOrder.id.substring(0, 6)}...</h2>
            
            {/* Menggunakan dark-neutral */}
            <div className="space-y-2 mb-4 text-[#254222]">
              <p><strong>Pelanggan:</strong> {selectedOrder.customerInfo?.name || 'N/A'}</p>
              <p><strong>No. Telepon:</strong> {selectedOrder.customerInfo?.phone || 'N/A'}</p>
              <p><strong>Email:</strong> {selectedOrder.customerInfo?.email || 'N/A'}</p>
              <p><strong>Alamat:</strong> {selectedOrder.customerInfo?.address || 'N/A'}</p>
              <p><strong>Tanggal Pesanan:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Metode Pembayaran:</strong> 
                {selectedOrder.paymentMethod === 'bankTransfer' ? 'Transfer Bank' :
                 selectedOrder.paymentMethod === 'eWallet' ? 'E-Wallet' :
                 selectedOrder.paymentMethod === 'cod' ? 'Cash On Delivery (COD)' : 'N/A'}
              </p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              {selectedOrder.customerInfo?.notes && <p><strong>Catatan:</strong> {selectedOrder.customerInfo.notes}</p>}
            </div>

            {/* Menggunakan dark-neutral */}
            <h3 className="text-xl font-semibold text-[#254222] mb-2">Item Pesanan:</h3>
            <ul className="list-disc pl-5 mb-4 max-h-48 overflow-y-auto">
              {selectedOrder.items && selectedOrder.items.length > 0 ? (
                selectedOrder.items.map((item, index) => (
                  // Menggunakan dark-neutral
                  <li key={index} className="text-[#254222]">
                    {item.name} (x{item.quantity}) - Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </li>
                ))
              ) : (
                // Menggunakan dark-neutral
                <li className="text-[#254222]">Tidak ada item dalam pesanan ini.</li>
              )}
            </ul>

            <div className="border-t pt-2 mt-4 text-right">
              {/* Menggunakan dark-neutral */}
              <p className="text-lg font-semibold text-[#254222]">Subtotal: Rp {selectedOrder.subtotal ? selectedOrder.subtotal.toLocaleString('id-ID') : 'N/A'}</p>
              {/* Menggunakan dark-neutral */}
              <p className="text-lg font-semibold text-[#254222]">Biaya Pengiriman: Rp {selectedOrder.deliveryFee ? selectedOrder.deliveryFee.toLocaleString('id-ID') : 'N/A'}</p>
              {/* Total pembayaran menggunakan main-accent */}
              <p className="text-xl font-bold text-[#99cc66] mt-2">Total: Rp {selectedOrder.totalAmount ? selectedOrder.totalAmount.toLocaleString('id-ID') : 'N/A'}</p>
            </div>

            <button
              onClick={handleCloseDetailModal}
              // Tombol outline main-accent untuk modal
              className="mt-6 w-full py-2 px-4 rounded-lg text-lg font-semibold transition-colors duration-300 transform active:scale-95
                         bg-transparent border-2 border-[#99cc66] text-[#99cc66] hover:bg-[#99cc66] hover:text-[#254222]"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderManagementPage;
