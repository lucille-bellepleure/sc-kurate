import reducer from "./reducer";
import saga from "./sagas";

// Service > system

export const mountPoint = "users";

export default {
    mountPoint,
    reducer,
    saga
};
