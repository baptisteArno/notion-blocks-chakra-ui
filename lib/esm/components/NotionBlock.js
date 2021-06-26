import React from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { NotionText } from './NotionText';
export var NotionBlock = function (_a) {
    var block = _a.block;
    var type = block.type;
    var definedBlock;
    var richTexts;
    switch (type) {
        case 'paragraph':
            definedBlock = block;
            richTexts = definedBlock.paragraph.text;
            if ((richTexts !== null && richTexts !== void 0 ? richTexts : []).length === 0)
                return React.createElement("br", null);
            if (richTexts[0].text.content.startsWith('youtubeId: ')) {
                return (React.createElement("iframe", { width: "100%", height: "500px", src: 'https://www.youtube.com/embed/' +
                        richTexts[0].text.content.split('youtubeId: ').pop(), title: "YouTube video player", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, style: { borderRadius: '10px' } }));
            }
            if (richTexts[0].text.content.startsWith('imagePath')) {
                return (React.createElement(Box, { w: "100%", h: richTexts[0].text.content.split(',')[1] + "px", pos: "relative" },
                    React.createElement(Image, { src: richTexts[0].text.content.split(',').pop(), layout: "fill", objectFit: "contain" })));
            }
            if (richTexts[0].text.content.startsWith('videoPath: ')) {
                return (React.createElement("video", { width: "100%", height: "500px", style: { maxHeight: '500px' }, controls: true },
                    React.createElement("source", { src: richTexts[0].text.content.split('videoPath: ').pop(), type: "video/mp4" }),
                    "Your browser does not support the video tag."));
            }
            return (React.createElement(Text, null,
                React.createElement(NotionText, { text: richTexts })));
            break;
        case 'heading_1':
            definedBlock = block;
            richTexts = definedBlock.heading_1.text;
            return (React.createElement(Heading, { as: "h1", my: 4 },
                React.createElement(NotionText, { text: richTexts })));
        case 'heading_2':
            definedBlock = block;
            richTexts = definedBlock.heading_2.text;
            return (React.createElement(Heading, null,
                React.createElement(NotionText, { text: richTexts })));
        case 'heading_3':
            definedBlock = block;
            richTexts = definedBlock.heading_3.text;
            return (React.createElement(Heading, { as: "h3" },
                React.createElement(NotionText, { text: richTexts })));
        case 'bulleted_list_item':
        // TO-DO
        case 'numbered_list_item':
            definedBlock = block;
            richTexts = definedBlock.numbered_list_item.text;
            return (React.createElement(Text, null,
                React.createElement(NotionText, { text: richTexts })));
        case 'child_page':
        // TO-DO
        default:
            return (React.createElement(Text, null, "\u274C Unsupported block (" + (type === 'unsupported' ? 'unsupported by Notion API' : type) + ")"));
    }
};
