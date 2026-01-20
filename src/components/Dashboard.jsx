import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore';
import TicketForm from './TicketForm';
import TicketList from './TicketList';

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState({ title: '', type: 'Correctivo', priority: 'Media' });
    const [setLoading] = useState(true);

    const loadTickets = async () => {
    try {
        const q = query(collection(db, 'tickets'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const loadedTickets = [];
        querySnapshot.forEach((doc) => {
        loadedTickets.push({ id: doc.id, ...doc.data() });
        });
        setTickets(loadedTickets);
    } catch (error) {
        console.error('Error al cargar tickets:', error);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
    loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addTicket = async () => {
    if (!newTicket.title) return;
    try {
        const ticket = {
        ...newTicket,
        status: 'Abierto',
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
        };
        const docRef = await addDoc(collection(db, 'tickets'), ticket);
        setTickets([{ id: docRef.id, ...ticket }, ...tickets]);
        setNewTicket({ title: '', type: 'Correctivo', priority: 'Media' });
    } catch (error) {
        console.error('Error al agregar ticket:', error);
        alert('Error al crear el ticket');
    }
    };

    const deleteTicket = async (id) => {
    try {
        await deleteDoc(doc(db, 'tickets', id));
        setTickets(tickets.filter(t => t.id !== id));
    } catch (error) {
        console.error('Error al eliminar ticket:', error);
        alert('Error al eliminar el ticket');
    }
    };

    const toggleStatus = async (id) => {
    try {
        const ticket = tickets.find(t => t.id === id);
        const newStatus = ticket.status === 'Abierto' ? 'Resuelto' : 'Abierto';
        await updateDoc(doc(db, 'tickets', id), { status: newStatus });
        setTickets(tickets.map(t => 
        t.id === id ? { ...t, status: newStatus } : t
        ));
    } catch (error) {
        console.error('Error al actualizar ticket:', error);
        alert('Error al actualizar el estado');
    }
    };

    return (
    <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-end">
        <div>
            <h2 className="text-3xl font-bold">Gestión de Mantenimiento</h2>
            <p className="text-slate-500">Control de deuda técnica y evolutivos.</p>
        </div>
        <div className="flex gap-4 text-center">
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Total</p>
            <p className="text-xl font-bold">{tickets.length}</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Abiertos</p>
            <p className="text-xl font-bold text-blue-600">{tickets.filter(t=>t.status==='Abierto').length}</p>
            </div>
        </div>
        </div>

        <TicketForm 
        newTicket={newTicket} 
        setNewTicket={setNewTicket} 
        onAddTicket={addTicket} 
        />

        <TicketList 
        tickets={tickets} 
        onToggleStatus={toggleStatus} 
        onDelete={deleteTicket} 
        />
    </div>
    );
};

export default Dashboard;
