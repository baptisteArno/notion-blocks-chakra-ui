var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import { Box, Heading, Text, Image, chakra } from '@chakra-ui/react';
import { NotionText } from './NotionText';
export var NotionBlock = function (_a) {
    var _b, _c;
    var block = _a.block, customImage = _a.customImage;
    var type = block.type;
    var definedBlock;
    var richTexts;
    switch (type) {
        case 'paragraph':
            definedBlock = block;
            richTexts = definedBlock.paragraph.text;
            if ((richTexts !== null && richTexts !== void 0 ? richTexts : []).length === 0)
                return React.createElement("br", null);
            if (richTexts[0].text.content.startsWith('[image')) {
                var imageProps = richTexts[0].text.content
                    .slice(1)
                    .slice(0, -1)
                    .split(',')
                    .map(function (val) { return val.trim(); })
                    .slice(1);
                return (React.createElement(Box, { w: "100%", className: "image-container" }, customImage && customImage.Image ? (React.createElement(customImage.Image, __assign({ src: imageProps[0] }, customImage.props))) : (React.createElement(Image, { src: imageProps[0], layout: "fill", objectFit: "contain" }))));
            }
            if (richTexts[0].text.content.startsWith('[video')) {
                var videoProps = richTexts[0].text.content
                    .slice(1)
                    .slice(0, -1)
                    .split(',')
                    .map(function (val) { return val.trim(); })
                    .slice(1);
                return (React.createElement("video", { width: "100%", height: (_b = videoProps[1]) !== null && _b !== void 0 ? _b : '300px', style: { maxHeight: (_c = videoProps[1]) !== null && _c !== void 0 ? _c : '300px' }, controls: true },
                    React.createElement("source", { src: videoProps[0], type: "video/mp4" }),
                    "Your browser does not support the video tag."));
            }
            return (React.createElement(Text, null,
                React.createElement(NotionText, { text: richTexts })));
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
        case 'numbered_list_item':
            definedBlock = block;
            if (!definedBlock.bulleted_list_item.text)
                return React.createElement(React.Fragment, null);
            return (React.createElement(chakra.li, null,
                React.createElement(NotionText, { text: definedBlock.bulleted_list_item.text })));
        default:
            return (React.createElement(Text, null, "\u274C Unsupported block (" + (type === 'unsupported' ? 'unsupported by Notion API' : type) + ")"));
    }
};
