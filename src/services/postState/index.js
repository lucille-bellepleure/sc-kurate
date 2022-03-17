import reducer from './reducer'
import saga from './sagas'

// Service > system

export const mountPoint = 'postState'

export default {
	mountPoint,
	reducer,
	saga,
}
