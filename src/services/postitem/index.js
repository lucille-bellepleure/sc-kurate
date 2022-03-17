import saga from './sagas'

// Service > system

export const mountPoint = 'postitem'

const service = {
	mountPoint,
	saga,
}

export default service
