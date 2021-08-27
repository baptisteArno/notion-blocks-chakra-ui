import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { ToggleBlock } from '@notionhq/client/build/src/api-types';
import React from 'react';
import { NotionBlock } from '../NotionBlock';
import { NotionText } from '../NotionText';

type NotionToggleProps = {
  block: ToggleBlock;
};

export const NotionToggle = ({ block }: NotionToggleProps): JSX.Element => {
  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <NotionText text={block.toggle.text} />
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {(block.toggle.children ?? []).map((block, idx) => (
            <NotionBlock key={idx} block={block} />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
