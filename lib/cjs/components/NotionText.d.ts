/// <reference types="react" />
import { TextProps } from '@chakra-ui/react';
import { RichText } from '@notionhq/client/build/src/api-types';
export declare const NotionText: ({ text, ...props }: {
    text?: RichText[] | null | undefined;
} & TextProps) => JSX.Element;
