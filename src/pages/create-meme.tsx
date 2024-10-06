import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChangeEvent, useMemo, useState } from "react";
import { Plus, Trash } from "@phosphor-icons/react";
import { MemeEditor } from "../components/create-meme/meme-editor";
import { Picture, Caption } from "../services/types/meme";
import { useCreateMeme } from "../services/tanstack/useCreateMeme";

export const CreateMemePage: React.FC = () => {
  const navigate = useNavigate()

  const [picture, setPicture] = useState<Picture | null>(null);
  const [texts, setTexts] = useState<Array<Caption>>([]);
  const [description, setDescription] = useState("");
  const { mutate } = useCreateMeme();

  const handleDrop = (file: File) => {
    setPicture({
      url: URL.createObjectURL(file),
      file,
    });
  };

  const handleAddCaptionButtonClick = () => {
    setTexts([
      ...texts,
      {
        content: `New caption ${texts.length + 1}`,
        x: Math.random() * 400,
        y: Math.random() * 225,
      },
    ]);
  };

  const handleOnDragText = (textIndex: number, x: number, y: number) => {
    const cloneTexts = [...texts]
    cloneTexts[textIndex] = {
      ...cloneTexts[textIndex],
      x,
      y
    }
    setTexts(cloneTexts)
  }

  const handleDeleteCaptionButtonClick = (index: number) => {
    setTexts(texts.filter((_, i) => i !== index));
  };

  const onCaptionInputChange = (event: ChangeEvent<HTMLInputElement>, textIndex: number) => {
    const cloneTexts = [...texts]
    cloneTexts[textIndex] = {
      ...cloneTexts[textIndex],
      content: event.target.value
    }
    setTexts(cloneTexts);
  }

  const submit = () => {
    if (picture) {
      mutate({
        picture,
        texts,
        description
      }, {
        onSuccess: () => {
          navigate({ to: "/" })
        }
      });
    }
  }

  const memePicture = useMemo(() => {
    if (!picture) {
      return undefined;
    }

    return {
      pictureUrl: picture.url,
      texts,
    };
  }, [picture, texts]);

  return (
    <Flex width="full" height="full">
      <Box flexGrow={1} height="full" p={4} overflowY="auto">
        <VStack spacing={5} align="stretch">
          <Box>
            <Heading as="h2" size="md" mb={2}>
              Upload your picture
            </Heading>
            <MemeEditor onDrop={handleDrop} OnDragText={handleOnDragText} memePicture={memePicture} />
          </Box>
          <Box>
            <Heading as="h2" size="md" mb={2}>
              Describe your meme
            </Heading>
            <Textarea placeholder="Type your description here..." value={description} onChange={(event) => setDescription(event.target.value)} />
          </Box>
        </VStack>
      </Box>
      <Flex
        flexDir="column"
        width="30%"
        minW="250"
        height="full"
        boxShadow="lg"
      >
        <Heading as="h2" size="md" mb={2} p={4}>
          Add your captions
        </Heading>
        <Box p={4} flexGrow={1} height={0} overflowY="auto">
          <VStack>
            {texts.map((text, index) => (
              <Flex key={index} width="full">
                <Input key={index} value={text.content} onChange={(event) => onCaptionInputChange(event, index)}
                  mr={1} />
                <IconButton
                  onClick={() => handleDeleteCaptionButtonClick(index)}
                  aria-label="Delete caption"
                  icon={<Icon as={Trash} />}
                />
              </Flex>
            ))}
            <Button
              colorScheme="cyan"
              leftIcon={<Icon as={Plus} />}
              variant="ghost"
              size="sm"
              width="full"
              onClick={handleAddCaptionButtonClick}
              isDisabled={memePicture === undefined}
            >
              Add a caption
            </Button>
          </VStack>
        </Box>
        <HStack p={4}>
          <Button
            as={Link}
            to="/"
            colorScheme="cyan"
            variant="outline"
            size="sm"
            width="full"
          >
            Cancel
          </Button>
          <Button
            colorScheme="cyan"
            size="sm"
            width="full"
            color="white"
            isDisabled={memePicture === undefined}
            onClick={submit}
          >
            Submit
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}