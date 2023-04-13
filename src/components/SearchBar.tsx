import * as React from "react";
import {
  DropdownItem,
  FocusedItemData,
  SearchBar as SB,
  SearchBarCssClasses,
} from "@yext/search-ui-react";
import {
  provideHeadless,
  Result,
  useSearchState,
  VerticalResults,
} from "@yext/search-headless-react";
import Ce_product from "../types/products";
import { ProductCard } from "./cards/ProductCard";

type SearchBarProps = {
  customCssClasses?: SearchBarCssClasses;
  mobile?: boolean;
  setVisAutoOpen?: (value: boolean) => void;
};

const visualSearcher = provideHeadless({
  apiKey: "941da15e2bb208f20f1a86c0a9517af4",
  experienceKey: "search",
  locale: "en",
  headlessId: "visual-search",
});

const SearchBar = ({
  customCssClasses,
  mobile = false,
  setVisAutoOpen,
}: SearchBarProps) => {
  const renderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResults>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ) => {
    const productResults = verticalKeyToResults["products"]
      ?.results as unknown as Result<Ce_product>[] | undefined;
    const articleResults = verticalKeyToResults["articles"]?.results;
    const categoryResults = verticalKeyToResults["categories"]?.results;
    const orderedKeys = Object.keys(verticalKeyToResults);
    const totalResultCount = Object.values(verticalKeyToResults).reduce(
      (acc, vertical) => acc + vertical.results.length,
      0
    );
    const input = useSearchState((state) => state.query.input);

    if (totalResultCount > 0) {
      setVisAutoOpen && setVisAutoOpen(true);
    } else {
      setVisAutoOpen && setVisAutoOpen(false);
    }

    return totalResultCount > 0 ? (
      <div className=" py-4 left-0 right-0 bg-stone-100 grid grid-cols-2">
        <div className="overflow-y-scroll">
          {orderedKeys.map((key) => {
            if (key === "categories" && categoryResults) {
              return (
                <div key="categories" className="p-4 ">
                  <p className="mb-4 font-bold">CATEGORIES</p>
                  {categoryResults.map((result) => (
                    <div key={result.id} className="mb-4">
                      {/* <a
                        className=" text-sm hover:underline"
                        href={result.rawData.slug}
                      > */}
                      <div>{result.name}</div>
                      {/* </a> */}
                    </div>
                  ))}
                </div>
              );
            } else if (key === "articles" && articleResults) {
              return (
                <div key="articles" className="p-4">
                  <p className="mb-4 font-bold">ARTICLES</p>
                  {articleResults.map((result) => (
                    <p key={result.id} className="mb-4 text-sm">
                      {result.name}
                    </p>
                  ))}
                </div>
              );
            }
          })}
        </div>
        <div className="overflow-y-scroll">
          <div className="sm:order-last grid grid-cols-2" key="products">
            {productResults
              ?.filter(
                (product, index, self) =>
                  index === self.findIndex((p) => p.name === product.name)
              )
              .map((result) => (
                <DropdownItem
                  key={result.rawData.id}
                  value={result.rawData.name}
                  ariaLabel={dropdownItemProps.ariaLabel}
                >
                  <>
                    {result?.rawData?.primaryPhoto?.image.url && (
                      <img
                        src={result?.rawData?.primaryPhoto?.image.url}
                        alt=""
                        className="h-32 w-32 mx-auto"
                      />
                    )}
                    <div className="text-sm">{result.name}</div>
                  </>
                </DropdownItem>
              ))}
          </div>
          <a
            className="text-gray-900 underline"
            href={`/results?query=${input}`}
          >
            VIEW ALL RESULTS
          </a>
        </div>
      </div>
    ) : (
      <></>
    );
  };

  const renderMobileEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResults>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ) => {
    const productResults = verticalKeyToResults["products"]
      ?.results as unknown as Result<Ce_product>[] | undefined;
    const articleResults = verticalKeyToResults["articles"]?.results;
    const categoryResults = verticalKeyToResults["categories"]?.results;
    const orderedKeys = Object.keys(verticalKeyToResults);

    return (
      <div className="fixed top-[68px] max-h-[calc(100vh-68px)] overflow-y-scroll py-4 left-0 right-0 bg-stone-100 bottom-0">
        {orderedKeys.map((key) => {
          if (key === "products" && productResults) {
            // remove products with the same name
            return (
              <div className="sm:order-last" key="products">
                {productResults
                  .filter(
                    (product, index, self) =>
                      index === self.findIndex((p) => p.name === product.name)
                  )
                  .map((result) => (
                    <ProductCard key={result.id} result={result} />
                  ))}
              </div>
            );
          } else {
            if (key === "categories" && categoryResults) {
              return (
                <div key="categories" className="p-4 sm:order-first">
                  <p className="mb-4 font-bold">CATEGORIES</p>
                  {categoryResults.map((result) => (
                    // <a
                    //   key={result.id}
                    //   className="mb-4 text-sm hover:underline"
                    //   href={result.rawData?.slug}
                    // >
                    <div>{result.name}</div>
                    // </a>
                  ))}
                </div>
              );
            } else if (key === "articles" && articleResults) {
              return (
                <div key="articles" className="p-4 sm:order-first">
                  <p className="mb-4 font-bold">ARTICLES</p>
                  {articleResults.map((result) => (
                    <p key={result.id} className="mb-4 text-sm">
                      {result.name}
                    </p>
                  ))}
                </div>
              );
            }
          }
        })}
      </div>
    );
  };

  const handleSearch = (searchEventData: {
    verticalKey?: string;
    query?: string;
  }) => {
    // if the query equals the string "track my order", redirect to this url: https://www.gnc.com/check-order
    if (searchEventData.query === "track my order") {
      window.location.href = "https://www.gnc.com/check-order";
      return;
    }

    const { verticalKey, query } = searchEventData;
    const url = new URL(window.location.href);
    url.pathname = "/results";
    url.searchParams.set("query", query || "");
    window.location.href = url.toString();
  };

  return (
    <SB
      customCssClasses={customCssClasses}
      onSearch={handleSearch}
      hideRecentSearches
      visualAutocompleteConfig={{
        entityPreviewSearcher: visualSearcher,
        includedVerticals: ["products", "shops", "product_category"],
        renderEntityPreviews: mobile
          ? renderMobileEntityPreviews
          : renderEntityPreviews,
      }}
    />
  );
};

export { SearchBar };
