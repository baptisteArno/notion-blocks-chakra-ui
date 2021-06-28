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

// fetch `blocks` from a Notion API call
<Stack>
  {blocks.map((block) => (
    <NotionBlock key={block.id} block={block} />
  ))}
</Stack>;
```

## Images and video (unsupported by Notion API)

In order to parse images and video, because it is natively unsupported by Notion API, you need to add this kind of block in your Notion doc:

```
[image, <imageUrl>]
```

```
[video, <video>]
```

```
[youtube, <youtubeId>]
```

## Custom image component

```tsx
<NotionBlock
  block={block}
  customImage={{
    MyCustomComponent,
    props: {
      className: 'image',
    },
  }}
/>
```

Inspired by [samuelkraft/notion-blog-nextjs](https://github.com/samuelkraft/notion-blog-nextjs)

[Here is my portofolio source code which uses this library](https://github.com/baptisteArno/baptistearno-dot-com)
