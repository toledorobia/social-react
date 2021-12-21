import React, { useRef, useCallback, useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Stack,
  Text,
  VStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Image,
  Editable,
  EditablePreview,
  EditableInput,
  VisuallyHiddenInput,
  useToast,
} from "@chakra-ui/react";

import { FiEdit2 } from "react-icons/fi";
import {
  publicUrl,
  imageValidation,
} from "../../libs/helpers";
import dayjs from "../../libs/dayjs";

import { setUser } from "../../features/auth/authSlice";
import { updateProfile } from "../../features/users/usersSlice";

const ProfileForm = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const refInputAvatar = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isChangeName, setIsChangeName] = useState(false);

  const onChangeAvatar = () => {
    refInputAvatar.current.click();
  };

  const onChangeName = useCallback(
    async (value) => {
      try {
        setIsChangeName(true);
        const _user = await dispatch(updateProfile({ id: user.id, name: value })).unwrap();
        dispatch(setUser(_user));
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
        });
      } finally {
        setIsChangeName(false);
      }
    },
    [user.id, dispatch]
  );

  const onUploadAvatar = useCallback(
    async (e) => {
      try {
        setIsUploading(true);

        const files = e.target.files || e.dataTransfer.files;
        if (files.length === 0) {
          return;
        }

        const file = files[0];
        if (!imageValidation(file, ["image/jpeg", "image/png"], 2000)) {
          throw new Error("Image must be jpeg or png and less than 2MB");
        }

        const _user = await dispatch(updateProfile({ id: user.id, avatar: file })).unwrap();
        dispatch(setUser(_user));
        
        toast({
          title: "Success",
          description: "Profile photo updated",
          status: "success",
        });
      } catch (e) {
        console.log(e);
        toast({
          title: "Error",
          description: e,
          status: "error",
        });
      } finally {
        setIsUploading(false);
      }
    },
    [user.uid, dispatch, toast]
  );

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
          src={publicUrl("cover.jpg")}
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
            src={user.avatar}
            alignSelf={{ base: "center", md: "left" }}
            top="-30px"
            borderWidth="4px"
          >
            <AvatarBadge
              as={IconButton}
              isLoading={isUploading}
              onClick={onChangeAvatar}
              size="sm"
              rounded="full"
              top="-5px"
              colorScheme="blue"
              aria-label="Change photo"
              _loading={{
                opacity: 1,
              }}
              icon={<FiEdit2 />}
            />
            <VisuallyHiddenInput
              type="file"
              ref={refInputAvatar}
              accept="image/png,image/jpeg"
              onChange={onUploadAvatar}
            />
          </Avatar>

          <VStack
            w={{ base: "100%", md: "auto" }}
            flex={{ base: 0, md: 1 }}
            alignItems={{ base: "center", md: "stretch" }}
            spacing={0}
            position="relative"
            top={{ base: "-25px", md: "-10px" }}
          >
            <Editable
              onSubmit={onChangeName}
              defaultValue={user.name}
              fontSize="2xl"
              fontWeight="bold"
              isDisabled={isChangeName}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
            <Text>{user.email}</Text>
            <Text fontSize="xs">
              Social user since {dayjs(user.createdAt).format("LL")}
            </Text>
          </VStack>
        </Stack>
      </VStack>
    </>
  );
};

export default memo(ProfileForm);
