import { TemplateRenderProps } from "@yext/pages/*";
import {
  provideHeadless,
  Result,
  useSearchActions,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import {
  AppliedFilters,
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
import { RetailCard } from "../cards/RetailCard";
import { ProductCard } from "../cards/ProductCard";
import PageLayout from "../page-layout";
import { API_ProdCard } from "../cards/API_ProdCard";
import Ce_brand from "../../types/brands";
import searchConfig from "../searchConfig";
import classNames from "classnames";
import Product from "../../types/products";

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
    const productResults = verticalKeyToResults["products"]
      ?.results as unknown as Result<Product>[];

    const brandResults = verticalKeyToResults["brands"]
      ?.results as unknown as Result<Ce_brand>[];
    const orderedKeys = Object.keys(verticalKeyToResults);
    const totalResultCount = Object.values(verticalKeyToResults).reduce(
      (acc, vertical) => acc + vertical.results.length,
      0
    );
    return productResults ? (
      <div
        className={classNames("flex flex-col gap-2", {
          "opacity-50": autocompleteLoading,
        })}
      >
        {orderedKeys.map((key) => {
          if (key === "brands" && brandResults) {
            return (
              <div key="brands" className="p-4 border-right-2">
                <p className="mb-4 font-bold">Brands</p>
                {brandResults.map((result) => (
                  <div key={result.id} className="mb-4">
                    {/* <a
                      className=" text-sm hover:underline"
                      href={result?.rawData?.slug}
                    > */}
                    {result.name}
                    {/* </a> */}
                  </div>
                ))}
              </div>
            );
          }
          if (key === "api_products" && brandResults) {
            return (
              <div key="api_products" className="p-4 border-right-2">
                <p className="mb-4 font-bold">Products</p>
                <div className="grid grid-cols-4 gap-4">
                  {productResults.map((result) => (
                    <div key={result.id} className="mb-4">
                      {result.rawData.photoGallery && (
                        <img
                          src={result.rawData?.photoGallery[2]?.image.url}
                          alt=""
                          className="h-32 w-32 mx-auto"
                        />
                      )}
                      <div className="text-sm">{result.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        })}
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
