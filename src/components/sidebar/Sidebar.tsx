import React, { useState } from 'react';

interface SidebarProps {
  className?: string;
}

interface StatData {
  label: string;
  value: string;
  unit?: string;
}

interface MedicalBuildingData {
  type: string;
  count: number;
  level: number;
}

interface EquipmentData {
  type: string;
  count: number;
  level: number;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState<string>('medical');
  
  const generalStats: StatData[] = [
    { label: 'Population', value: '8,143' },
    { label: 'Area', value: '10', unit: 'km²' },
  ];

  const buildingStats: StatData[] = [
    { label: 'Total Buildings', value: '1036' },
    { label: 'Residential Building Area', value: '6', unit: 'km²' },
    { label: 'Available Building Area', value: '0.2', unit: 'km²' },
  ];

  const medicalBuildingStats: StatData[] = [
    { label: 'Medical Buildings Area', value: '2', unit: 'km²' },
  ];

  const medicalBuildings: MedicalBuildingData[] = [
    { type: 'Hospitals', count: 2, level: 3 },
    { type: 'Clinics', count: 3, level: 10 },
    { type: 'Inpatient beds', count: 800, level: 100 },
    { type: 'Emergency beds', count: 15, level: 40 },
    { type: 'ICU beds', count: 8, level: 20 },
  ];

  const equipmentItems: EquipmentData[] = [
    { type: 'MRI Scanner', count: 1, level: 1 },
    { type: 'CT Scanner', count: 2, level: 2 },
    { type: 'X-Ray Machines', count: 5, level: 5 },
    { type: 'Ultrasound Machines', count: 6, level: 7 },
    { type: 'Ventilators', count: 25, level: 40 },
  ];

  // Simulated chart data
  const chartData = [
    { color: 'bg-red-500', height: '60%' },
    { color: 'bg-orange-500', height: '80%' },
    { color: 'bg-yellow-500', height: '40%' },
    { color: 'bg-green-500', height: '90%' },
    { color: 'bg-blue-500', height: '70%' },
    { color: 'bg-indigo-500', height: '50%' },
    { color: 'bg-purple-500', height: '65%' },
  ];

  return (
    <div className={`bg-[#262626] border-l border-gray-800 w-72 overflow-y-auto ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Evaluation: <span className="text-cyan-400">Masadir Bersch</span></h2>
          <button className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>

        {/* Chart visualization */}
        <div className="mb-6">
          <div className="flex items-end h-32 space-x-1">
            {chartData.map((bar, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className={`w-full ${bar.color}`} style={{ height: bar.height }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* General stats */}
        {generalStats.map((stat, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{stat.label}:</span>
              <span className="text-white font-medium">
                {stat.value}{stat.unit && <span className="text-gray-400 ml-1">{stat.unit}</span>}
              </span>
            </div>
          </div>
        ))}

        {/* Building stats - shown when not in medical view */}
        {activeSection !== 'medical' && buildingStats.map((stat, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{stat.label}:</span>
              <span className="text-white font-medium">
                {stat.value}{stat.unit && <span className="text-gray-400 ml-1">{stat.unit}</span>}
              </span>
            </div>
          </div>
        ))}

        {/* Medical Buildings Section */}
        {activeSection === 'medical' && (
          <>
            {/* Medical stats */}
            {medicalBuildingStats.map((stat, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{stat.label}:</span>
                  <span className="text-white font-medium">
                    {stat.value}{stat.unit && <span className="text-gray-400 ml-1">{stat.unit}</span>}
                  </span>
                </div>
              </div>
            ))}

            {/* Medical Buildings Dropdown */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">Medical Buildings</span>
                <button className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="pl-4 border-l border-gray-700">
                <div className="mb-2">
                  <span className="text-gray-400">Total Medical Buildings: 5</span>
                </div>
                {medicalBuildings.map((building, index) => (
                  <div key={index} className="mb-2 flex items-center">
                    <span className="text-gray-400 mr-2">•</span>
                    <div className="flex justify-between w-full">
                      <span className="text-gray-400">{building.type}:</span>
                      <span className="text-white">
                        <span className="text-cyan-400">Type {building.count}</span>, Need {building.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment Section */}
            <div className="mb-4">
              <div className="text-white font-medium mb-2">Equipment</div>
              <div className="pl-4 border-l border-gray-700">
                {equipmentItems.map((item, index) => (
                  <div key={index} className="mb-2 flex items-center">
                    <span className="text-gray-400 mr-2">•</span>
                    <div className="flex justify-between w-full">
                      <span className="text-gray-400">{item.type}:</span>
                      <span className="text-white">
                        <span className="text-cyan-400">Type {item.count}</span>, Need {item.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Toggle buttons for different views */}
        <div className="flex space-x-2 mt-6">
          <button 
            className={`px-3 py-1 rounded text-sm ${activeSection === 'medical' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-400'}`}
            onClick={() => setActiveSection('medical')}
          >
            Medical
          </button>
          <button 
            className={`px-3 py-1 rounded text-sm ${activeSection === 'residential' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-400'}`}
            onClick={() => setActiveSection('residential')}
          >
            Residential
          </button>
          <button 
            className={`px-3 py-1 rounded text-sm ${activeSection === 'commercial' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-400'}`}
            onClick={() => setActiveSection('commercial')}
          >
            Commercial
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
