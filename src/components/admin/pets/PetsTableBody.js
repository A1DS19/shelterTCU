"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetsTableBody = void 0;
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const semantic_ui_react_1 = require("semantic-ui-react");
const pets_1 = require("../../../actions/pets/pets");
const PetsTableBody = ({ petsData }) => {
    const [openConfirm, setConfirm] = react_1.useState(false);
    const [petToDelete, setPetToDelete] = react_1.useState({ id: '', name: '' });
    const history = react_router_1.useHistory();
    const dispatch = react_redux_1.useDispatch();
    const openDeleteConfirm = (id, name) => {
        setPetToDelete({ id, name });
        setConfirm(true);
    };
    const handleDelete = (id) => {
        dispatch(pets_1.deletePet(id));
    };
    return (react_1.default.createElement(react_1.Fragment, null,
        petsData.map((pet) => {
            var _a;
            return (react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(semantic_ui_react_1.Table.Row, { key: pet._id },
                    react_1.default.createElement(semantic_ui_react_1.Table.Cell, { content: ((_a = pet._id) === null || _a === void 0 ? void 0 : _a.slice(0, 5)) + '...' }),
                    react_1.default.createElement(semantic_ui_react_1.Table.Cell, { content: pet.name }),
                    react_1.default.createElement(semantic_ui_react_1.Table.Cell, { content: pet.location }),
                    react_1.default.createElement(semantic_ui_react_1.Table.Cell, { content: pet.breed }),
                    react_1.default.createElement(semantic_ui_react_1.Table.Cell, { content: JSON.parse(pet.adopted) ? (react_1.default.createElement(semantic_ui_react_1.Icon, { color: 'green', name: 'check' })) : (react_1.default.createElement(semantic_ui_react_1.Icon, { color: 'red', name: 'x' })) }),
                    react_1.default.createElement(semantic_ui_react_1.Table.Cell, { content: (pet === null || pet === void 0 ? void 0 : pet.photosUrl) ? (pet.photosUrl.length > 0 ? (react_1.default.createElement(semantic_ui_react_1.Icon, { color: 'green', name: 'check' })) : (react_1.default.createElement(semantic_ui_react_1.Icon, { color: 'red', name: 'x' }))) : (react_1.default.createElement(semantic_ui_react_1.Icon, { color: 'red', name: 'x' })) }),
                    react_1.default.createElement(semantic_ui_react_1.Table.Cell, { content: pet.description.substring(0, 20) + '...' }),
                    react_1.default.createElement(semantic_ui_react_1.Table.Cell, null,
                        react_1.default.createElement(semantic_ui_react_1.Icon, { link: true, onClick: () => history.push(`/admin/pets/${pet._id}`), size: 'large', name: 'edit' }),
                        react_1.default.createElement(semantic_ui_react_1.Icon, { link: true, onClick: () => openDeleteConfirm(pet._id, pet.name), size: 'large', color: 'red', name: 'delete' })))));
        }),
        react_1.default.createElement(semantic_ui_react_1.Confirm, { content: `Esta seguro que desea eliminar a ${petToDelete.name}?`, cancelButton: 'CANCELAR', confirmButton: 'ELIMINAR', size: 'small', open: openConfirm, onCancel: () => setConfirm(false), onConfirm: () => handleDelete(petToDelete.id) })));
};
exports.PetsTableBody = PetsTableBody;
//# sourceMappingURL=PetsTableBody.js.map