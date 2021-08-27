import { chakra } from '@chakra-ui/react';
import {
  BulletedListItemBlock,
  NumberedListItemBlock,
} from '@notionhq/client/build/src/api-types';
import React from 'react';
import { NotionText } from '../NotionText';

export type ListItemBlock = NumberedListItemBlock | BulletedListItemBlock;

type NotionListItemProps = {
  block: ListItemBlock;
};

export const NotionListItem = ({ block }: NotionListItemProps): JSX.Element => {
  return (
    <chakra.li>
      <NotionText
        text={
          'bulleted_list_item' in block
            ? block.bulleted_list_item.text
            : block.numbered_list_item.text
        }
      />
    </chakra.li>
  );
};
