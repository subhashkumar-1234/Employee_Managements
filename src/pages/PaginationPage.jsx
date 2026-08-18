import React, { useState, useMemo } from 'react';

// A mock dataset of 25 products
const mockProducts = Array.from({ length: 25 }, (_, idx) => {
  const categories = ['Electronics', 'Home & Kitchen', 'Apparel', 'Fitness', 'Office Supplies'];
  const prices = [99.99, 49.50, 19.99, 299.00, 14.95, 89.00, 5.99, 120.00];
  const id = idx + 1;
  return {
    id,
    sku: `PROD-${1000 + id}`,
    name: `Premium Product ${id}`,
    category: categories[id % categories.length],
    price: prices[id % prices.length],
    stock: (id * 7) % 45 + 5
  };
});

const PaginationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Reset page when pageSize changes
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  // Calculate pages
  const totalPages = Math.ceil(mockProducts.length / pageSize);

  // Get current page items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return mockProducts.slice(startIndex, endIndex);
  }, [currentPage, pageSize]);

  // Generate range of pages
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, mockProducts.length);

  return (
    <div className="view-container">
      <h1 className="view-title">Table Pagination</h1>
      <p className="view-description">
        Demonstrating table data splitting, previous/next states, page buttons, and custom row configuration.
      </p>

      <div className="pagination-settings">
        <div className="page-size-selector">
          <span>Show</span>
          <select
            className="form-control select-inline"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          <span>entries</span>
        </div>

        <div className="pagination-info">
          Showing <strong>{startEntry}</strong> to <strong>{endEntry}</strong> of {mockProducts.length} entries
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>ID</th>
              <th style={{ width: '20%' }}>SKU</th>
              <th style={{ width: '35%' }}>Product Name</th>
              <th style={{ width: '20%' }}>Category</th>
              <th style={{ width: '15%', textAlign: 'right' }}>Price</th>
              <th style={{ width: '10%', textAlign: 'center' }}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td><code className="sku-code">{prod.sku}</code></td>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td style={{ textAlign: 'right' }}>${prod.price.toFixed(2)}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`stock-level ${prod.stock < 10 ? 'low' : ''}`}>{prod.stock}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls-wrapper">
        <button
          className="btn-pagination-nav"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        >
          &laquo; Previous
        </button>

        <div className="pagination-numbers">
          {pageNumbers.map((num) => (
            <button
              key={num}
              className={`btn-page-number ${currentPage === num ? 'active' : ''}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          className="btn-pagination-nav"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default PaginationPage;
