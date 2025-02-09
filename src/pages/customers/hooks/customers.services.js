import { addDoc } from "firebase/firestore";
import { firebaseApp } from "../../../services/firebase";
import { toast } from "react-toastify";

const customerFactory = (customer) => ({
  id: customer.id,
  ...customer,
});

function validCreateCustomer({ tradeName, cnpj, address }) {
  if (!tradeName || !cnpj || !address) {
    return true;
  }
  return false;
}

const customersServices = {
  create: async (dataCustomer) => {
    if (validCreateCustomer({ ...dataCustomer })) {
      throw new Error("Preencha todos os campos!");
    }

    try {
      const customerRef = firebaseApp.collection("customer");
      const newCustomer = await addDoc(customerRef, { ...dataCustomer });
      toast.success("Customer added successfully");

      return customerFactory({ id: newCustomer.id, ...dataCustomer });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default customersServices;
