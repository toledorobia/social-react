import React, { memo, useState } from "react";
import PropTypes from "prop-types";

import {
  Icon,
  Text,
  VStack,
  Spacer,
  StackDivider,
  HStack,
  Link,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { MdFavorite, MdModeComment } from "react-icons/md";
import { randomNumber } from "../../libs/helpers";
import PostComments from "./PostComments";

const PostSocial = ({ postId, comments, likes, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [forceFocus, setForceFocus] = useState(0);

  const toggleComments = () => {
    if (isOpen) {
      onClose();
    } else {
      setForceFocus(0);
      onOpen();
    }
  };

  const forceComment = () => {
    // if (!isOpen) {
    setForceFocus(randomNumber(1, 10000));
    if (!isOpen) {
      onOpen();
    }
    // }
  };

  return (
    <>
      <VStack
        px={4}
        pb={2}
        alignItems="stretch"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <HStack alignItems="flex-end">
          <HStack spacing={1}>
            <Icon as={MdFavorite} color="red.500" boxSize="1.2em" />
            <Text fontSize="sm">{likes.length}</Text>
          </HStack>
          <Spacer />
          <Link fontSize="sm" onClick={toggleComments}>
            {comments.length} comments
          </Link>
        </HStack>
        <HStack>
          <Button
            leftIcon={<MdFavorite />}
            colorScheme="gray"
            variant="ghost"
            size="sm"
            flex={1}
            color="gray.600"
          >
            Like
          </Button>
          <Button
            onClick={forceComment}
            leftIcon={<MdModeComment />}
            colorScheme="gray"
            variant="ghost"
            size="sm"
            flex={1}
            color="gray.600"
          >
            Comment
          </Button>
        </HStack>
        {isOpen && (
          <PostComments
            comments={comments}
            postId={postId}
            forceFocus={forceFocus}
          />
        )}
      </VStack>
    </>
  );
};

PostSocial.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  likes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(PostSocial);
