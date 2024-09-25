import React, { useState, useMemo } from 'react';
import { Resizable } from 'react-resizable';
import { CheckCircle } from 'lucide-react';

const DeliveryTable = ({ deliveries, selectedDeliveries, handleCheckboxChange, handleSelectAll, selectAll, setDeliveries }) => {
  const [columnWidths, setColumnWidths] = useState({
    select: 50,
    show: 100,
    shot: 100,
    dep: 100,
    lead: 100,
    eta: 100,
    status: 150,
  });

  const onResize = (column) => (event, { size }) => {
    setColumnWidths({
      ...columnWidths,
      [column]: size.width,
    });
  };

  const ResizableHeader = React.memo(({ onResize, width, children }) => (
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
  ));

  const DeliveryRow = React.memo(({ delivery, isSelected, onCheckboxChange, onMarkDelivered }) => (
    <tr className={`transition-colors duration-300 ease-in-out ${
      delivery.delivered ? 'bg-green-500 bg-opacity-70' : 'bg-white bg-opacity-10 hover:bg-opacity-20'
    }`}>
      <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.select }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onCheckboxChange(delivery.id)}
          className="form-checkbox h-4 w-4 text-purple-600"
        />
      </td>
      <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.show }}>{delivery.show}</td>
      <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.shot }}>{delivery.shot}</td>
      <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.dep }}>{delivery.dep}</td>
      <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.lead }}>{delivery.lead}</td>
      <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.eta }}>{delivery.eta}</td>
      <td className="p-2 border-2 border-white text-center" style={{ width: columnWidths.status }}>
        {delivery.delivered ? (
          <span className="text-white font-semibold">Delivered</span>
        ) : (
          <button
            onClick={() => onMarkDelivered(delivery.id)}
            className="bg-blue-500 text-white p-1 rounded-lg hover:bg-blue-600 transition duration-300 text-xs flex items-center justify-center mx-auto"
          >
            <CheckCircle size={12} className="mr-1" />
            Mark Delivered
          </button>
        )}
      </td>
    </tr>
  ));

  const memoizedDeliveries = useMemo(() => deliveries, [deliveries]);

  return (
    <div className="overflow-x-auto w-full">
      <div className="min-w-[700px]">
        <table className="w-full text-white border-collapse mx-auto text-xs sm:text-sm">
          <thead>
            <tr className="bg-purple-500 bg-opacity-50">
              <ResizableHeader onResize={onResize('select')} width={columnWidths.select}>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="form-checkbox h-4 w-4 text-purple-600"
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
            {memoizedDeliveries.map((delivery) => (
              <DeliveryRow
                key={delivery.id}
                delivery={delivery}
                isSelected={selectedDeliveries.includes(delivery.id)}
                onCheckboxChange={handleCheckboxChange}
                onMarkDelivered={(id) => {
                  setDeliveries(prev => prev.map(d => d.id === id ? { ...d, delivered: true } : d));
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(DeliveryTable);
