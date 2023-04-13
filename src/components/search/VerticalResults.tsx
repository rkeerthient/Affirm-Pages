import * as React from "react";
import {
  NumericalFacets,
  Pagination,
  StandardCard,
  StandardFacets,
  VerticalResults as VR,
} from "@yext/search-ui-react";
import { universalResultsConfig } from "./UniversalResults";
import { useSearchState } from "@yext/search-headless-react";
import { DepartmentList } from "./DepartmentList";
import { Link } from "../Breadcrumbs";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type VerticalResultsProps = {
  verticalKey: string;
  categoryDescription?: string;
  categoryName?: string;
  subCategoryLinks?: Link[];
};

const VerticalResults = ({
  verticalKey,
  categoryDescription,
  categoryName,
  subCategoryLinks,
}: VerticalResultsProps) => {
  const CardComponent =
    universalResultsConfig[verticalKey]?.CardComponent || StandardCard;
 
  const [showResults, setShowResults] = useState(false);

  const resultsCount = useSearchState((state) => state.vertical.resultsCount);

  return (
    <div className="flex py-4">
      {verticalKey === "products" && (
        <div className="w-1/5 mt-12 mr-4">
          <DepartmentList departmentLinks={subCategoryLinks} />
          <div className="w-full h-px bg-gray-200 my-4" />
          <StandardFacets excludedFieldIds={["c_parentCategory.name"]} />
        </div>
      )}
      <div className={twMerge(verticalKey === "products" && "w-4/5")}>
        {categoryName !== "home" && (
          <>
            <div className="flex justify-between my-2.5">
              <div className="flex space-x-4 items-center">
                <h2 className="text-2xl font-semibold">{categoryName}</h2>
                <p className="text-xs text-gray-500">{`(${resultsCount} Results)`}</p>
              </div>
            </div>
            {categoryDescription && (
              <p className="text-lg text-gray-500 mb-2.5">
                {categoryDescription}
              </p>
            )}
          </>
        )}
        <VR
          customCssClasses={{
            verticalResultsContainer:
              verticalKey === "products"
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                : verticalKey === "articles"
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
                : verticalKey === "product_category"
                ? "flex flex-row gap-4 justify-evenly"
                : "",
          }}
          CardComponent={CardComponent}
        />
        <Pagination
          customCssClasses={{
            paginationContainer: "pt-12 pb-4",
            selectedLabel: "bg-gray-900 text-white",
          }}
        />
      </div>
    </div>
  );
};

export { VerticalResults };
