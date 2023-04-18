import {
  provideHeadless,
  Result,
  useSearchActions,
  useSearchState,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import {
  CardProps,
  RenderEntityPreviews,
  FocusedItemData,
  ResultsCount,
  SearchBar,
  UniversalResults,
  SpellCheck,
  DirectAnswer,
} from "@yext/search-ui-react";
import * as React from "react";
import { useState } from "react";
import Carousel from "../Carousel";
import PageLayout from "../page-layout";
import searchConfig from "../searchConfig";
import { HomeResults } from "./HomeResults";
import classNames from "classnames";
import Product from "../../types/products";
import Ce_brand from "../../types/brands";
import { TemplateRenderProps } from "@yext/pages";
import API_Product from "../../types/api_products";

const HomeComponent = ({ document }: TemplateRenderProps) => {
  const searchActions = useSearchActions();
  const { _site } = document;
  const [searchTerm, setSeachTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const GridSection = ({ results, header }: any) => {
    const { props } = header;
    return (
      <>
        <div className="flex flex-col space-y-2 univ">
          <div className="font-semibold px-32">{props.label}</div>
          <Carousel data={results} entityType={""} />
        </div>
        <hr className="my-4" />
      </>
    );
  };
  const customUnivCard = (props: CardProps<any>) => {
    const { result } = props;
    return <div className="border text-xs">{result.name}</div>;
  };

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
    console.log(JSON.stringify(verticalKeyToResults));

    const productResults = verticalKeyToResults["products"]
      ?.results as unknown as Result<Product>[];
    const api_productResults = verticalKeyToResults["api_products"]
      ?.results as unknown as Result<any>[];
    const brandResults = verticalKeyToResults["brands"]
      ?.results as unknown as Result<Ce_brand>[];
    const orderedKeys = Object.keys(verticalKeyToResults);
    const totalResultCount = Object.values(verticalKeyToResults).reduce(
      (acc, vertical) => acc + vertical.results.length,
      0
    );

    return productResults || api_productResults ? (
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
          if (key === "products" && brandResults) {
            return (
              <div key="products" className="p-4 border-right-2">
                <p className="mb-4 font-bold">Products</p>
                <div className="grid grid-cols-4 gap-4">
                  {productResults.map((result) => (
                    <div key={result.id} className="mb-4">
                      {result.rawData.primaryPhoto && (
                        <img
                          src={result.rawData.primaryPhoto.image.url}
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
          if (key === "api_products" && api_productResults) {
            return (
              <div key="api_products" className="p-4 border-right-2">
                <p className="mb-4 font-bold">Products(API)</p>
                <div className="grid grid-cols-4 gap-4">
                  {api_productResults.map((result) => (
                    <div
                      key={result.id}
                      className="mb-4 border border-black p-2"
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
  const handleSearch = (e: any) => {
    setSeachTerm(e.query);
    searchActions.setUniversal();
    searchActions.executeUniversalQuery().then(() => setLoading(false));
  };

  return (
    <PageLayout _site={_site}>
      <div className="relative">
        <img
          className=""
          src="https://images.ctfassets.net/4rc1asww3mw7/5fRMSFxH54kYroaBsAECc4/182142d27f94d63474ca81ea83f50733/5120_2204-Affirm-Day-10223-10227__1_.jpg?q=80&fm=avif"
          alt=""
        />
        <div className="w-2/4 top-1/4 left-16 absolute">
          <div className="w-2/3">
            <h1 className="text-3xl  text-white">It’s better in the app</h1>
            <h2 className="text2xl text-white my-4">
              Online, in stores, wherever you love to shop—pay over time just
              about anywhere with the Affirm app.
            </h2>
          </div>

          <SearchBar
            onSearch={(e) => handleSearch(e)}
            hideRecentSearches={true}
            visualAutocompleteConfig={{
              entityPreviewSearcher: entityPreviewSearcher,
              includedVerticals: ["products", "brands", "api_products"],
              renderEntityPreviews: renderEntityPreviews,
              universalLimit: { products: 4, api_products: 4 },
              entityPreviewsDebouncingTime: 500,
            }}
          />
        </div>
      </div>
      <div className="mt-8">
        {searchTerm === "" ? (
          <div className="initLoads block">
            <HomeResults
              initialVerticalKey={["stores", "brands"]}
              initialNames={["Stores", "Brands"]}
            />
          </div>
        ) : (
          <>
            {!loading && (
              <>
                <div className="px-32">
                  <SpellCheck />
                  <DirectAnswer />
                  <ResultsCount />
                </div>
                <UniversalResults
                  verticalConfigMap={{
                    products: {
                      CardComponent: customUnivCard,
                      SectionComponent: GridSection,
                      label: "Products",
                    },
                    api_products: {
                      CardComponent: customUnivCard,
                      SectionComponent: GridSection,
                      label: "Products(API)",
                    },
                    brands: {
                      CardComponent: customUnivCard,
                      SectionComponent: GridSection,
                      label: "Brands",
                    },
                    stores: {
                      CardComponent: customUnivCard,
                      SectionComponent: GridSection,
                      label: "Stores",
                    },
                    product_category: {
                      CardComponent: customUnivCard,
                      SectionComponent: GridSection,
                      label: "Category",
                    },
                  }}
                />
              </>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default HomeComponent;
