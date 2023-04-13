import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TransformProps,
  TemplateConfig,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import { transformSiteData } from "../utils/transformSiteData";
import { SearchResults } from "../components/search/SearchResults";
import { HomeResults } from "../components/search/HomeResults";
import { HomeResults2 } from "../components/search/HomeResults2";
import {
  CardProps,
  DirectAnswer,
  ResultsCount,
  SearchBar,
  SpellCheck,
  StandardCard,
  StandardSection,
  UniversalResults,
} from "@yext/search-ui-react";
import { useState } from "react";
import Carousel from "../components/Carousel";

export const config: TemplateConfig = {
  stream: {
    $id: "home_page",
    fields: ["id", "slug", "name"],
    filter: {
      entityTypes: ["ce_site"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateRenderProps> = ({ document }) => {
  return document.slug ?? document.name;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "GNC",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

// TODO: update typing
export const transformProps: TransformProps<TemplateRenderProps> = async (
  data
) => {
  const { _site } = data.document;

  return {
    ...data,
    document: {
      ...data.document,
      _site: transformSiteData(_site),
    },
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Home: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site, c_featuredCategories, c_features, name } = document;
  const [searchTerm, setSeachTerm] = useState("");

  const GridSection = ({ results, CardComponent, header }: any) => {
    const { props } = header;
    return (
      <>
        <div className="flex flex-col space-y-2 univ">
          <div className="font-semibold px-32">{props.label}</div>
          <Carousel data={results} entityType={""} />
        </div>
        <hr />
      </>
    );
  };
  const customUnivCard = (props: CardProps<any>) => {
    const { result } = props;

    return <div className="border text-xs">{result.name}</div>;
  };
  const handleSearch = (e: any) => {
    setSeachTerm(e.query);
  };
  return (
    <>
      <PageLayout _site={_site}>
        <div className="relative">
          <img
            className=""
            src="https://images.ctfassets.net/4rc1asww3mw7/5fRMSFxH54kYroaBsAECc4/182142d27f94d63474ca81ea83f50733/5120_2204-Affirm-Day-10223-10227__1_.jpg?q=80&fm=avif"
            alt=""
          />
          <div className="w-1/3 top-1/4 left-8 absolute">
            <h1 className="text-3xl  text-white">It’s better in the app</h1>
            <h2 className="text2xl text-white my-4">
              Online, in stores, wherever you love to shop—pay over time just
              about anywhere with the Affirm app.
            </h2>
            <SearchBar></SearchBar>
          </div>
        </div>
        <div className="mt-8">
          {/* <div className="initLoads block">
            <HomeResults
              initialVerticalKey={["stores", "brands"]}
              initialNames={["Stores", "Brands"]}
            />
          </div> */}
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
                // viewAllButton: true,
              },
              brands: {
                CardComponent: customUnivCard,
                SectionComponent: GridSection,
                label: "Brands",
                // viewAllButton: true,
              },
              stores: {
                CardComponent: customUnivCard,
                SectionComponent: GridSection,
                label: "Stores",
                // viewAllButton: true,
              },
              product_category: {
                CardComponent: customUnivCard,
                SectionComponent: GridSection,
                label: "Stores",
                // viewAllButton: true,
              },
            }}
          />
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
