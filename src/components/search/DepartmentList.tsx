import * as React from "react";
import { useState } from "react";
import { Link } from "../Breadcrumbs";

type DepartmentListProps = {
  departmentLinks?: Link[];
};

const DepartmentList = ({ departmentLinks }: DepartmentListProps) => {
  if (!departmentLinks) return <></>;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p>
        <button
          type="button"
          className="text-neutral-dark text-sm font-medium text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          Departments
        </button>
      </p>
      <div className="mt-2">
        <div className="py-1 text-base  ring-opacity-5  focus:outline-none sm:text-sm">
          {departmentLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export { DepartmentList };
