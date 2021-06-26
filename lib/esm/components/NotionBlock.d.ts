/// <reference types="react" />
import { Image } from '@chakra-ui/react';
import { Block } from '@notionhq/client/build/src/api-types';
export declare const NotionBlock: ({ block, customImage, }: {
    block: Block;
    customImage?: {
        Image: (props: any) => JSX.Element;
        props: any;
    } | undefined;
}) => JSX.Element;
