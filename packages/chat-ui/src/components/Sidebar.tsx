import { Flex, Icon, IconButton, Stack, useColorMode } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import React from "react";
import { IoMoon, IoSunny } from 'react-icons/io5';
import { useWalletProfile } from '../hooks/useWalletProfile';
import { ProfileButton } from "./ProfileButton";
import { ChatRooms } from './rooms/ChatRooms';

const CHAT_KEY = new PublicKey("CED7XAUJH8jmaoGoP5X2BSPD3uvzMYUHByoXPmkWzoRF");

export const Sidebar = ({ fullWidth }: { fullWidth?: boolean }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { disconnect } = useWallet();
  const { info: profile } = useWalletProfile()
  // const rooms = roomValues?.docs.map(room =>
  //   <ChatRooms key={room.id} id={room.id} data={room.data()} />
  // )
  
  //Button to log users out and push to index page
  const handleLogOut = () => {
    // disconnect()
  }

  return (
    <Flex
      height="100vh"
      maxWidth={fullWidth ? "100vw" : "30vw"}
      width={fullWidth ? "100vw" : ""}
      direction="column"
      borderRight="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
      <Flex flexWrap="wrap" direction="column" position="sticky" top="0">
        <Flex justify="space-between" height="71px" align="center" p="10px">
          {/* <Avatar src={profile?.imageUrl} /> */}
          <Stack
            maxWidth="30vw"
            direction="row"
            w="full"
            align="space-between"
            justifyContent="space-evenly"
          >
            <ProfileButton />
            <IconButton
              colorScheme="primary"
              variant="outline"
              aria-label="Toggle Dark Mode"
              icon={
                colorMode === "light" ? (
                  <Icon as={IoMoon} />
                ) : (
                  <Icon as={IoSunny} />
                )
              }
              onClick={toggleColorMode}
            />
          </Stack>
        </Flex>
        <Stack direction="row" align="center" p="10px">
          {/* TODO: Modals */}
        </Stack>
      </Flex>
      <Stack direction="column" overflow="scroll">
        <ChatRooms chatKey={CHAT_KEY} />
      </Stack>
    </Flex>
  );
}
