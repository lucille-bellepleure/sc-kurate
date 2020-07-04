import reducer from "./reducer";
import saga from "./sagas";

// Service > system

export const mountPoint = "user";

export default {
    mountPoint,
    reducer,
    saga
};
