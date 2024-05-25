// "use client";
// import { usePathname, useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { useDebouncedCallback } from "use-debounce";

// type Team = {
//   teams: string[];
// };

// type FilteringProps = {
//   teams: string[];
// };

// const Filtering: React.FC<FilteringProps> = ({
//   teams: data,
// }: {
//   teams: string[];
// }) => {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();
//   //   const router = useRouter();
//   const [selectedTeams, setSelectedTeams] = useState(new Set());

//   // Step 1: Extract and Flatten Teams
//   const allTeams = data.map((item) => item.teams).flat();

//   // Step 2: Remove Duplicates
//   const uniqueTeams = [...new Set(allTeams)];

//   //   const debouncedHandleTeamsChange = useDebouncedCallback((newSet) => {
//   //     if (newSet.size > 0) {
//   //       params.set("teams", Array.from(newSet).join(","));
//   //     } else {
//   //       params.delete("teams");
//   //     }
//   //     router.push({ query: params.toString() });
//   //   }, 300); // 300 milliseconds debounce delay

//   const debouncedHandleTeamsChange = useDebouncedCallback((newSet) => {
//     const params = new URLSearchParams(searchParams);
//     params.set("page", "1");
//     if (newSet.size > 0) {
//       params.set("teams", Array.from(newSet).join(","));
//     } else {
//       params.delete("teams");
//     }
//     // replace(`${pathname}?${params.toString()}`);
//     const queryString = params.toString();
//     replace(`${pathname}?${decodeURIComponent(queryString)}`);
//   }, 300);

//   const handleTeamsChange = (team: string) => {
//     const newSet = new Set(selectedTeams);
//     if (newSet.has(team)) {
//       newSet.delete(team);
//     } else {
//       newSet.add(team);
//     }
//     setSelectedTeams(newSet);
//     debouncedHandleTeamsChange(newSet);
//   };
//   return (
//     <div>
//       <h2>Filter by Teams</h2>
//       {uniqueTeams.map((team, index) => (
//         <div key={index}>
//           <input
//             type="checkbox"
//             id={team}
//             name={team}
//             value={team}
//             onChange={() => handleTeamsChange(team)}
//           />
//           <label htmlFor={team} className="p-2">
//             {team}
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default Filtering;

"use client";
import { fetchTeams } from "@/app/lib/data";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type Team = {
  teams: string[];
};

type FilteringProps = {
  teams: string[];
};
const Filtering: React.FC<FilteringProps> = ({ teams: data }) => {
  console.log(data);
  // const employeeTeams = await fetchTeams();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  //   const router = useRouter();
  const [selectedTeams, setSelectedTeams] = useState(new Set());

  // Step 1: Extract and Flatten Teams
  // const allTeams = data.map((item) => item.teams).flat();

  // Step 2: Remove Duplicates
  const uniqueData = new Set(data);
  // console.log(uniqueData);
  const uniqueTeams = [...new Set(uniqueData)];

  //   const debouncedHandleTeamsChange = useDebouncedCallback((newSet) => {
  //     if (newSet.size > 0) {
  //       params.set("teams", Array.from(newSet).join(","));
  //     } else {
  //       params.delete("teams");
  //     }
  //     router.push({ query: params.toString() });
  //   }, 300); // 300 milliseconds debounce delay

  const debouncedHandleTeamsChange = useDebouncedCallback((newSet) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (newSet.size > 0) {
      params.set("teams", Array.from(newSet).join(","));
    } else {
      params.delete("teams");
    }
    // replace(`${pathname}?${params.toString()}`);
    const queryString = params.toString();
    replace(`${pathname}?${decodeURIComponent(queryString)}`);
  }, 300);

  const handleTeamsChange = (team: string) => {
    const newSet = new Set(selectedTeams);
    if (newSet.has(team)) {
      newSet.delete(team);
    } else {
      newSet.add(team);
    }
    setSelectedTeams(newSet);
    debouncedHandleTeamsChange(newSet);
  };
  return (
    <div>
      <h2>Filter by Teams</h2>
      {uniqueTeams.map((team, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={team}
            name={team}
            value={team}
            onChange={() => handleTeamsChange(team)}
          />
          <label htmlFor={team} className="p-2">
            {team}
          </label>
        </div>
      ))}
    </div>
  );
};
export default Filtering;
