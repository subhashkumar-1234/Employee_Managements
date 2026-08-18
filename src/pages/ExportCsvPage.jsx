import React from 'react';

const mockTransactions = [
  { id: 'TX-1001', customer: 'Rajesh Sharma', item: 'Dell Laptop Core i7', amount: 899.99, date: '2026-06-25', status: 'Completed' },
  { id: 'TX-1002', customer: 'Sarah Connor', item: 'Mechanical Keyboard', amount: 129.50, date: '2026-06-27', status: 'Pending' },
  { id: 'TX-1003', customer: 'Vijay Kumar', item: 'UltraWide Gaming Monitor', amount: 349.00, date: '2026-06-28', status: 'Completed' },
  { id: 'TX-1004', customer: 'Amanda Waller', item: 'Ergonomic Desk Chair', amount: 219.00, date: '2026-06-29', status: 'Refunded' },
  { id: 'TX-1005', customer: 'David Beckham', item: 'Noise Cancelling Headphones', amount: 199.99, date: '2026-06-30', status: 'Completed' },
  { id: 'TX-1006', customer: 'Pooja Hegde', item: 'USB-C Hub Multiport', amount: 45.00, date: '2026-07-01', status: 'Completed' }
];

const ExportCsvPage = () => {
  const exportToCSV = () => {
    // CSV Headers
    const headers = ['Transaction ID', 'Customer Name', 'Purchased Item', 'Amount ($)', 'Date', 'Status'];

    // Map rows
    const rows = mockTransactions.map((tx) => [
      tx.id,
      `"${tx.customer.replace(/"/g, '""')}"`, // escape quotes
      `"${tx.item.replace(/"/g, '""')}"`,
      tx.amount,
      tx.date,
      tx.status
    ]);

    // Construct content
    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    // Create file blob and click anchor
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="view-container">
      <div className="export-header-section">
        <div>
          <h1 className="view-title">Export Data to CSV</h1>
          <p className="view-description">
            View recent store transactions and export them directly to a standard CSV file for spreadsheets.
          </p>
        </div>
        <button className="btn btn-export-csv" onClick={exportToCSV}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Export CSV Spreadsheet
        </button>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '15%' }}>Transaction ID</th>
              <th style={{ width: '25%' }}>Customer</th>
              <th style={{ width: '30%' }}>Item Description</th>
              <th style={{ width: '15%', textAlign: 'right' }}>Amount</th>
              <th style={{ width: '15%' }}>Date</th>
              <th style={{ width: '10%', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx) => (
              <tr key={tx.id}>
                <td><strong className="tx-id">{tx.id}</strong></td>
                <td>{tx.customer}</td>
                <td>{tx.item}</td>
                <td style={{ textAlign: 'right' }}>${tx.amount.toFixed(2)}</td>
                <td>{tx.date}</td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`badge-status ${tx.status.toLowerCase()}`}>{tx.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExportCsvPage;
