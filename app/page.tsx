import Image from "next/image";

import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import { fetchEmployees, fetchFilteredEmployees, fetchTeams } from "./lib/data";
import EmployeesTable from "./ui/home/table";
import Search from "./ui/home/search";
import Filtering from "./ui/home/filtering";
import EmploymentStatus from "./ui/home/activeFilter";
import ActiveFilter from "./ui/home/activeFilter";

type teamsProps = {
  teams: string[];
};

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    teams?: string;
    isActive?: boolean;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const teams = searchParams?.teams || "";
  const isActive = searchParams?.isActive;

  // const employees = await fetchFilteredEmployees(query);
  const employeeTeams = await fetchTeams();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between ml-4">
        <h1 className={`${lusitana.className} text-2xl`}>Employees Table</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 ml-4">
        {/* <Search placeholder="Search invoices..." /> */}
        {/* <CreateInvoice /> */}
        <Search placeholder="Search Employee's Name" />
      </div>
      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        {/* <Table query={query} currentPage={currentPage} /> */}
      {/* </Suspense>  */}
      <EmployeesTable
        query={query}
        currentPage={currentPage}
        teamsQuery={teams}
        isActive={isActive}
      />
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
      <div className="mt-5 flex w-full justify-center gap-16">
        <Filtering teams={employeeTeams} />
        <ActiveFilter />
      </div>
    </div>
  );
}
