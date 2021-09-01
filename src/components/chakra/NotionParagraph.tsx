import { Box, Image, Text } from '@chakra-ui/react';
import {
  ParagraphBlock,
  RichTextText,
} from '@notionhq/client/build/src/api-types';
import React from 'react';
import { NotionText } from '../notion/NotionText';

type Props = {
  block: ParagraphBlock;
  customImage?: { Image: (props: any) => JSX.Element; props: any };
};

export const NotionParagraph = ({ block, customImage }: Props): JSX.Element => {
  const text = block.paragraph.text as RichTextText[];
  if ((text ?? []).length === 0) return <br />;
  if (text[0].text.content.startsWith('[image')) {
    const imageProps = text[0].plain_text
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
  if (text[0].text.content.startsWith('[video')) {
    const videoProps = text[0].plain_text
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
  if (text[0].text.content.startsWith('[youtube')) {
    const youtubeProps = text[0].plain_text
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
      <NotionText text={text} />
    </Text>
  );
};
