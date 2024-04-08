import React, { FC, useMemo } from "react";
import { useGetCollection } from "@/lib/app/hooks/useGetCollection";
import { ICollectionType } from "@/lib/app/types";
import Cw721CollectionRow from "@/modules/cw721/components/CollectionRow";

interface CollectionRowProps {
  collectionId: string;
}
const CollectionRow: FC<CollectionRowProps> = (props) => {
  const { collectionId } = props;
  const collection = useGetCollection(collectionId);

  return <Cw721CollectionRow collectionId={collectionId} />;
};
export default CollectionRow;
