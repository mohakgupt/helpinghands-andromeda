import { ICollectionCw721, ICollectionType } from "@/lib/app/types";
import { useGetCw721, useGetCw721Token } from "@/lib/graphql/hooks/cw721";
import CrowdfundInfo from "@/modules/crowdfund/CrowdfundInfo";
import React, { FC } from "react";

interface Props {
  collection: ICollectionCw721;
  tokenId: string;
}

const Cw721TokenAction: FC<Props> = (props) => {
  const { collection, tokenId } = props;
  const { data: cw721 } = useGetCw721(collection.cw721);
  const { data: token } = useGetCw721Token(collection.cw721, tokenId);

  if (collection.type === ICollectionType.CROWDFUND)
    return (
      <CrowdfundInfo
        collection={collection}
        collectionName={cw721?.contractInfo.name ?? "Loading..."}
      />
    );
  return null;
};

export default Cw721TokenAction;
