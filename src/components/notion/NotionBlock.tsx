import React from 'react';
import {
  Block,
  ParagraphBlock as ParagraphNotionBlock,
  ToDoBlock,
  EmbedBlock,
  ToggleBlock,
} from '@notionhq/client/build/src/api-types';
import { NotionParagraph } from '../chakra/NotionParagraph';
import { HeadingBlock, NotionHeading } from '../chakra/NotionHeading';
import { ListItemBlock, NotionListItem } from '../chakra/NotionListItem';
import { NotionToDo } from '../chakra/NotionTodo';
import { NotionToggle } from '../chakra/NotionToggle';
import { NotionEmbed } from '../chakra/NotionEmbed';
import { NotionUnsupported } from '../chakra/NotionUnsupported';

export const NotionBlock = ({
  block,
  customImage,
}: {
  block: Block;
  customImage?: { Image: (props: any) => JSX.Element; props: any };
}): JSX.Element => {
  const { type } = block;
  switch (type) {
    case 'paragraph':
      return (
        <NotionParagraph
          block={block as ParagraphNotionBlock}
          customImage={customImage}
        />
      );

    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      return <NotionHeading block={block as HeadingBlock} />;
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return <NotionListItem block={block as ListItemBlock} />;
    case 'to_do':
      return <NotionToDo block={block as ToDoBlock} />;
    case 'toggle':
      return <NotionToggle block={block as ToggleBlock} />;
    case 'embed':
      return <NotionEmbed block={block as EmbedBlock} />;
    default:
      return <NotionUnsupported />;
  }
};
