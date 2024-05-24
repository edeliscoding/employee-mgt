"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const ActiveFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(null);
  const { replace } = useRouter();

  const debouncedHandleActiveChange = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set("isActive", value);
    } else {
      params.delete("isActive");
    }
    const queryString = params.toString();
    replace(`${pathname}?${decodeURIComponent(queryString)}`);
  }, 300); // 300 milliseconds debounce delay

  const handleActiveChange = (value) => {
    setIsActive(value);
    debouncedHandleActiveChange(value);
  };

  return (
    <div>
      <div>
        <input
          type="radio"
          id="all"
          name="activeStatus"
          value="all"
          checked={isActive === null}
          onChange={() => handleActiveChange(null)}
        />
        <label htmlFor="all">All</label>
      </div>
      <div>
        <input
          type="radio"
          id="active"
          name="activeStatus"
          value="true"
          checked={isActive === "true"}
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
          checked={isActive === "false"}
          onChange={() => handleActiveChange("false")}
        />
        <label htmlFor="inactive">Inactive</label>
      </div>
    </div>
  );
};

export default ActiveFilter;
