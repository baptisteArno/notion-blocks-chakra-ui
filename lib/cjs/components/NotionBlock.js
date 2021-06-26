"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionBlock = void 0;
var react_1 = __importDefault(require("react"));
var react_2 = require("@chakra-ui/react");
var NotionText_1 = require("./NotionText");
var NotionBlock = function (_a) {
    var block = _a.block;
    var type = block.type;
    var definedBlock;
    var richTexts;
    switch (type) {
        case 'paragraph':
            definedBlock = block;
            richTexts = definedBlock.paragraph.text;
            if ((richTexts !== null && richTexts !== void 0 ? richTexts : []).length === 0)
                return react_1.default.createElement("br", null);
            if (richTexts[0].text.content.startsWith('youtubeId: ')) {
                return (react_1.default.createElement("iframe", { width: "100%", height: "500px", src: 'https://www.youtube.com/embed/' +
                        richTexts[0].text.content.split('youtubeId: ').pop(), title: "YouTube video player", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, style: { borderRadius: '10px' } }));
            }
            if (richTexts[0].text.content.startsWith('imagePath')) {
                return (react_1.default.createElement(react_2.Box, { w: "100%", h: richTexts[0].text.content.split(',')[1] + "px", pos: "relative" },
                    react_1.default.createElement(react_2.Image, { src: richTexts[0].text.content.split(',').pop(), layout: "fill", objectFit: "contain" })));
            }
            if (richTexts[0].text.content.startsWith('videoPath: ')) {
                return (react_1.default.createElement("video", { width: "100%", height: "500px", style: { maxHeight: '500px' }, controls: true },
                    react_1.default.createElement("source", { src: richTexts[0].text.content.split('videoPath: ').pop(), type: "video/mp4" }),
                    "Your browser does not support the video tag."));
            }
            return (react_1.default.createElement(react_2.Text, null,
                react_1.default.createElement(NotionText_1.NotionText, { text: richTexts })));
            break;
        case 'heading_1':
            definedBlock = block;
            richTexts = definedBlock.heading_1.text;
            return (react_1.default.createElement(react_2.Heading, { as: "h1", my: 4 },
                react_1.default.createElement(NotionText_1.NotionText, { text: richTexts })));
        case 'heading_2':
            definedBlock = block;
            richTexts = definedBlock.heading_2.text;
            return (react_1.default.createElement(react_2.Heading, null,
                react_1.default.createElement(NotionText_1.NotionText, { text: richTexts })));
        case 'heading_3':
            definedBlock = block;
            richTexts = definedBlock.heading_3.text;
            return (react_1.default.createElement(react_2.Heading, { as: "h3" },
                react_1.default.createElement(NotionText_1.NotionText, { text: richTexts })));
        case 'bulleted_list_item':
        // TO-DO
        case 'numbered_list_item':
            definedBlock = block;
            richTexts = definedBlock.numbered_list_item.text;
            return (react_1.default.createElement(react_2.Text, null,
                react_1.default.createElement(NotionText_1.NotionText, { text: richTexts })));
        case 'child_page':
        // TO-DO
        default:
            return (react_1.default.createElement(react_2.Text, null, "\u274C Unsupported block (" + (type === 'unsupported' ? 'unsupported by Notion API' : type) + ")"));
    }
};
exports.NotionBlock = NotionBlock;
