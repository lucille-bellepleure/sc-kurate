import reducer from './reducer'
import saga from './sagas'

// Service > system

export const mountPoint = 'users'

const service = {
	mountPoint,
	reducer,
	saga,
}

export default service
