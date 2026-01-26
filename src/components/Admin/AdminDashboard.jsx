// src/components/Admin/AdminShopDashboard.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  LogOut, Plus, Edit, Trash2, Save, X, Package, 
  DollarSign, Upload, Image as ImageIcon, Tag, Users,
  ChevronLeft, ChevronRight, Search, Filter, Eye, EyeOff,
  Grid, List, SortAsc, SortDesc
} from 'lucide-react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'sensory',
    image_url: '',
    age_group: '',
    stock: 10,
    featured: false
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price_asc', 'price_desc'
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    featured: 0,
    totalValue: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, categoryFilter, stockFilter, sortBy]);

  useEffect(() => {
    calculateStats();
  }, [products]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const totalProducts = products.length;
    const lowStock = products.filter(p => p.stock <= 5).length;
    const featured = products.filter(p => p.featured).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    
    setStats({ totalProducts, lowStock, featured, totalValue });
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Stock filter
    if (stockFilter !== 'all') {
      switch (stockFilter) {
        case 'in_stock':
          filtered = filtered.filter(p => p.stock > 0);
          break;
        case 'low_stock':
          filtered = filtered.filter(p => p.stock > 0 && p.stock <= 5);
          break;
        case 'out_of_stock':
          filtered = filtered.filter(p => p.stock === 0);
          break;
      }
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleFileUpload = async (file) => {
    if (!file) return null;
    
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock)
      };

      const { error } = await supabase
        .from('products')
        .insert([productToAdd]);

      if (error) throw error;

      alert('Product added successfully!');
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: 'sensory',
        image_url: '',
        age_group: '',
        stock: 10,
        featured: false
      });
      
      if (window.innerWidth < 1024) {
        setShowMobileForm(false);
      }
      
      fetchProducts();
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          ...editingProduct,
          price: parseFloat(editingProduct.price),
          stock: parseInt(editingProduct.stock),
          updated_at: new Date().toISOString()
        })
        .eq('id', editingProduct.id);

      if (error) throw error;

      alert('Product updated successfully!');
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('admin-authenticated');
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-sage"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-brand-navy">Shop Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-brand-navy/70">Manage products only</p>
              </div>
              <button
                onClick={() => setShowMobileForm(!showMobileForm)}
                className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-brand-sage text-white rounded-lg text-sm"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/20 text-sm"
                />
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Products</p>
                <p className="text-xl sm:text-2xl font-bold text-brand-navy mt-1">{stats.totalProducts}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Low Stock</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600 mt-1">{stats.lowStock}</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Featured</p>
                <p className="text-xl sm:text-2xl font-bold text-amber-600 mt-1">{stats.featured}</p>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg">
                <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Value</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">${stats.totalValue.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Filters & Controls - Mobile Top */}
          <div className="lg:hidden bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="sensory">Sensory Tools</option>
                  <option value="communication">Communication</option>
                  <option value="learning">Learning Aids</option>
                  <option value="fine-motor">Fine Motor</option>
                  <option value="calming">Calming</option>
                  <option value="daily-living">Daily Living</option>
                </select>
                
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
                >
                  <option value="all">All Stock</option>
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A-Z</option>
                  <option value="name_desc">Name: Z-A</option>
                </select>
                
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200"
                >
                  <option value="all">All Categories</option>
                  <option value="sensory">Sensory Tools</option>
                  <option value="communication">Communication</option>
                  <option value="learning">Learning Aids</option>
                  <option value="fine-motor">Fine Motor</option>
                  <option value="calming">Calming</option>
                  <option value="daily-living">Daily Living</option>
                </select>
                
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200"
                >
                  <option value="all">All Stock</option>
                  <option value="in_stock">In Stock</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A-Z</option>
                  <option value="name_desc">Name: Z-A</option>
                </select>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} products
                </span>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products List/Grid */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {viewMode === 'list' ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="hidden sm:table-cell px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              {product.image_url ? (
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <ImageIcon className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <div className="font-medium text-gray-900 truncate">
                                    {product.name}
                                  </div>
                                  {product.featured && (
                                    <span className="shrink-0 px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                                      Featured
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500 truncate">
                                  {product.description}
                                </div>
                                {product.age_group && (
                                  <div className="text-xs text-gray-400 mt-1">
                                    {product.age_group}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-green-600" />
                              <span className="font-semibold">${parseFloat(product.price).toFixed(2)}</span>
                            </div>
                          </td>
                          <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full capitalize">
                              {product.category.replace('-', ' ')}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.stock > 10 
                                ? 'bg-green-100 text-green-800'
                                : product.stock > 0
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.stock} in stock
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                // Grid View
                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                      <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                          </div>
                          {product.featured && (
                            <span className="shrink-0 ml-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        
                        <div className="mb-4">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                              <ImageIcon className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full capitalize">
                              {product.category.replace('-', ' ')}
                            </span>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-gray-500" />
                              <span className="font-bold text-gray-900">${parseFloat(product.price).toFixed(2)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.stock > 10 
                                ? 'bg-green-100 text-green-800'
                                : product.stock > 0
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.stock} in stock
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No products found</p>
                  {searchTerm && (
                    <p className="text-sm text-gray-400 mt-2">
                      Try adjusting your search or filters
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Add Product Form - Sidebar */}
          <div className={`lg:w-96 ${showMobileForm ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm p-4 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Add New Product</h2>
                <button
                  onClick={() => setShowMobileForm(false)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/20 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/20 outline-none"
                    rows="2"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/20 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/20 outline-none"
                    >
                      <option value="sensory">Sensory Tools</option>
                      <option value="communication">Communication</option>
                      <option value="learning">Learning Aids</option>
                      <option value="fine-motor">Fine Motor</option>
                      <option value="calming">Calming</option>
                      <option value="daily-living">Daily Living</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age Group
                    </label>
                    <input
                      type="text"
                      value={newProduct.age_group}
                      onChange={(e) => setNewProduct({...newProduct, age_group: e.target.value})}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/20 outline-none"
                      placeholder="2-8 years"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock *
                    </label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/20 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newProduct.image_url}
                      onChange={(e) => setNewProduct({...newProduct, image_url: e.target.value})}
                      className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/20 outline-none"
                      placeholder="https://..."
                    />
                    <label className="cursor-pointer px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1 text-sm">
                      <Upload className="w-4 h-4" />
                      Upload
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const url = await handleFileUpload(file);
                            if (url) {
                              setNewProduct({...newProduct, image_url: url});
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newProduct.featured}
                    onChange={(e) => setNewProduct({...newProduct, featured: e.target.checked})}
                    className="w-4 h-4 text-brand-sage rounded focus:ring-brand-sage"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">
                    Mark as featured product
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-brand-navy text-white py-2.5 rounded-lg font-semibold hover:bg-brand-sage transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  {uploading ? 'Uploading...' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Edit Product</h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/20 outline-none"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-1 focus:ring-brand-sage/20 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-featured"
                  checked={editingProduct.featured}
                  onChange={(e) => setEditingProduct({...editingProduct, featured: e.target.checked})}
                  className="w-4 h-4 text-brand-sage rounded focus:ring-brand-sage"
                />
                <label htmlFor="edit-featured" className="text-sm text-gray-700">
                  Featured product
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUpdateProduct}
                  className="flex-1 bg-brand-sage text-white py-2.5 rounded-lg font-semibold hover:bg-brand-sage/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Add Button */}
      {!showMobileForm && (
        <button
          onClick={() => setShowMobileForm(true)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-brand-sage text-white rounded-full shadow-lg flex items-center justify-center hover:bg-brand-sage/90 transition-colors z-30"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default AdminDashboard;