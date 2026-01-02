'use client';

import { useState } from 'react';
import { CaseType } from '@/types/caseType';
import { Save, X, Code, Type, Activity } from 'lucide-react';

interface CaseTypeFormProps {
  caseType?: CaseType;
  onSubmit: (caseType: CaseType) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function CaseTypeForm({ caseType, onSubmit, onCancel, loading }: CaseTypeFormProps) {
  const [formData, setFormData] = useState<CaseType>({
    id: caseType?.id,
    caseTypeCode: caseType?.caseTypeCode || '',
    caseTypeName: caseType?.caseTypeName || '',
    caseType: caseType?.caseType || 'Regular',
    isActive: caseType?.isActive || 'A',
    userName: caseType?.userName || 'Quality.Admin',
    loginId: caseType?.loginId || null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          {caseType ? <Save className="h-5 w-5" /> : <Code className="h-5 w-5" />}
          {caseType ? 'Update' : 'Create'} Case Type
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Code className="h-4 w-4" />
              Case Type Code
            </label>
            <input
              type="text"
              value={formData.caseTypeCode}
              onChange={(e) => setFormData({...formData, caseTypeCode: e.target.value})}
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter case type code"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Type className="h-4 w-4" />
              Case Type Name
            </label>
            <input
              type="text"
              value={formData.caseTypeName}
              onChange={(e) => setFormData({...formData, caseTypeName: e.target.value})}
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter case type name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Case Type</label>
            <select
              value={formData.caseType}
              onChange={(e) => setFormData({...formData, caseType: e.target.value})}
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="Regular">Regular</option>
              <option value="Special">Special</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Status
            </label>
            <select
              value={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.value})}
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="A">Active</option>
              <option value="I">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : (caseType ? 'Update' : 'Create')}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="flex items-center justify-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}