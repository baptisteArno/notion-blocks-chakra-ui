/// <reference types="react" />
import { TextProps } from '@chakra-ui/react';
import { RichTextText } from '@notionhq/client/build/src/api-types';
export declare const NotionText: ({ text, ...props }: {
    text?: RichTextText[] | null | undefined;
} & TextProps) => JSX.Element;
