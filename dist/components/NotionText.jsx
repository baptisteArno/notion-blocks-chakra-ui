import React from 'react';
import { chakra, Link } from '@chakra-ui/react';
export const NotionText = ({ text, ...props }) => {
    if (!text) {
        return <></>;
    }
    return (<>
      {text.map((value, idx) => {
            const { annotations: { bold, code, color, italic, strikethrough, underline }, text, } = value;
            let textDecoration = 'none';
            if (strikethrough) {
                textDecoration = 'strikethrough';
            }
            if (underline) {
                textDecoration = 'underline';
            }
            let codeProps = {};
            if (code) {
                codeProps = {
                    fontFamily: 'monospace',
                    backgroundColor: 'gray.700',
                    p: '2',
                    rounded: 'md',
                };
            }
            return (<chakra.span key={value.plain_text + idx} fontWeight={bold ? 'bold' : 'unset'} fontStyle={italic ? 'italic' : 'unset'} textDecoration={textDecoration} textColor={color !== 'default' ? color : 'unset'} {...codeProps} {...props}>
            {text.link ? (<Link href={text.link.url} isExternal textDecoration="underline">
                {text.content}
              </Link>) : (text.content)}
          </chakra.span>);
        })}
    </>);
};
