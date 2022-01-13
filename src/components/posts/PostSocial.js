import React, { memo, useState } from "react";
import PropTypes from "prop-types";

import {
  Icon,
  VStack,
  Spacer,
  StackDivider,
  HStack,
  Link,
  Button,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdFavorite, MdModeComment } from "react-icons/md";
import { randomNumber } from "../../libs/helpers";
import PostComments from "./PostComments";
import PostSocialLike from "./PostSocialLike";
import PostLikesList from "./PostLikesList";

const PostSocial = ({ post, showAll }) => {
  console.log("PostSocial", post.id, showAll);
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: showAll,
  });
  const [forceFocus, setForceFocus] = useState(0);

  const toggleComments = () => {
    console.log("toggleComments", isOpen);
    if (isOpen) {
      onClose();
    } else {
      setForceFocus(0);
      onOpen();
    }
  };

  const forceComment = () => {
    console.log("forceComment", isOpen);
    setForceFocus(randomNumber(1, 10000));
    if (!isOpen) {
      onOpen();
    }
  };

  return (
    <>
      <VStack
        px={4}
        pb={2}
        alignItems="stretch"
        divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />}
      >
        <HStack alignItems="flex-end">
          <HStack spacing={1}>
            <Icon as={MdFavorite} color="red.500" boxSize="1.2em" />
            <PostLikesList likes={post.likes} fontSize="sm" />
          </HStack>
          <Spacer />
          <Link fontSize="sm" onClick={toggleComments}>
            {post.commentsCount} comments
          </Link>
        </HStack>
        <HStack>
          <PostSocialLike postId={post.id} likes={post.likes} />
          <Button
            onClick={forceComment}
            leftIcon={<MdModeComment />}
            colorScheme="gray"
            variant="ghost"
            size="sm"
            flex={1}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Comment
          </Button>
        </HStack>
        {isOpen && (
          <PostComments
            post={post}
            forceFocus={forceFocus}
            showAll={showAll}
          />
        )}
      </VStack>
    </>
  );
};

PostSocial.propTypes = {
  post: PropTypes.object.isRequired,
  showAll: PropTypes.bool.isRequired,
};

export default memo(PostSocial);
