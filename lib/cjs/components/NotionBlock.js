"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionBlock = void 0;
var react_1 = __importDefault(require("react"));
var react_2 = require("@chakra-ui/react");
var NotionText_1 = require("./NotionText");
var NotionBlock = function (_a) {
    var _b, _c, _d;
    var block = _a.block, customImage = _a.customImage;
    var type = block.type;
    var definedBlock;
    var richTexts;
    switch (type) {
        case 'paragraph':
            definedBlock = block;
            richTexts = definedBlock.paragraph.text;
            if ((richTexts !== null && richTexts !== void 0 ? richTexts : []).length === 0)
                return react_1.default.createElement("br", null);
            if (richTexts[0].text.content.startsWith('[image')) {
                var imageProps = richTexts[0].text.content
                    .slice(1)
                    .slice(0, -1)
                    .split(',')
                    .map(function (val) { return val.trim(); })
                    .slice(1);
                console.log(imageProps);
                return (react_1.default.createElement(react_2.Box, { w: "100%", h: (_b = imageProps[1]) !== null && _b !== void 0 ? _b : '300px', pos: "relative" }, customImage && customImage.Image ? (react_1.default.createElement(customImage.Image, __assign({ src: imageProps[0] }, customImage.props))) : (react_1.default.createElement(react_2.Image, { src: imageProps[0], layout: "fill", objectFit: "contain" }))));
            }
            if (richTexts[0].text.content.startsWith('[video')) {
                var videoProps = richTexts[0].text.content
                    .slice(1)
                    .slice(0, -1)
                    .split(',')
                    .map(function (val) { return val.trim(); })
                    .slice(1);
                return (react_1.default.createElement("video", { width: "100%", height: (_c = videoProps[1]) !== null && _c !== void 0 ? _c : '300px', style: { maxHeight: (_d = videoProps[1]) !== null && _d !== void 0 ? _d : '300px' }, controls: true },
                    react_1.default.createElement("source", { src: videoProps[0], type: "video/mp4" }),
                    "Your browser does not support the video tag."));
            }
            return (react_1.default.createElement(react_2.Text, null,
                react_1.default.createElement(NotionText_1.NotionText, { text: richTexts })));
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
        case 'numbered_list_item':
            definedBlock = block;
            if (!definedBlock.bulleted_list_item.text)
                return react_1.default.createElement(react_1.default.Fragment, null);
            return (react_1.default.createElement(react_2.chakra.li, null,
                react_1.default.createElement(NotionText_1.NotionText, { text: definedBlock.bulleted_list_item.text })));
        default:
            return (react_1.default.createElement(react_2.Text, null, "\u274C Unsupported block (" + (type === 'unsupported' ? 'unsupported by Notion API' : type) + ")"));
    }
};
exports.NotionBlock = NotionBlock;
