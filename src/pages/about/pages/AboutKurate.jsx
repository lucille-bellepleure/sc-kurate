import React from 'react'
import main from 'styles.module.css'

import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import logo from 'images/logo-transparent-Y.png'
const theme = createTheme({
	// Style sheet name ⚛️
	palette: {
		primary: { main: '#333333' },
		secondary: { main: '#f55858' },
	},
})

export function AboutKurate({ nextStage, exitStage, user, userfeed, usersubs, account }) {
	return (
		<ThemeProvider theme={theme}>
			<div className={main.container}>
				<div className={main.aboutContainer}>
					<div className={main.spacer}></div>

					<img src={logo} />

					<div className={main.aboutBrand}>kurate</div>

					{/* <div className={main.logotext}>by swarm.<span className={main.offset}>city</span></div> */}
					<div className={main.spacer}></div>
					<div className={main.spacer}></div>
					<div className={main.spacer}></div>
					<div className={main.spacer}></div>
					<div className={main.spacer}></div>

					<div
						className={[main.buttonYellow, main.offset].join(" ")}
						onClick={() => {
							nextStage()
						}}
					>
						enter here
					</div>
				</div>
				<div className={main.aboutFooter}>
					<div className={main.smallBold}>v0.0.2</div>
					<div className={main.blueLink}>Join our Discord</div>
					<div className={main.blueLink}>Source Code on Github</div>
					<div className={main.blueLink}>Swarm + Waku inside</div>
					{/* <div className={main.smallBold}>find us on Discord</div>
                    <div className={main.smallBold}>open source on Github</div>
                    <div className={main.smallBold}>funded by Swarm</div> */}
				</div>
			</div>
		</ThemeProvider>
	)
}

export default AboutKurate
