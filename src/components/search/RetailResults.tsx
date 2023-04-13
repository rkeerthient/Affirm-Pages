import { TemplateRenderProps } from "@yext/pages/*";
import { useSearchActions } from "@yext/search-headless-react";
import {
  AppliedFilters,
  Pagination,
  ResultsCount,
  SearchBar,
  StandardCard,
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
      <div className="flex justify-center px-4 py-6">
        <div className="w-full max-w-7xl home">
          <SearchBar
            customCssClasses={{ searchBarContainer: "!rounded-none	" }}
            hideRecentSearches={true}
            placeholder="Find Products Near You"
          />
          <div className="flex gap-16 pb-8">
            <StandardFacets />
            <div className="flex-col">
              <ResultsCount />
              <AppliedFilters
                customCssClasses={{
                  clearAllButton: "hidden",
                  appliedFiltersContainer: "pb-4",
                }}
              />
              <VerticalResults
                CardComponent={RetailCard}
                customCssClasses={{
                  verticalResultsContainer:
                    "grid grid-cols-1 md:grid-cols-3 md:gap-4 md:pb-4",
                }}
              />
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RetailResults;
