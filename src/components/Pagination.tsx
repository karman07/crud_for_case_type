'use client';

import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalCount: number;
  hasMore: boolean;
  loading?: boolean;
}

export default function Pagination({ currentPage, totalPages, onPageChange, pageSize, onPageSizeChange, totalCount, hasMore, loading }: PaginationProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Always show pagination if there are items, even if only 1 page
  if (totalCount === 0) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
       
        <div className="flex items-center gap-2">
          <span>Show:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            disabled={loading}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span>per page</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Previous Button - always visible */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        
        {/* Page Dropdown - only show if multiple pages */}
        {totalPages > 1 && (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Page {currentPage}
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showDropdown && (
              <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {pages.map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      onPageChange(page);
                      setShowDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors ${
                      page === currentPage
                        ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    Page {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Next Button - always visible */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasMore || loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}