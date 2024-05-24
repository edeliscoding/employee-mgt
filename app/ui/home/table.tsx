import { fetchFilteredEmployees } from "@/app/lib/data";
import Image from "next/image";
import EmployeeStatus from "./active";
// import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
// import InvoiceStatus from '@/app/ui/invoices/status';
// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
// import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function EmployeesTable({
  query,
  currentPage,
  teamsQuery,
  isActive,
}: {
  query: string;
  currentPage: number;
  teamsQuery: string;
  isActive: boolean;
}) {
  const employees = await fetchFilteredEmployees(
    query,
    currentPage,
    teamsQuery,
    isActive
  );
  console.log(employees);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {employees?.map((employee) => (
              <div
                key={employee.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={employee.image}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${employee.name}'s profile picture`}
                      />
                      <p>{employee.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{employee.email}</p>
                  </div>
                  {/* <InvoiceStatus status={invoice.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    {/* <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p> */}
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Image
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Active
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Teams
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {employees?.map((employee) => (
                <tr
                  key={employee.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={employee.image}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${employee.name}'s profile picture`}
                      /> */}
                      <p>{employee.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Image
                      src={employee.image}
                      className="rounded-full"
                      width={36}
                      height={36}
                      alt={`${employee.name}'s profile picture`}
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {employee.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* {formatCurrency(employee.amount)} */}
                    {employee.address}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* {formatDateToLocal(employee.date)} */}
                    {employee.phone}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* <InvoiceStatus status={invoice.status} /> */}
                    <EmployeeStatus status={employee.active} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {/* <div className="flex justify-end gap-3">
                        
                     <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} /> 
                    </div> */}
                    {employee.teams.map((team: string, index: number) => {
                      return index < employee.teams.length - 1
                        ? team + ", "
                        : team;
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
