import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import { ICollectionType } from "@/lib/app/types";
import CrowdfundPage from "@/modules/crowdfund/CrowdfundPage";
import Cw721Page from "@/modules/cw721/components";
import React, { FC, ReactNode, useMemo } from "react";

interface Props {
  collectionId: string;
}

const CollectionRouter: FC<Props> = (props) => {
  const { collectionId } = props;
  const collection = useGetCollection(collectionId);
  switch (collection.type) {
    case ICollectionType.MARKETPLACE:
      return (
        <Cw721Page collection={collection} contractAddress={collection.cw721} />
      );
    case ICollectionType.CROWDFUND:
      return <CrowdfundPage collection={collection} />;
  }
  return null;
};

export default CollectionRouter;
