import { get, query, ref, set, update } from "firebase/database";
import { toast } from "react-toastify";
import { firebaseApp } from "../firebase";
import { doc } from "firebase/firestore";

const ticketFactory = (call) => ({ id: call.id, ...call });
const ticketPath = (ticketId) => `tickets/${ticketId}`;

const ticketServices = {
  create: async (dataTickets) => {
    if (!JSON.stringify(dataTickets)) {
      throw new Error("Preencha os campos!");
    }

    try {
      const ticketsDoc = doc(firebaseApp.collection("tickets"));
      const callRef = ref(firebaseApp.database(), ticketPath(ticketsDoc.id));

      await set(callRef, { ...dataTickets });

      toast.success("Tickets registrado");
      return ticketFactory({ id: callRef.key, ...dataTickets });
    } catch (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  },
  update: async (ticketId, updatedTicket) => {
    try {
      const ticketUpdateRef = ref(firebaseApp.database(), ticketPath(ticketId));

      await update(ticketUpdateRef, { ...updatedTicket });

      toast.success("Tickets atualizado");
      return ticketFactory({ id: ticketUpdateRef.key, ...updatedTicket });
    } catch (error) {
      toast.error("Erro ao atualizar registro:", error.message);
      throw new Error("Erro ao atualizar registro: " + error.message);
    }
  },
  getAll: async () => {
    let tickets = [];

    try {
      const ticketsRef = ref(firebaseApp.database(), "tickets");
      const ticketsQuery = query(ticketsRef);
      const data = await get(ticketsQuery);

      data.forEach((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error("Nenhum dado disponível");
        }

        const ticket = { id: snapshot.key, ...snapshot.val() };

        tickets.push(ticket);
      });
    } catch (error) {
      throw new Error("Erro ao buscar a listagem: " + error.message);
    }

    return tickets;
  },
  getId: async (ticketId) => {
    const ticketDetailsRef = ref(firebaseApp.database(), `tickets/${ticketId}`);
    const dataTicketDetail = {};

    try {
      const data = await get(ticketDetailsRef);

      if (!data.exists()) {
        throw new Error("Não foi possível buscar os dados");
      }

      const response = ticketFactory({ id: data.key, ...data.val() });
      return Object.assign(dataTicketDetail, { ...response });
    } catch (error) {
      toast.error("Erro ao buscar registro:", error.message);
      throw error;
    }
  },
};

export default ticketServices;
