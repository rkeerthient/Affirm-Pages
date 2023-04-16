import * as React from "react";
import {
  FieldValueStaticFilter,
  provideHeadless,
  Result,
  useSearchActions,
  useSearchState,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { Breadcrumbs, Link } from "../Breadcrumbs";
import {
  SearchBar,
  DropdownItem,
  FocusedItemData,
  RenderEntityPreviews,
} from "@yext/search-ui-react";
import searchConfig from "../searchConfig";
import classNames from "classnames";
import Product from "../../types/products";
import { VerticalResultss } from "./VerticalResults";
import { UniversalResults, universalResultsConfig } from "./UniversalResults";
import { VerticalNavigator } from "./VerticalNavigator";

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
  const entityPreviewSearcher = provideHeadless({
    ...searchConfig,
    headlessId: "visual-autocomplete",
  });
  const [urlQuery, setUrlQuery] = useState<string | null>(null);
  const universalResults = useSearchState((state) => state.universal.verticals);
  const isUniversalSearch = useSearchState(
    (state) => state.meta.searchType === "universal"
  );
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);
  const [verticals, setVerticals] = useState<
    {
      label: string;
      verticalKey?: string;
      count?: number;
    }[]
  >([{ label: "All" }]);
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
        categories: 5,
        products: 4,
        articles: 3,
      });
      searchActions.executeUniversalQuery();
    }
  }, []);

  useEffect(() => {
    if (universalResults) {
      const newVerticals = universalResults.map((verticalResults) => {
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
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

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
        <div className="flex">
          <div className="flex-grow">
            {breadcrumbLinks && <Breadcrumbs links={breadcrumbLinks} />}
            {!initialFilter && <VerticalNavigator verticals={verticals} />}
            {isUniversalSearch && <UniversalResults />}
            {verticalKey && (
              <VerticalResultss
                categoryName={categoryName}
                categoryDescription={categoryDescription}
                verticalKey={verticalKey}
                subCategoryLinks={subCategoryLinks}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { SearchResults };
