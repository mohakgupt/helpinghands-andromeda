import { useAppUtils } from "@/lib/app/hooks";
import { Box, Text } from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import CollectionRow from "./CollectionRow";
import Featured from "./Featured";

interface DiscoverPageProps {}
const DiscoverPage: FC<DiscoverPageProps> = (props) => {
  const {} = props;
  const { getCollections } = useAppUtils();

  const collections = useMemo(() => {
    return getCollections();
  }, [getCollections]);

  return (
    <Box>
      <Box
        mt="4"
        display="flex"
        flexDir="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box mr="16">
          <Text fontSize="xxx-large" fontWeight="bold" color="green">
            Empower lives, <br></br>Save dreams
          </Text>
          <br></br>
          <Text>
            Join the crowd that is crowdfunding anonymously.<br></br>No strings
            attached - our beneficiaries cannot spam your inbox.
          </Text>
        </Box>
        <img
          src="https://lectera.com/info/storage/img/20221226/17d39032a2d792c36904_808xFull.jpg"
          width="50%"
        ></img>
      </Box>
      <Box mt="4">
        <Featured />
      </Box>
      <Text fontSize="xl" fontWeight="bold" mt="16">
        Support a fundraiser today:
      </Text>
      {collections.map((col) => (
        <Box mt="10" key={col.id}>
          <CollectionRow collectionId={col.id} />
        </Box>
      ))}
    </Box>
  );
};
export default DiscoverPage;
