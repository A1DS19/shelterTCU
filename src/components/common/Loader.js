"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderComponent = void 0;
const react_1 = __importDefault(require("react"));
const semantic_ui_react_1 = require("semantic-ui-react");
const LoaderComponent = ({ inverted = true, content = 'Cargando...', }) => {
    return (react_1.default.createElement(semantic_ui_react_1.Dimmer, { inverted: inverted, active: true, page: true },
        react_1.default.createElement(semantic_ui_react_1.Loader, { content: content })));
};
exports.LoaderComponent = LoaderComponent;
//# sourceMappingURL=Loader.js.map