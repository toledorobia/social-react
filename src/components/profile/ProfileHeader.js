import React from "react";
import PropTypes from "prop-types";
import { Stack, Text, VStack, Avatar, Image, Link } from "@chakra-ui/react";
import { publicUrl, dateFormat } from "../../libs/helpers";

const ProfileHeader = ({ user }) => {
  return (
    <>
      <VStack
        spacing={4}
        bg="white"
        rounded="lg"
        shadow="base"
        alignItems="stretch"
      >
        <Image
          src={publicUrl("/cover.jpg")}
          borderTopRadius="lg"
          objectFit="cover"
          maxH={200}
        />

        <Stack
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "stretch", md: "stretch" }}
          px="6"
          spacing={{ base: 0, md: 5 }}
        >
          <Avatar
            size="2xl"
            name={user.name}
            src={user.photoUrl}
            alignSelf={{ base: "center", md: "left" }}
            top="-30px"
            borderWidth="4px"
          ></Avatar>

          <VStack
            w={{ base: "100%", md: "auto" }}
            flex={{ base: 0, md: 1 }}
            alignItems={{ base: "center", md: "stretch" }}
            spacing={0}
            position="relative"
            top={{ base: "-25px", md: "-10px" }}
          >
            <Text fontSize="2xl" fontWeight="bold">
              {user.name}
            </Text>
            <Text>{user.email}</Text>
            <Text fontSize="xs">
              Social user since{" "}
              <Link title={dateFormat(user.createdAt)}>
                {dateFormat(user.createdAt, "LL")}
              </Link>
            </Text>
          </VStack>
        </Stack>
      </VStack>
    </>
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileHeader;
