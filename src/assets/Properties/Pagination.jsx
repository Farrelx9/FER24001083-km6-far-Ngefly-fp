import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      return pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${
            currentPage === number ? "bg-[#9DDE8B]" : ""
          } text-black font-semibold rounded-full p-2 lg:text-xl focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769]`}
        >
          {number}
        </button>
      ));
    }

    const startPages = pageNumbers.slice(0, 3);
    const endPages = pageNumbers.slice(totalPages - 3, totalPages);
    const middlePages = pageNumbers.slice(currentPage - 2, currentPage + 1);

    return (
      <>
        {startPages.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`${
              currentPage === number ? "bg-[#9DDE8B]" : ""
            } text-black font-semibold rounded-full p-2 lg:text-xl focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769]`}
          >
            {number}
          </button>
        ))}
        {currentPage > 4 && <span>...</span>}
        {middlePages.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`${
              currentPage === number ? "bg-[#9DDE8B]" : ""
            } text-black font-semibold rounded-full p-2 lg:text-xl focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769]`}
          >
            {number}
          </button>
        ))}
        {currentPage < totalPages - 3 && <span>...</span>}
        {endPages.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`${
              currentPage === number ? "bg-[#9DDE8B]" : ""
            } text-black font-semibold rounded-full p-2 lg:text-xl focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769]`}
          >
            {number}
          </button>
        ))}
      </>
    );
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-transparent text-black font-semibold rounded-full p-2 lg:text-xl focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769] disabled:opacity-50"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-transparent text-black font-semibold rounded-full p-2 lg:text-xl focus:outline-none focus:ring transition-colors duration-300 hover:bg-[#006769] active:bg-[#006769] disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
