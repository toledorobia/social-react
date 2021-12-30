import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  HStack,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Link,
  Avatar,
} from "@chakra-ui/react";

const PostLikesList = ({ likes, ...props }) => {
  return (
    <>
      {likes.length === 0 && <Link {...props}>{likes.length}</Link>}
      {likes.length > 0 && (
        <Popover isLazy closeOnBlur>
          <PopoverTrigger>
            <Link {...props}>{likes.length}</Link>
          </PopoverTrigger>
          <PopoverContent _focus={{ outline: 0, boxShadow: 0 }}>
            <PopoverArrow />
            <PopoverBody>
              <VStack alignItems="start">
                {likes.map((l) => (
                  <HStack key={l.user._id}>
                    <Avatar
                      size="2xs"
                      name={l.user.name}
                      src={l.user.avatar}
                    />
                    <Text fontSize="sm">{l.user.name}</Text>
                  </HStack>
                ))}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

PostLikesList.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostLikesList;
