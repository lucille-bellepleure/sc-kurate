import reducer from './reducer'
import saga from './sagas'

// Service > system

export const mountPoint = 'system'

const service = {
	mountPoint,
	reducer,
	saga,
}

export default service
