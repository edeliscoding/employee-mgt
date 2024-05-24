import supabase from "./supabase";

import { unstable_noStore as noStore } from "next/cache";

export async function fetchEmployees() {
  let { data, error } = await supabase.from("employees").select("*");
  if (error) {
    console.log(error);
    throw new Error("failed to fetch Employees");
  }
  return data;
}

const ITEMS_PER_PAGE = 8;
// export async function fetchFilteredEmployees(
//   query: string,
//   currentPage: number,
//   teamsQuery: string
// ) {
//   noStore();
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;
//   let teamsArray: string[] = []; // Initialize teamsArray outside the if block

//   if (teamsQuery) {
//     teamsArray = teamsQuery.split(",");
//   }

//   try {
//     let { data, error } = await supabase
//       .from("employees")
//       .select("*")
//       .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
//       .in("teams", teamsArray)
//       .range(offset, offset + ITEMS_PER_PAGE - 1);
//     if (error) {
//       throw error;
//     }
//     return data;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch Employees.");
//   }
// }

export async function fetchFilteredEmployees(
  query: string,
  currentPage: number,
  teamsQuery: string,
  isActive: boolean
) {
  //   console.log(teamsQuery);
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    let queryBuilder = supabase
      .from("employees")
      .select("*")
      .or(`name.ilike.%${query}%,email.ilike.%${query}%`);

    // Conditionally apply the overlaps filter if teamsQuery is not empty
    if (teamsQuery) {
      queryBuilder = queryBuilder.overlaps("teams", teamsQuery.split(","));
    }

    if (isActive) {
      queryBuilder = queryBuilder.eq("active", isActive);
    }

    const { data, error } = await queryBuilder.range(
      offset,
      offset + ITEMS_PER_PAGE - 1
    );

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Employees.");
  }
}
export async function fetchTeams() {
  noStore();
  try {
    let { data, error } = await supabase.from("employees").select("teams");
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Teams.");
  }
}
