const DownloadButton = () => {
    const handleDownload = () => {
      alert("PDF download coming soon");
    };
  
    return (
      <button 
        onClick={handleDownload}
        className="bg-green-600 text-white font-semibold px-6 py-2 rounded" 
      >
        Download Timetable (PDF)
      </button>
    )
  };
  
  export default DownloadButton;