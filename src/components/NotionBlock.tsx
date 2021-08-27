import React from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  chakra,
  Checkbox,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import {
  Block,
  HeadingOneBlock,
  HeadingThreeBlock,
  HeadingTwoBlock,
  ParagraphBlock,
  ToDoBlock,
  EmbedBlock,
  ToggleBlock,
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
        return (
          <Box w="100%" className="image-container">
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
          <video width="100%" controls>
            <source src={videoProps[0]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      }
      if (richTexts[0].text.content.startsWith('[youtube')) {
        const youtubeProps = richTexts[0].text.content
          .slice(1)
          .slice(0, -1)
          .split(',')
          .map((val) => val.trim())
          .slice(1);
        return (
          <iframe
            width="100%"
            height="500px"
            src={'https://www.youtube.com/embed/' + youtubeProps[0]}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: '10px' }}
          />
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
    case 'to_do':
      const toDoBlock = block as ToDoBlock;
      return (
        <Checkbox defaultChecked={toDoBlock.to_do.checked} isReadOnly>
          {toDoBlock.to_do.text}
        </Checkbox>
      );
    case 'toggle':
      const toggleBlock = block as ToggleBlock;
      return (
        <Accordion>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {toggleBlock.toggle.text}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {(toggleBlock.toggle.children ?? []).map((block, idx) => (
                <NotionBlock key={idx} block={block} />
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      );
    case 'embed':
      const embedBlock = block as EmbedBlock;
      return (
        <iframe
          src={embedBlock.embed.url}
          title={embedBlock.embed.caption?.pop()?.plain_text ?? 'Embed item'}
          style={{ width: '100%', height: '600px' }}
        />
      );
    default:
      return (
        <Text>{`❌ Unsupported block (${
          type === 'unsupported' ? 'unsupported by Notion API' : type
        })`}</Text>
      );
  }
};
