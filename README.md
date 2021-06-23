# Parse Notion blocks into Chakra UI React components

## Get started

```shell
npm install notion-blocks-chakra-ui
```

or

```shell
yarn add notion-blocks-chakra-ui
```

## How to use

```tsx
import { Stack } from '@chakra-ui/react';
import { NotionBlock } from 'notion-blocks-chakra-ui';

// blocks comes from a Notion API call
<Stack>
  {blocks.map((block) => (
    <NotionBlock key={block.id} block={block} />
  ))}
</Stack>;
```

Greatly inspired by https://github.com/samuelkraft/notion-blog-nextjs
