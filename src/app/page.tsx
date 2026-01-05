'use client';

import { useState, useEffect } from 'react';
import { CaseType } from '@/types/caseType';
import { createCaseType, updateCaseType, getCaseTypes, deleteCaseType } from '@/lib/api';
import { Toaster, toast } from 'react-hot-toast';
import { Plus, RefreshCw } from 'lucide-react';
import CaseTypeForm from '@/components/CaseTypeForm';
import CaseTypeList from '@/components/CaseTypeList';
import ConfirmDialog from '@/components/ConfirmDialog';
import Pagination from '@/components/Pagination';

export const dynamic = 'force-dynamic';

export default function Home() {
  const [caseTypes, setCaseTypes] = useState<CaseType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCaseType, setEditingCaseType] = useState<CaseType | undefined>();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; id?: number; name?: string }>({
    isOpen: false
  });
  const [editDialog, setEditDialog] = useState<{ isOpen: boolean; caseType?: CaseType }>({
    isOpen: false
  });

  useEffect(() => {
    loadCaseTypes(1);
  }, []);

  const loadCaseTypes = async (page: number = currentPage, size?: number) => {
    try {
      setLoading(true);
      const data = await getCaseTypes(page, size || pageSize);
      setCaseTypes(data.items);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setTotalCount(data.totalCount);
      setHasMore(data.hasMore);
      toast.success('Case types loaded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to load case types, using local sample data');
      const sampleData: CaseType[] = [
        {
          id: 1,
          caseTypeCode: 'SAMPLE_001',
          caseTypeName: 'Sample Case Type 1',
          caseType: 'Regular',
          isActive: 'A',
          userName: 'Quality.Admin',
          loginId: null
        },
        {
          id: 2,
          caseTypeCode: 'SAMPLE_002',
          caseTypeName: 'Sample Case Type 2',
          caseType: 'Special',
          isActive: 'I',
          userName: 'Quality.Admin',
          loginId: null
        }
      ];
      setCaseTypes(sampleData);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadCaseTypes(page);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
    loadCaseTypes(1, newSize);
  };

  const handleSubmit = async (caseType: CaseType) => {
    try {
      setLoading(true);
      if (editDialog.caseType) {
        const toUpdate = { ...caseType, id: editDialog.caseType.id };
        const resp = await updateCaseType(toUpdate);
        if (resp?.statusCode === 'S') {
          toast.success(resp.message || 'Case type updated successfully!');
          loadCaseTypes(currentPage);
        } else {
          toast.error(resp?.message || 'Failed to update case type');
        }
      } else {
        const resp = await createCaseType(caseType);
        if (resp?.statusCode === 'S') {
          toast.success(resp.message || 'Case type created successfully!');
          loadCaseTypes(1);
        } else {
          toast.error(resp?.message || 'Failed to create case type');
        }
      }
      setShowForm(false);
      setEditDialog({ isOpen: false });
    } catch (error) {
      console.error(error);
      toast.error('Failed to save case type');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (caseType: CaseType) => {
    setEditDialog({ isOpen: true, caseType });
  };

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteDialog({ isOpen: true, id, name });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.id) return;
    
    try {
      setLoading(true);
      const resp = await deleteCaseType(deleteDialog.id);
      if (resp?.statusCode === 'S') {
        toast.success(resp.message || 'Case type deleted successfully!');
        loadCaseTypes(currentPage);
      } else {
        toast.error(resp?.message || 'Failed to delete case type');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete case type');
    } finally {
      setLoading(false);
      setDeleteDialog({ isOpen: false });
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditDialog({ isOpen: false });
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#374151',
            color: '#ffffff',
          },
        }}
      />
      
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Case Type Management
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => loadCaseTypes(currentPage)}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
             
            </div>
          </div>

          {/* Create Button */}
          <div className="mb-6">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors shadow-md"
              >
                <Plus className="h-4 w-4" />
                Create New Case Type
              </button>
            )}
          </div>

          {/* Form */}
          {showForm && (
            <div className="mb-6">
              <CaseTypeForm
                caseType={editingCaseType}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={loading}
              />
            </div>
          )}

          {/* List with Pagination */}
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
            <CaseTypeList
              caseTypes={caseTypes}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              loading={loading}
            />
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              totalCount={totalCount}
              hasMore={hasMore}
              loading={loading}
            />
          </div>

          {/* Delete Confirmation Dialog */}
          <ConfirmDialog
            isOpen={deleteDialog.isOpen}
            title="Delete Case Type"
            message={`Are you sure you want to delete "${deleteDialog.name}"? This action cannot be undone.`}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteDialog({ isOpen: false })}
          />

          {/* Edit Dialog */}
          {editDialog.isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white">Edit Case Type</h3>
                </div>
                <div className="p-6">
                  <CaseTypeForm
                    caseType={editDialog.caseType}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}