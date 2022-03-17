import reducer from './reducer'
import saga from './sagas'

// Service > system

export const mountPoint = 'account'

const service = {
	mountPoint,
	saga,
	reducer,
}

export default service
