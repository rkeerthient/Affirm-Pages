import { TemplateRenderProps } from "@yext/pages/*";
import {
  provideHeadless,
  Result,
  useSearchActions,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import {
  AppliedFilters,
  DropdownItem,
  FocusedItemData,
  LocationBias,
  Pagination,
  RenderEntityPreviews,
  ResultsCount,
  SearchBar,
  SpellCheck,
  StandardFacets,
  VerticalResults,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import PageLayout from "../page-layout";
import { API_ProdCard } from "../cards/API_ProdCard";
import searchConfig from "../searchConfig";
import classNames from "classnames";
import API_Product from "../../types/api_products";

const API_ProdResults = ({ document }: TemplateRenderProps) => {
  const { _site } = document;
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
    const productResults = verticalKeyToResults["api_products"]
      ?.results as unknown as Result<API_Product>[];

    return productResults ? (
      <div
        className={classNames("grid grid-cols-4 px-8 gap-8", {
          "opacity-50": autocompleteLoading,
        })}
      >
        {productResults.map((result, i) => (
          <DropdownItem
            key={result.rawData.id}
            value={result.rawData.name}
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            <a href={result.rawData.slug}>
              {result.rawData.photoGallery && (
                <img
                  src={result.rawData.photoGallery[1].image.url}
                  alt=""
                  className="h-32 w-32 mx-auto"
                />
              )}
              <div className="text-sm">{result.name}</div>
            </a>
          </DropdownItem>
        ))}
      </div>
    ) : null;
  };

  useEffect(() => {
    searchActions.setVertical("api_products");
    searchActions.executeVerticalQuery();
  });

  return (
    <PageLayout _site={_site}>
      <div className="max-w-7xl mx-auto">
        <SearchBar
          hideRecentSearches={true}
          visualAutocompleteConfig={{
            entityPreviewSearcher: entityPreviewSearcher,
            includedVerticals: ["api_products"],
            renderEntityPreviews: renderEntityPreviews,
            universalLimit: { api_products: 4 },
            entityPreviewsDebouncingTime: 500,
          }}
        />
        <div className="flex">
          <div className="w-56 shrink-0 mr-5">
            <StandardFacets />
          </div>
          <div className="flex-grow">
            <SpellCheck></SpellCheck>
            <div className="flex items-baseline">
              <ResultsCount />
              <AppliedFilters />
            </div>
            <VerticalResults
              customCssClasses={{
                verticalResultsContainer: "grid grid-cols-3 gap-4",
              }}
              CardComponent={API_ProdCard}
            />
            <div className="mt-8">
              <Pagination />
              <LocationBias />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default API_ProdResults;
