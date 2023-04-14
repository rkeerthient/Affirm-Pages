import * as React from "react";
import {
  FieldValueStaticFilter,
  provideHeadless,
  Result,
  useSearchActions,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import { useEffect } from "react";
import { Breadcrumbs, Link } from "../Breadcrumbs";
import {
  LocationBias,
  StandardFacets,
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  SearchBar,
  DropdownItem,
  FocusedItemData,
  RenderEntityPreviews,
} from "@yext/search-ui-react";
import { ProductCard } from "../cards/ProductCard";
import { DepartmentList } from "./DepartmentList";
import searchConfig from "../searchConfig";
import classNames from "classnames";
import Product from "../../types/products";

type SearchResultsProps = {
  initialFilter?: FieldValueStaticFilter;
  initialVerticalKey?: string;
  categoryName?: string;
  categoryDescription?: string;
  breadcrumbLinks?: Link[];
  subCategoryLinks?: Link[];
};

const SearchResults = ({
  breadcrumbLinks,
  subCategoryLinks,
}: SearchResultsProps) => {
  const searchActions = useSearchActions();
  const entityPreviewSearcher = provideHeadless({
    ...searchConfig,
    headlessId: "visual-autocomplete",
  });
  const renderEntityPreviews: RenderEntityPreviews = (
    autocompleteLoading,
    verticalKeyToResults: Record<string, VerticalResultsData>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ): any => {
    const productResults = verticalKeyToResults["products"]
      ?.results as unknown as Result<Product>[];
    console.log(productResults);

    return productResults ? (
      <div
        className={classNames("grid grid-cols-4 px-8 gap-8 text-center", {
          "opacity-50": autocompleteLoading,
        })}
      >
        {productResults.map((result, i) => (
          <DropdownItem
            key={result.rawData.id}
            value={result.rawData.name}
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            <>
              {result.rawData?.primaryPhoto && (
                <img
                  src={result.rawData.primaryPhoto.image.url}
                  alt=""
                  className="h-32 w-32 mx-auto"
                />
              )}
              <div className="text-sm">{result.name}</div>
            </>
          </DropdownItem>
        ))}
      </div>
    ) : null;
  };
  useEffect(() => {
    searchActions.setVertical("products");
    searchActions.executeVerticalQuery();
  }, []);
  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <SearchBar
          hideRecentSearches={true}
          visualAutocompleteConfig={{
            entityPreviewSearcher: entityPreviewSearcher,
            includedVerticals: ["products"],
            renderEntityPreviews: renderEntityPreviews,
            universalLimit: { products: 4 },
            entityPreviewsDebouncingTime: 500,
          }}
        />
        {breadcrumbLinks && breadcrumbLinks.length >= 2 && (
          <Breadcrumbs links={breadcrumbLinks} />
        )}
        <div className="flex">
          <div className="w-56 shrink-0 mr-5">
            <DepartmentList departmentLinks={subCategoryLinks} />
            <div className="w-full h-px bg-gray-200 my-4" />
            <StandardFacets
              customCssClasses={{
                standardFacetsContainer: "max-h-screen  customContainer",
              }}
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-baseline">
              <ResultsCount />
              <AppliedFilters />
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
      </div>
    </div>
  );
};

export { SearchResults };
