import { query } from "firebase/database";
import { getDocs } from "firebase/firestore";
import { firebaseApp } from "../firebase";

export async function getCustomers() {
  let customers = [];

  const customersQuery = query(firebaseApp.collection("customer"));
  const customerRef = await getDocs(customersQuery);

  if (customerRef.docs.length === 0) {
    return [{ id: "1", tradeName: "Freelance" }];
  }

  customerRef.forEach((customer) => {
    const dataCustomers = customer.data();
    customers.push({ id: customer.id, ...dataCustomers });
  });

  return customers;
}
