import * as React from "react";
import {
  FieldValueStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { UniversalResults, universalResultsConfig } from "./UniversalResults";
import { Breadcrumbs, Link } from "../Breadcrumbs";
import { Transition } from "@headlessui/react";
import { StandardCard, VerticalResults } from "@yext/search-ui-react";

type HomeResults2Props = {
  initialFilter?: FieldValueStaticFilter;
  initialVerticalKey?: string;
  categoryName?: string;
  categoryDescription?: string;
  breadcrumbLinks?: Link[];
  subCategoryLinks?: Link[];
};

const HomeResults2 = ({
  initialVerticalKey,
  categoryName,
}: HomeResults2Props) => {
  console.log(initialVerticalKey, categoryName);
  const [loading, setLoading] = useState(true);
  const searchActions = useSearchActions();

  useEffect(() => {
    {
      initialVerticalKey &&
        (searchActions.setVertical(initialVerticalKey),
        searchActions.executeVerticalQuery());
    }
  }, [initialVerticalKey]);

  return (
    <>
      {!loading && (
        <div className="p-4">
          <VerticalResults CardComponent={StandardCard}></VerticalResults>
        </div>
      )}
    </>
  );
};

export { HomeResults2 };
