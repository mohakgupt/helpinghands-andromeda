import { useGetTokenFromColId, useGetTokens, useGetTokenUriObject, useGetCollection } from "@/lib/graphql/hooks/collection";
import {
  Box,
  GridItem,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import Card from "./Card";
import AuctionInfo from "./AuctionInfo";
import Overview from "./Overview";
import Bids from "./Bids";
import { ITokenUriObject } from "@/lib/graphql/hooks/collection/useGetTokenUriObject";
import { NFTInfo } from "@andromedaprotocol/andromeda.js";
import Properties from "./Properties";
import useApp from "@/lib/app/hooks/useApp";
import MarketplaceInfo from "./MarketplaceInfo";
interface TokenPageProps {
  tokenId: string;
  collectionId: string;
}
const TokenPage: FC<TokenPageProps> = (props) => {
  const { tokenId, collectionId } = props;
  const { data } = useGetTokenFromColId(collectionId, tokenId);
  const {data: cw721Data, error: cw721Error} = useGetCollection(collectionId);
  const token: NFTInfo = data as NFTInfo;
  const { data: allTokens } = useGetTokens(collectionId);
  const [tokenUri, setTokenUri] = useState(token?.token_uri || "");
  
  // from app address and collectionId ( from url ) go and get the cw721 address and name of the collection.
  let cw721Obj = {};
  if (cw721Data){
    cw721Obj = {
      name: cw721Data.contractInfo.name,
      symbol: cw721Data.contractInfo.symbol,
      address: cw721Data.address,
      id: collectionId
    }
  }

  //determine if token is any of the following state:
  // 1. Auction
  // 2. Market
  // 3. Crowdfund
  interface Collection {
    auctionAddress?: string;
    marketplaceAddress?: string;
    crowdfundAddress?: string;
  }
  const {
    config,
  } = useApp();

  const currentCollection: Collection | {} =  config.collections.find(collection => collection.id === collectionId) || {};
  
  // type of ADO for token page commerce functionality. 
  // depending on which type: auction, marketplace, crowdfund, etc...
  // will determine functionality.
  let adoType = "";
  let adoAddress = "";


  if ('auctionAddress' in currentCollection && currentCollection.auctionAddress && currentCollection.auctionAddress.length > 0) {
    adoType = "auction";
    adoAddress = currentCollection.auctionAddress;
  } else if ('marketplaceAddress' in currentCollection && currentCollection.marketplaceAddress && currentCollection.marketplaceAddress.length > 0) {
    adoType = "marketplace";
    adoAddress = currentCollection.marketplaceAddress;
  } else if ('crowdfundAddress' in currentCollection && currentCollection.crowdfundAddress && currentCollection.crowdfundAddress.length > 0) {
    adoType = "crowdfund";
    adoAddress = currentCollection.crowdfundAddress;
  }

  

  const { data: tokenUriObject } = useGetTokenUriObject(tokenUri);

  
  //Once token and tokenUriObject are present, then modify token object to incorporate all info 
  // parent canonical data supercedes the equivalent data in Uri Object for this display purpose.
  
  let updatedToken: NFTInfo | null = null;

  if (token && tokenUriObject){
     updatedToken = { ...token };
    // check for description
    const tokenDescription = token?.extension?.description;
    const uriObjectDescription = tokenUriObject?.description;

    if (!tokenDescription && uriObjectDescription?.length) {
      updatedToken.extension = { ...updatedToken.extension, description: uriObjectDescription }; 
    }

    // check for name
    const tokenName = token?.extension?.name;
    const uriObjectName = tokenUriObject?.name;

    if (!tokenName && uriObjectName) {
      updatedToken.extension = { ...updatedToken.extension, name: uriObjectName }; 
    }

    // check for image
    const tokenImage = token?.extension?.image;
    const uriObjectImage = tokenUriObject?.image;

    if (!tokenImage && uriObjectImage) {
      updatedToken.extension = { ...updatedToken.extension, image: uriObjectImage }; 
    }

    // check for image_data
    const tokenImageData = token?.extension?.image_data;
    const uriObjectImageData = tokenUriObject?.image_data;

    if (!tokenImageData && uriObjectImageData) {
      updatedToken.extension = { ...updatedToken.extension, image_data: uriObjectImageData }; 
    }

    // check for external_url/ 'token source url'
    const tokenExternalUrl = token?.extension?.external_url;
    const uriObjectExternalUrl = tokenUriObject?.external_url;

    if (!tokenExternalUrl && uriObjectExternalUrl) {
      updatedToken.extension = { ...updatedToken.extension, external_url: uriObjectExternalUrl }; 
    }

    // check for animation_url/ 'token media url'
    const tokenAnimationUrl = token?.extension?.animation_url;
    const uriObjectAnimationUrl = tokenUriObject?.animation_url;

    if (!tokenAnimationUrl && uriObjectAnimationUrl) {
      updatedToken.extension = { ...updatedToken.extension, animation_url: uriObjectAnimationUrl }; 
    }

    // check for youtube_url
    const tokenYoutubeUrl = token?.extension?.youtube_url;
    const uriObjectYoutubeUrl = tokenUriObject?.youtube_url;

    if (!tokenYoutubeUrl && uriObjectYoutubeUrl) {
      updatedToken.extension = { ...updatedToken.extension, youtube_url: uriObjectYoutubeUrl }; 
    }

    const combinedAttributes = [...token.extension.attributes]; 
    
    // if UriObject contains attributes, lets make sure 
    if (tokenUriObject.attributes){

      // Loop through the attributes of tokenUriObject
      tokenUriObject.attributes.forEach((attribute) => {
        
        // Check if there's a collision with an existing trait_type in combinedAttributes
        const existingIndex = combinedAttributes.findIndex((existingAttribute) => existingAttribute.trait_type === attribute.trait_type);
        if (existingIndex !== -1) {
          // If there's a collision, replace the existing attribute with the new one
          combinedAttributes[existingIndex] = attribute;
        } else {
          // If there's no collision, add the new attribute to the end of the array
          combinedAttributes.push(attribute);
        }
      });
    }

    updatedToken.extension = {...updatedToken.extension, attributes: combinedAttributes};
    
  }
  const displayToken = updatedToken || token;
  
  console.log('Display Token:', displayToken)

  return (
    <Box>
      <SimpleGrid columns={2}>
        <GridItem>
          <Box>
            <Image
              src={displayToken?.extension.image}
              alt="Image"
              borderRadius="lg"
              maxW="md"
            />
          </Box>
          <Box py="2" mt="12">
            <Tabs colorScheme="purple">
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Properties</Tab>
                {adoType==="auction" &&
                  <Tab>Bids</Tab>
                }
                {adoType==="marketplace" &&
                  <Tab>History</Tab>
                }
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Overview adoType={adoType} token={displayToken || {}} cw721={cw721Obj || {}} tokenId={tokenId} tokenUriObject={tokenUriObject|| {}}/>
                </TabPanel>
                <TabPanel>
                  <Properties token={displayToken || {}}/>
                </TabPanel>
                {adoType==="auction" && 
                  <TabPanel>
                    <Bids adoType={adoType} adoAddress={adoAddress} token={displayToken || {}} cw721={cw721Obj || {}} tokenId={tokenId} tokenUriObject={tokenUriObject|| {}}/>
                  </TabPanel>}
                {adoType==="marketplace" && <TabPanel>History</TabPanel>}
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
        <GridItem>
          <Box maxW="sm" ml="auto" position="sticky" top="4">
            {adoType === "auction" &&
            <AuctionInfo tokenId={tokenId} collectionId={collectionId}  />
            }
            {adoType==="marketplace" &&
            <MarketplaceInfo tokenId={tokenId} collectionId={collectionId} adoAddress={adoAddress} cw721Address={cw721Data?.address||""} />
            }
          </Box>
        </GridItem>
      </SimpleGrid>
      <Box mt="24">
        <Text fontWeight="bold" fontSize="xl">
          More from this collection
        </Text>
        <SimpleGrid mt="8" columns={4} spacing="4">
          {allTokens?.slice(0, 4).map((tokenId) => (
            <Card key={tokenId} tokenId={tokenId} collectionId={collectionId} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
export default TokenPage;
