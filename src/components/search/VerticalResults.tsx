import * as React from "react";
import {
  AppliedFilters,
  LocationBias,
  NumericalFacets,
  Pagination,
  ResultsCount,
  StandardCard,
  StandardFacets,
  VerticalResults,
  VerticalResults as VR,
} from "@yext/search-ui-react";
import { universalResultsConfig } from "./UniversalResults";
import { useSearchState } from "@yext/search-headless-react";
import { DepartmentList } from "./DepartmentList";
import { Link } from "../Breadcrumbs";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ProductCard } from "../cards/ProductCard";
import { SortDropdown } from "./SortDropdown";

type VerticalResultsProps = {
  verticalKey: string;
  categoryDescription?: string;
  categoryName?: string;
  subCategoryLinks?: Link[];
};

const VerticalResultss = ({
  verticalKey,
  categoryDescription,
  categoryName,
  subCategoryLinks,
}: VerticalResultsProps) => {
  const [showResults, setShowResults] = useState(false);

  const resultsCount = useSearchState((state) => state.vertical.resultsCount);

  return (
    <div className="flex">
      <div className="w-1/5 shrink-0 mr-5 ">
        <DepartmentList departmentLinks={subCategoryLinks} />
        {subCategoryLinks && <div className="w-full h-px bg-gray-200 my-4" />}
        <StandardFacets
          customCssClasses={{
            standardFacetsContainer: "max-h-screen  customContainer",
          }}
        />
      </div>
      <div className="flex-grow ">
        <div className={twMerge(verticalKey === "products" && " ")}>
          {categoryName !== "home" && (
            <>
              <div className="flex justify-between my-2.5">
                <div className="flex space-x-4 items-center flex-1">
                  <h2 className="text-2xl font-semibold">{categoryName}</h2>
                  <p className="text-xs text-gray-500">{`(${resultsCount} Results)`}</p>
                </div>
                <SortDropdown></SortDropdown>
              </div>
              {categoryDescription && (
                <p className="text-lg text-gray-500 mb-2.5">
                  {categoryDescription}
                </p>
              )}
            </>
          )}
        </div>
        <div className="flex justify-between">
          <AppliedFilters hiddenFields={["subCategoryLinks"]}></AppliedFilters>
        </div>

        <VerticalResults
          customCssClasses={{
            verticalResultsContainer: "grid grid-cols-3 gap-4",
          }}
          CardComponent={ProductCard}
        />

        <div className="mt-8">
          <Pagination />
          <LocationBias />
        </div>
      </div>
    </div>

    // <div className="flex py-4">
    //   {verticalKey === "products" && (
    //     <div className="w-1/5 mt-12 mr-4">
    //       <DepartmentList departmentLinks={subCategoryLinks} />
    //       <div className="w-full h-px bg-gray-200 my-4" />
    //       <StandardFacets excludedFieldIds={["c_parentCategory.name"]} />
    //     </div>
    //   )}
    //   <div className={twMerge(verticalKey === "products" && "w-4/5")}>
    //     {categoryName !== "home" && (
    //       <>
    //         <div className="flex justify-between my-2.5">
    //           <div className="flex space-x-4 items-center">
    //             <h2 className="text-2xl font-semibold">{categoryName}</h2>
    //             <p className="text-xs text-gray-500">{`(${resultsCount} Results)`}</p>
    //           </div>
    //         </div>
    //         {categoryDescription && (
    //           <p className="text-lg text-gray-500 mb-2.5">
    //             {categoryDescription}
    //           </p>
    //         )}
    //       </>
    //     )}
    //     <VR
    //       customCssClasses={{
    //         verticalResultsContainer:
    //           verticalKey === "products"
    //             ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
    //             : verticalKey === "articles"
    //             ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
    //             : verticalKey === "product_category"
    //             ? "flex flex-row gap-4 justify-evenly"
    //             : "",
    //       }}
    //       CardComponent={ProductCard}
    //     />
    //     <Pagination
    //       customCssClasses={{
    //         paginationContainer: "pt-12 pb-4",
    //         selectedLabel: "bg-gray-900 text-white",
    //       }}
    //     />
    //   </div>
    // </div>
  );
};

export { VerticalResultss };
