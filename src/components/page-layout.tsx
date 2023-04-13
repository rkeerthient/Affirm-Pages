import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import * as React from "react";
import { CustomHeader } from "./CustomHeader";

type Props = {
  _site: any;
  children?: React.ReactNode;
};

const searcher = provideHeadless({
  apiKey: "941da15e2bb208f20f1a86c0a9517af4",
  experienceKey: "search",
  locale: "en",
});

const PageLayout = ({ _site, children }: Props) => {
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <div className="min-h-screen max-w-[1440px] mx-auto">
        <CustomHeader rootCategory={_site} />
        {children}
        {/* <Footer _site={_site}></Footer> */}
      </div>
    </SearchHeadlessProvider>
  );
};
export default PageLayout;
