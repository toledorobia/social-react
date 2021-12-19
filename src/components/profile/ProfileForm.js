import React, { useRef, useCallback, useState } from "react";
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

import { uploadImage } from "../../backend/storage";
// import { getFirestoreUser, updateFirestoreUser } from "../../backend/auth";
import { FiEdit2 } from "react-icons/fi";
import {
  publicUrl,
  imageValidation,
  imageProcessing,
} from "../../libs/helpers";
import dayjs from "../../libs/dayjs";
import mime from "mime-types";

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
    async () => {
      setIsChangeName(true);

      // await updateFirestoreUser(user.uid, {
      //   name: value,
      // });

      // const userUpdated = await getFirestoreUser(user.uid);
      // dispatch(signIn(userUpdated));
      setIsChangeName(false);
    },
    [user.uid, dispatch]
  );

  const onUploadAvatar = useCallback(
    async (e) => {
      setIsUploading(true);

      try {
        const files = e.target.files || e.dataTransfer.files;
        if (files.length === 0) {
          return;
        }

        const file = files[0];
        if (!imageValidation(file, ["image/jpeg", "image/png"], 2000)) {
          throw new Error("Image must be jpeg or png and less than 2MB");
        }

        const image = await imageProcessing(file, {
          quality: 0.6,
          type: "image/jpeg",
          scale: 0.2,
        });

        const ext = mime.extension(image.type);
        // eslint-disable-next-line no-unused-vars
        const url = await uploadImage(image, "profile", user.uid + "." + ext);
        // await updateFirestoreUser(user.uid, { photoUrl: url });

        // const userUpdated = await getFirestoreUser(user.uid);
        // dispatch(signIn(userUpdated));

        toast({
          title: "Success",
          description: "Profile photo updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (e) {
        console.log(e);
        toast({
          title: "Error",
          description: e,
          status: "error",
          duration: 5000,
          isClosable: true,
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
            src={user.photoUrl}
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

export default ProfileForm;
