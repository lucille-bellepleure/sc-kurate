import reducer from './reducer'
import saga from './sagas'

// Service > system

export const mountPoint = 'postState'

const service = {
	mountPoint,
	reducer,
	saga,
}

export default service
