"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const ActiveFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isActive, setIsActive] = useState<boolean | "all">("all");
  const { replace } = useRouter();

  const debouncedHandleActiveChange = useDebouncedCallback(
    (value: boolean | "all") => {
      const params = new URLSearchParams(searchParams);
      if (value !== "all") {
        params.set("isActive", String(value));
      } else {
        params.delete("isActive");
      }
      const queryString = params.toString();
      replace(`${pathname}?${decodeURIComponent(queryString)}`);
    },
    300
  ); // 300 milliseconds debounce delay

  const handleActiveChange = (value: string) => {
    const booleanValue =
      value === "true" ? true : value === "false" ? false : "all";
    setIsActive(booleanValue);
    debouncedHandleActiveChange(booleanValue);
  };

  return (
    <div className="mt-6">
      <h2 className="text-gray-800 text-md pb-2">
        Filter by Employment Status
      </h2>
      <div>
        <input
          type="radio"
          id="all"
          name="activeStatus"
          value="all"
          checked={isActive === "all"}
          onChange={() => handleActiveChange("all")}
        />
        <label htmlFor="all">All</label>
      </div>
      <div>
        <input
          type="radio"
          id="active"
          name="activeStatus"
          value="true"
          checked={isActive === true}
          onChange={() => handleActiveChange("true")}
        />
        <label htmlFor="active">Active</label>
      </div>
      <div>
        <input
          type="radio"
          id="inactive"
          name="activeStatus"
          value="false"
          checked={isActive === false}
          onChange={() => handleActiveChange("false")}
        />
        <label htmlFor="inactive">Inactive</label>
      </div>
    </div>
  );
};

export default ActiveFilter;
