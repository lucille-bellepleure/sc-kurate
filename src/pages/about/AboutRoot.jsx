import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Sub-pages
import AboutKurate from './pages/AboutKurate'

// Ids
const aboutKurate = 'aboutKurate'

export function AboutRoot() {
	const navigate = useNavigate()
	const [stage, setStage] = useState(aboutKurate)

	// Router
	switch (stage) {
		case aboutKurate:
			return <AboutKurate nextStage={() => navigate('/home')} />

		default:
			return <h1>Oops...</h1>
	}
}

export default AboutRoot
