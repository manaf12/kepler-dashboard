import React, { useState } from 'react';

interface KpiTableProps {
  className?: string;
}

interface KpiData {
  id: number;
  name: string;
  description: string;
  benchmark: string;
  evaluation: string;
  score: string;
  scorePercentage: number;
}

const KpiTable: React.FC<KpiTableProps> = ({ className = '' }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // Using currentPage in pagination UI
  const [currentPage] = useState(1);
  
  // Sample KPI data
  const kpiData: KpiData[] = [
    {
      id: 1,
      name: 'Beds per 100k',
      description: 'Number of hospital beds per 100k population',
      benchmark: '500 beds',
      evaluation: '520 beds',
      score: '104%',
      scorePercentage: 104
    },
    {
      id: 2,
      name: 'ICU Beds per 100k',
      description: 'Number of ICU beds per 100k population',
      benchmark: '100 ICU beds',
      evaluation: '80 ICU beds',
      score: '80%',
      scorePercentage: 80
    }
  ];
  
  const totalKpis = kpiData.length;
  // Pagination logic would use this in a real implementation
  // const totalPages = Math.ceil(totalKpis / itemsPerPage);
  
  return (
    <div className={`bg-black bg-opacity-70 rounded-lg overflow-hidden  ${className}`}>
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-white text-lg">KPI's Used: {totalKpis}</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900">
              <th className="py-3 px-4 text-left text-gray-400 font-medium">#</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">KPI</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">KPI Description</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Benchmark</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Evaluation</th>
              <th className="py-3 px-4 text-left text-gray-400 font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {kpiData.map((kpi) => (
              <tr key={kpi.id} className="border-t border-gray-800">
                <td className="py-3 px-4 text-gray-400">{kpi.id}</td>
                <td className="py-3 px-4 text-white">{kpi.name}</td>
                <td className="py-3 px-4 text-gray-400">{kpi.description}</td>
                <td className="py-3 px-4 text-white">{kpi.benchmark}</td>
                <td className="py-3 px-4 text-green-500">{kpi.evaluation}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span className={`${kpi.scorePercentage >= 100 ? 'text-green-500' : 'text-yellow-500'}`}>
                      {kpi.score}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-gray-800 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-gray-400 mr-2">Kpi per page</span>
          <select 
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="bg-gray-800 text-white rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        
        <div className="text-gray-400">
          Showing <span className="text-white">{Math.min((currentPage - 1) * itemsPerPage + 1, totalKpis)}</span> to <span className="text-white">{Math.min(currentPage * itemsPerPage, totalKpis)}</span> of <span className="text-white">{totalKpis}</span> kpis
        </div>
      </div>
    </div>
  );
};

export default KpiTable;
