import reducer from './reducer'
//import saga from "./sagas";

// Service > system

export const mountPoint = 'homefeed'

const service = {
	mountPoint,
	reducer,
}

export default service
