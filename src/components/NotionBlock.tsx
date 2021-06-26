import React from 'react';
import { Box, Heading, Text, Image, chakra } from '@chakra-ui/react';
import {
  Block,
  HeadingOneBlock,
  HeadingThreeBlock,
  HeadingTwoBlock,
  ParagraphBlock,
  RichTextText,
} from '@notionhq/client/build/src/api-types';
import { NotionText } from './NotionText';
import { BulletedListItemBlock } from '@notionhq/client/build/src/api-types';

export const NotionBlock = ({
  block,
  customImage,
}: {
  block: Block;
  customImage?: { Image: (props: any) => JSX.Element; props: any };
}): JSX.Element => {
  const { type } = block;

  let definedBlock: Block;
  let richTexts: RichTextText[];
  switch (type) {
    case 'paragraph':
      definedBlock = block as ParagraphBlock;
      richTexts = definedBlock.paragraph.text as RichTextText[];
      if ((richTexts ?? []).length === 0) return <br />;
      if (richTexts[0].text.content.startsWith('[image')) {
        const imageProps = richTexts[0].text.content
          .slice(1)
          .slice(0, -1)
          .split(',')
          .map((val) => val.trim())
          .slice(1);
        console.log(imageProps);
        return (
          <Box w="100%" h={imageProps[1] ?? '300px'} pos="relative">
            {customImage && customImage.Image ? (
              <customImage.Image src={imageProps[0]} {...customImage.props} />
            ) : (
              <Image src={imageProps[0]} layout="fill" objectFit="contain" />
            )}
          </Box>
        );
      }
      if (richTexts[0].text.content.startsWith('[video')) {
        const videoProps = richTexts[0].text.content
          .slice(1)
          .slice(0, -1)
          .split(',')
          .map((val) => val.trim())
          .slice(1);
        return (
          <video
            width="100%"
            height={videoProps[1] ?? '300px'}
            style={{ maxHeight: videoProps[1] ?? '300px' }}
            controls
          >
            <source src={videoProps[0]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      }
      return (
        <Text>
          <NotionText text={richTexts} />
        </Text>
      );
    case 'heading_1':
      definedBlock = block as HeadingOneBlock;
      richTexts = definedBlock.heading_1.text as RichTextText[];
      return (
        <Heading as="h1" my={4}>
          <NotionText text={richTexts} />
        </Heading>
      );
    case 'heading_2':
      definedBlock = block as HeadingTwoBlock;
      richTexts = definedBlock.heading_2.text as RichTextText[];
      return (
        <Heading>
          <NotionText text={richTexts} />
        </Heading>
      );
    case 'heading_3':
      definedBlock = block as HeadingThreeBlock;
      richTexts = definedBlock.heading_3.text as RichTextText[];
      return (
        <Heading as="h3">
          <NotionText text={richTexts} />
        </Heading>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      definedBlock = block as BulletedListItemBlock;
      if (!definedBlock.bulleted_list_item.text) return <></>;
      return (
        <chakra.li>
          <NotionText text={definedBlock.bulleted_list_item.text} />
        </chakra.li>
      );
    default:
      return (
        <Text>{`❌ Unsupported block (${
          type === 'unsupported' ? 'unsupported by Notion API' : type
        })`}</Text>
      );
  }
};
