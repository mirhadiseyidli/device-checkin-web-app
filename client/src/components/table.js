import React, { useEffect, useState } from "react";
const moment = require('moment');

function Table({ searchTerm }) {
  const [backendData, setBackendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetch("/api/devices")
      .then(response => {
        console.log("Response received:", response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data);
        setBackendData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch:', error);
        setLoading(false);
      });
  }, []);

  const isStale = (lastUpdated) => {
    const ninetySecondsAgo = moment().subtract(90, 'seconds');
    return moment(lastUpdated).isBefore(ninetySecondsAgo);
  };

  const filteredData = backendData.filter(device =>
    device.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.ip.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const emptyRows = itemsPerPage - displayedData.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <div className="table">
          {loading ? (
            <>
              <div className="table-row table-header">
                <div className="table-cell">Hostname</div>
                <div className="table-cell">IP Address</div>
                <div className="table-cell">IP Last Updated</div>
                <div className="table-cell">Status</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Loading...</div>
              </div>
            </>
          ) : (
            <>
              <div className="table-row table-header">
                <div className="table-cell">Hostname</div>
                <div className="table-cell">IP Address</div>
                <div className="table-cell">Last Updated</div>
                <div className="table-cell">Status</div>
              </div>
              {displayedData.length > 0 ? (
                <>
                  {displayedData.map(device => {
                    const status = isStale(device.lastUpdated) ? "Offline" : device.status || "unknown";
                    return (
                    <div className="table-row" key={device._id}>
                      <div className="table-cell">{device.hostname}</div>
                      <div className="table-cell">{device.ip}</div>
                      <div className="table-cell">{moment(device.lastUpdated).format('hh:mmA MM.DD.YY')}</div>
                      <div className="table-cell">
                        <p className={`deviceStatus ${status.toLowerCase()}`}>
                          {status}
                        </p>
                      </div>
                    </div>
                    );
                  })}
                  {[...Array(emptyRows)].map((_, index) => (
                    <div className="table-row" key={`empty-${index}`}>
                      <div className="table-cell">&nbsp;</div>
                      <div className="table-cell">&nbsp;</div>
                      <div className="table-cell">&nbsp;</div>
                      <div className="table-cell">&nbsp;</div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="table-row">
                    <div className="table-cell">No Matches Found</div>
                    <div className="table-cell">&nbsp;</div>
                    <div className="table-cell">&nbsp;</div>
                    <div className="table-cell">&nbsp;</div>
                  </div>
                  {[...Array(19)].map((_, index) => (
                    <div className="table-row" key={`empty-${index}`}>
                      <div className="table-cell">&nbsp;</div>
                      <div className="table-cell">&nbsp;</div>
                      <div className="table-cell">&nbsp;</div>
                      <div className="table-cell">&nbsp;</div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {!loading && totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button key={index}
                    className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );  
};

export default Table;
