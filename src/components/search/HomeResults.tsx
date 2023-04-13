import * as React from "react";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { Image } from "@yext/pages/components";
import Carousel from "../Carousel";

type HomeResultsProps = {
  initialVerticalKey: string[];
  initialNames: string[];
};

const HomeResults = ({
  initialVerticalKey,
  initialNames,
}: HomeResultsProps) => {
  const [data, setData] = useState<any>([]);
  const searchActions = useSearchActions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    {
      let x = initialVerticalKey.map((item, index: number) => {
        searchActions.setVertical(item);
        return searchActions.executeVerticalQuery().then((res) => {
          return { entityType: initialNames[index], res };
        });
      });
      Promise.all(x).then((results) => {
        setData(results);
        setLoading(false);
      });
    }
  }, [initialVerticalKey]);

  return (
    <>
      {!loading && (
        <div className="space-y-8 pb-8 centered-container">
          {data.map((item: any, index: any) => {
            const { entityType, res } = item;
            return (
              <div className="flex flex-col" key={index}>
                <div className="text-3xl font-semibold mb-8">{entityType} </div>
                <div className=" overflow-hidden">
                  <Carousel
                    data={res.verticalResults.results}
                    entityType={entityType}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export { HomeResults };
