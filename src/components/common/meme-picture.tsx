import { Box, Text, useDimensions } from "@chakra-ui/react";
import { useMemo, useRef } from "react";
import { MemePictureProps } from "../../services/types/meme";
import { Moveable } from "./moveable";

const REF_WIDTH = 800;
const REF_HEIGHT = 450;
const REF_FONT_SIZE = 36;

export const MemePicture: React.FC<MemePictureProps> = ({
  pictureUrl,
  texts: rawTexts,
  dataTestId = '',
  OnDragText
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<Array<HTMLParagraphElement>>([]);
  const dimensions = useDimensions(containerRef, true);
  const boxWidth = dimensions?.borderBox.width;

  const { height, fontSize, texts } = useMemo(() => {
    if (!boxWidth) {
      return { height: 0, fontSize: 0, texts: rawTexts };
    }

    return {
      height: (boxWidth / REF_WIDTH) * REF_HEIGHT,
      fontSize: (boxWidth / REF_WIDTH) * REF_FONT_SIZE,
      texts: rawTexts?.map((text) => ({
        ...text,
        x: (boxWidth / REF_WIDTH) * text.x,
        y: (boxWidth / REF_WIDTH) * text.y,
      })),
    };
  }, [boxWidth, rawTexts]);

  return (
    <Box
      width="full"
      height={height}
      ref={containerRef}
      backgroundImage={pictureUrl}
      backgroundColor="gray.100"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      overflow="hidden"
      position="relative"
      borderRadius={8}
      data-testid={dataTestId}
    >
      {
        texts?.map((text, index) => {
          return <div key={index}>
            <Text
              ref={(el: HTMLParagraphElement) => textRefs.current[index] = el}
              position="absolute"
              left={text.x}
              top={text.y}
              fontSize={fontSize}
              color="white"
              fontFamily="Impact"
              fontWeight="bold"
              userSelect="none"
              textTransform="uppercase"
              cursor={!!OnDragText ? "move" : ""}
              style={{ WebkitTextStroke: "1px black" }}
              data-testid={`${dataTestId}-text-${index}`}
            >
              {text.content}
            </Text>

            {!!OnDragText && <Moveable containerRef={containerRef} targetRef={textRefs.current[index]} OnDragEnd={(x, y) => OnDragText?.(index, x, y)} />}
          </div>
        })
      }
    </Box>
  );
};
