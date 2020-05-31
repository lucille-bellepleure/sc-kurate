import reducer from "./reducer";
import saga from "./sagas";

// Service > system

export const mountPoint = "account";

export default {
    mountPoint,
    saga,
    reducer
};
