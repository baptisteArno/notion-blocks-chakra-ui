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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { chakra, Link } from '@chakra-ui/react';
export var NotionText = function (_a) {
    var text = _a.text, props = __rest(_a, ["text"]);
    if (!text) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(React.Fragment, null, text.map(function (value, idx) {
        if (!('text' in value)) {
            return React.createElement(React.Fragment, null);
        }
        var _a = value.annotations, bold = _a.bold, code = _a.code, color = _a.color, italic = _a.italic, strikethrough = _a.strikethrough, underline = _a.underline, text = value.text;
        var textDecoration = 'none';
        if (strikethrough) {
            textDecoration = 'strikethrough';
        }
        if (underline) {
            textDecoration = 'underline';
        }
        var codeProps = {};
        if (code) {
            codeProps = {
                fontFamily: 'monospace',
                backgroundColor: 'gray.700',
                p: '2',
                rounded: 'md',
            };
        }
        return (React.createElement(chakra.span, __assign({ key: value.plain_text + idx, fontWeight: bold ? 'bold' : 'unset', fontStyle: italic ? 'italic' : 'unset', textDecoration: textDecoration, textColor: color !== 'default' ? color : 'unset' }, codeProps, props), text.link ? (React.createElement(Link, { href: text.link.url, isExternal: true, textDecoration: "underline" }, text.content)) : (text.content)));
    })));
};