'use client';

import { CaseType } from '@/types/caseType';
import { Edit, Trash2, User, Code, Activity, Loader2 } from 'lucide-react';

interface CaseTypeListProps {
  caseTypes: CaseType[];
  onEdit: (caseType: CaseType) => void;
  onDelete: (id: number, name: string) => void;
  loading?: boolean;
}

export default function CaseTypeList({ caseTypes, onEdit, onDelete, loading }: CaseTypeListProps) {
  if (loading) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-4" />
        <p className="text-gray-400">Loading case types...</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 border-b border-gray-700 bg-gray-700">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Code className="h-5 w-5" />
          Case Types ({caseTypes.length})
        </h2>
      </div>
      
      {caseTypes.length === 0 ? (
        <div className="p-8 text-center">
          <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No case types found</p>
          <p className="text-gray-500 text-sm mt-2">Create your first case type to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Code
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Status
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    User
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {caseTypes.map((caseType, index) => (
                <tr key={caseType.id || index} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {caseType.caseTypeCode}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {caseType.caseTypeName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {caseType.caseType}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      caseType.isActive === 'A' 
                        ? 'bg-green-800 text-green-100' 
                        : 'bg-red-800 text-red-100'
                    }`}>
                      <Activity className="h-3 w-3 mr-1" />
                      {caseType.isActive === 'A' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      {caseType.userName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(caseType)}
                        className="inline-flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs hover:bg-blue-600 transition-colors"
                      >
                        <Edit className="h-3 w-3" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      {caseType.id && (
                        <button
                          onClick={() => onDelete(caseType.id!, caseType.caseTypeName)}
                          className="inline-flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-md text-xs hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}