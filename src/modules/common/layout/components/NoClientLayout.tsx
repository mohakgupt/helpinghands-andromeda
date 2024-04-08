"use client";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface LayoutProps {
  children?: ReactNode;
}
const NoClientLayout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Box minH="100vh">
      <Box py="2" px="8">
        <Flex
          direction="row"
          alignItems="center"
          maxW="container.lg"
          mx="auto"
          gap="4"
        >
          <Text as="a" fontSize="lg" fontWeight="bold">
            Andromeda Embeddables
          </Text>
        </Flex>
      </Box>
      <Divider />
      <Box px="24" py="16">
        {children}
      </Box>
      {/* <Box>
        <Footer />
      </Box> */}
    </Box>
  );
};
export default NoClientLayout;
