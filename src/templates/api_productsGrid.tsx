import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TransformProps,
} from "@yext/pages";
import { transformSiteData } from "../utils/transformSiteData";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import API_ProdResults from "../components/search/API_ProdResults";

export const getPath: GetPath<TemplateRenderProps> = () => {
  return `products-results`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Affirm | Search Results",
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
const Static: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  const searcher = provideHeadless({
    apiKey: "941da15e2bb208f20f1a86c0a9517af4",
    experienceKey: "search",
    locale: "en",
  });

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <API_ProdResults
        document={document}
        path={""}
        relativePrefixToRoot={""}
        __meta={{
          mode: "development",
          manifest: undefined,
        }}
      />
    </SearchHeadlessProvider>
  );
};

export default Static;
