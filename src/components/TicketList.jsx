import React from 'react';
import TicketItem from './TicketItem';

const TicketList = ({ tickets, onToggleStatus, onDelete }) => {
  if (tickets.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl py-20 text-center text-slate-400">
        El backlog está vacío. ¡Buen trabajo!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {tickets.map(ticket => (
        <TicketItem 
          key={ticket.id} 
          ticket={ticket} 
          onToggleStatus={onToggleStatus} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default TicketList;
