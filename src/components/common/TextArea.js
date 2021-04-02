"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextArea = void 0;
const react_1 = __importDefault(require("react"));
const formik_1 = require("formik");
const semantic_ui_react_1 = require("semantic-ui-react");
//Arreglar types
const TextArea = (props) => {
    const [field, meta] = formik_1.useField(props);
    return (
    // '!!' para convertir meta.error en un boolean
    react_1.default.createElement(semantic_ui_react_1.FormField, { error: meta.touched && !!meta.error },
        react_1.default.createElement("label", null,
            props.label,
            react_1.default.createElement("textarea", Object.assign({}, field, props))),
        meta.touched && meta.error ? (react_1.default.createElement(semantic_ui_react_1.Label, { basic: true, color: 'red' }, meta.error)) : null));
};
exports.TextArea = TextArea;
//# sourceMappingURL=TextArea.js.map