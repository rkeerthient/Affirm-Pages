import { TemplateRenderProps } from "@yext/pages/*";
import { useSearchActions } from "@yext/search-headless-react";
import {
  AppliedFilters,
  LocationBias,
  Pagination,
  ResultsCount,
  SearchBar,
  StandardFacets,
  VerticalResults,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import { RetailCard } from "../cards/RetailCard";
import { ProductCard } from "../cards/ProductCard";
import PageLayout from "../page-layout";

const RetailResults = ({ document }: TemplateRenderProps) => {
  const { _site } = document;
  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setVertical("stores");
    searchActions
      .executeVerticalQuery()
      .then((res) => console.log(JSON.stringify(res)));
  });
  return (
    <PageLayout _site={_site}>
      <div className="max-w-7xl mx-auto">
        <SearchBar hideRecentSearches={true} />
        <div className="flex">
          <div className="w-56 shrink-0 mr-5">
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
              CardComponent={RetailCard}
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

export default RetailResults;
