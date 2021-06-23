import React from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import {
  Block,
  HeadingOneBlock,
  HeadingThreeBlock,
  HeadingTwoBlock,
  NumberedListItemBlock,
  ParagraphBlock,
  RichTextText,
} from '@notionhq/client/build/src/api-types';
import { NotionText } from './NotionText';

export const NotionBlock = ({ block }: { block: Block }): JSX.Element => {
  const { type } = block;

  let definedBlock: Block;
  let richTexts: RichTextText[];
  switch (type) {
    case 'paragraph':
      definedBlock = block as ParagraphBlock;
      richTexts = definedBlock.paragraph.text as RichTextText[];
      if ((richTexts ?? []).length === 0) return <br />;
      if (richTexts[0].text.content.startsWith('youtubeId: ')) {
        return (
          <iframe
            width="100%"
            height="500px"
            src={
              'https://www.youtube.com/embed/' +
              richTexts[0].text.content.split('youtubeId: ').pop()
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: '10px' }}
          />
        );
      }
      if (richTexts[0].text.content.startsWith('imagePath')) {
        return (
          <Box
            w="100%"
            h={`${richTexts[0].text.content.split(',')[1]}px`}
            pos="relative"
          >
            <Image
              src={richTexts[0].text.content.split(',').pop()}
              layout="fill"
              objectFit="contain"
            />
          </Box>
        );
      }
      if (richTexts[0].text.content.startsWith('videoPath: ')) {
        return (
          <video
            width="100%"
            height="500px"
            style={{ maxHeight: '500px' }}
            controls
          >
            <source
              src={richTexts[0].text.content.split('videoPath: ').pop()}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        );
      }
      return (
        <Text>
          <NotionText text={richTexts} />
        </Text>
      );
      break;
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
    // TO-DO
    case 'numbered_list_item':
      definedBlock = block as NumberedListItemBlock;
      richTexts = definedBlock.numbered_list_item.text as RichTextText[];
      return (
        <Text>
          <NotionText text={richTexts} />
        </Text>
      );
    case 'child_page':
    // TO-DO
    default:
      return (
        <Text>{`❌ Unsupported block (${
          type === 'unsupported' ? 'unsupported by Notion API' : type
        })`}</Text>
      );
  }
};
