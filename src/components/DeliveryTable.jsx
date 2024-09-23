import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import { CheckCircle } from 'lucide-react';

const DeliveryTable = ({ deliveries, selectedDeliveries, handleCheckboxChange, handleSelectAll, selectAll, setDeliveries }) => {
  const [columnWidths, setColumnWidths] = useState({
    select: 100,
    show: 150,
    shot: 150,
    dep: 150,
    lead: 150,
    eta: 150,
    status: 200,
  });

  const onResize = (column) => (event, { size }) => {
    setColumnWidths({
      ...columnWidths,
      [column]: size.width,
    });
  };

  const ResizableHeader = ({ onResize, width, children }) => (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th className="p-2 text-center border-2 border-white" style={{ width }}>
        {children}
      </th>
    </Resizable>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white border-collapse mx-auto">
        <thead>
          <tr className="bg-purple-500 bg-opacity-50">
            <ResizableHeader onResize={onResize('select')} width={columnWidths.select}>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
            </ResizableHeader>
            <ResizableHeader onResize={onResize('show')} width={columnWidths.show}>Show</ResizableHeader>
            <ResizableHeader onResize={onResize('shot')} width={columnWidths.shot}>Shot</ResizableHeader>
            <ResizableHeader onResize={onResize('dep')} width={columnWidths.dep}>Dep</ResizableHeader>
            <ResizableHeader onResize={onResize('lead')} width={columnWidths.lead}>Lead</ResizableHeader>
            <ResizableHeader onResize={onResize('eta')} width={columnWidths.eta}>ETA</ResizableHeader>
            <ResizableHeader onResize={onResize('status')} width={columnWidths.status}>Status</ResizableHeader>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id} className={`bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors ${delivery.delivered ? 'bg-green-500 bg-opacity-50' : ''}`}>
              <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.select }}>
                <input
                  type="checkbox"
                  checked={selectedDeliveries.includes(delivery.id)}
                  onChange={() => handleCheckboxChange(delivery.id)}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
              </td>
              <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.show }}>{delivery.show}</td>
              <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.shot }}>{delivery.shot}</td>
              <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.dep }}>{delivery.dep}</td>
              <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.lead }}>{delivery.lead}</td>
              <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.eta }}>{delivery.eta}</td>
              <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.status }}>
                {delivery.delivered ? (
                  <span className="text-green-300">Delivered</span>
                ) : (
                  <button
                    onClick={() => {
                      setDeliveries(prev => prev.map(d => d.id === delivery.id ? { ...d, delivered: true } : d));
                    }}
                    className="bg-blue-500 text-white p-1 rounded-lg hover:bg-blue-600 transition duration-300 text-xs sm:text-sm flex items-center justify-center mx-auto"
                  >
                    <CheckCircle size={14} className="mr-1" />
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryTable;