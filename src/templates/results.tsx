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
import PageLayout from "../components/page-layout";
import { transformSiteData } from "../utils/transformSiteData";
import { SearchResults } from "../components/search/SearchResults";

export const getPath: GetPath<TemplateRenderProps> = () => {
  return `results`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "GNC | Search Results",
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

  return (
    <>
      <PageLayout _site={_site}>
        <SearchResults />
      </PageLayout>
    </>
  );
};

export default Static;
