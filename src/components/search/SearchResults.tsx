import * as React from "react";
import {
  FieldValueStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { UniversalResults, universalResultsConfig } from "./UniversalResults";
import { VerticalNavigator } from "./VerticalNavigator";
import { VerticalResults } from "./VerticalResults";
import { Breadcrumbs, Link } from "../Breadcrumbs";
import { Transition } from "@headlessui/react";

type SearchResultsProps = {
  initialFilter?: FieldValueStaticFilter;
  initialVerticalKey?: string;
  categoryName?: string;
  categoryDescription?: string;
  breadcrumbLinks?: Link[];
  subCategoryLinks?: Link[];
};

const SearchResults = ({
  initialFilter,
  initialVerticalKey,
  categoryName,
  categoryDescription,
  breadcrumbLinks,
  subCategoryLinks,
}: SearchResultsProps) => {
  const searchActions = useSearchActions();
  const [urlQuery, setUrlQuery] = useState<string | null>(null);
  const [verticals, setVerticals] = useState<
    {
      label: string;
      verticalKey?: string;
      count?: number;
    }[]
  >([{ label: "All" }]);

  const universalResults = useSearchState((state) => state.universal.verticals);
  const isUniversalSearch = useSearchState(
    (state) => state.meta.searchType === "universal"
  );
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  // when this component is mounted, grab the query from the URL and perform a search
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("query");
    if (query) {
      searchActions.setQuery(query);
      setUrlQuery(query);
    }

    if (initialVerticalKey) {
      searchActions.setVertical(initialVerticalKey);
      initialFilter &&
        searchActions.setStaticFilters([
          { filter: initialFilter, selected: true },
        ]);
      searchActions.executeVerticalQuery();
    } else {
      searchActions.setRestrictVerticals(Object.keys(universalResultsConfig));
      searchActions.setUniversalLimit({
        product_category: 5,
        products: 4,
      });
      searchActions.executeUniversalQuery();
    }
  }, []);

  useEffect(() => {
    if (universalResults) {
      const newVerticals = universalResults.map((verticalResults) => {
        // first char as uppercase and the rest as lowercase
        const label =
          verticalResults.verticalKey[0].toUpperCase() +
          verticalResults.verticalKey.slice(1).toLowerCase();

        return {
          label,
          verticalKey: verticalResults.verticalKey,
          count: verticalResults.resultsCount,
        };
      });
      setVerticals([{ label: "All" }, ...newVerticals]);
    }
  }, [universalResults]);

  return (
    <div className="p-4">
      {urlQuery && (
        <div className=" flex justify-center items-center">
          <h1 className=" mb-4">
            You searched for...
            <span className="font-bold">{`"${urlQuery}"`}</span>
          </h1>
        </div>
      )}
      <Transition
        show={!isLoading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {breadcrumbLinks && <Breadcrumbs links={breadcrumbLinks} />}
        {!initialFilter && <VerticalNavigator verticals={verticals} />}
        {isUniversalSearch && <UniversalResults />}
        {verticalKey && (
          <VerticalResults
            categoryName={categoryName}
            categoryDescription={categoryDescription}
            verticalKey={verticalKey}
            subCategoryLinks={subCategoryLinks}
          />
        )}
      </Transition>
    </div>
  );
};

export { SearchResults };
