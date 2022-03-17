import React from 'react'
import main from '../styles.module.css'
import { Home, Add, ArrowForwardIos, FavoriteBorder, Person, PlayCircleFilledWhite } from '@material-ui/icons'

function ActionButton(props) {
	//console.log(props)
	switch (props.type) {
		case 'sponsored':
			return (
				<div className={main.actionButton}>
					<div>Get rewarded 0.10 DAI</div>
					<div>
						<ArrowForwardIos className={main.iconAdjust} fontSize="small"></ArrowForwardIos>
					</div>
				</div>
			)
		case 'fundraiser':
			return (
				<div className={main.actionButton}>
					<div>Donate</div>
					<div>
						<ArrowForwardIos className={main.iconAdjust} fontSize="small"></ArrowForwardIos>
					</div>
				</div>
			)
		case 'shop':
			return (
				<div className={main.actionButton}>
					<div>Shop</div>
					<div>
						<ArrowForwardIos className={main.iconAdjust} fontSize="small"></ArrowForwardIos>
					</div>
				</div>
			)
		default:
			return null
	}
}

export default ActionButton
