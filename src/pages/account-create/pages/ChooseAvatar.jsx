import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import styles from 'styles.module.css'
import createAccount from '../account-create.module.css'
import PropTypes from 'prop-types'

export default class ChooseAvatar extends React.Component {
	static propTypes = {
		setAvatar: PropTypes.func.isRequired,
	}

	state = {
		image: this.props.avatar,
		allowZoomOut: false,
		position: {
			x: 0.5,
			y: 0.5,
		},
		scale: 1.2,
		rotate: 0,
		borderRadius: 200,
		preview: null,
		width: 200,
		height: 200,
	}

	handleSave = (data) => {
		const img = this.editor.getImageScaledToCanvas().toDataURL()
		const rect = this.editor.getCroppingRect()

		this.setState({
			preview: {
				img,
				rect,
				scale: this.state.scale,
				width: this.state.width,
				height: this.state.height,
				borderRadius: this.state.borderRadius,
			},
		})
	}

	handleScale = (e) => {
		const scale = parseFloat(e.target.value)
		this.setState({ scale })
	}

	handleNewImage = (e) => {
		this.setState({ image: e.target.files[0] })
	}

	rotateRight = (e) => {
		e.preventDefault()
		this.setState({
			rotate: this.state.rotate + 90,
		})
	}

	handlePositionChange = (position) => {
		this.setState({ position })
	}

	onClickSave = () => {
		if (this.editor) {
			// This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
			// drawn on another canvas, or added to the DOM.
			const canvas = this.editor.getImage()
			// If you want the image resized to the canvas size (also a HTMLCanvasElement)
			// const canvasScaled = this.editor.getImageScaledToCanvas();
			this.props.setAvatar(canvas.toDataURL('image/jpeg', 0.82))
			this.props.exitStage()
		}
	}

	setEditorRef = (editor) => (this.editor = editor)

	render() {
		return (
			<div className={createAccount.formcontainer}>
				<div className={createAccount.avatareditor}>
					<div className={styles.rotateicon} onClick={this.rotateRight} />
					<AvatarEditor
						ref={this.setEditorRef}
						scale={parseFloat(this.state.scale)}
						width={this.state.width}
						height={this.state.height}
						position={this.state.position}
						onPositionChange={this.handlePositionChange}
						rotate={parseFloat(this.state.rotate)}
						borderRadius={this.state.borderRadius}
						image={this.state.image}
					/>
				</div>
				<div className={createAccount.sliderbox}>
					<input
						name="scale"
						type="range"
						onChange={this.handleScale}
						min={'1'}
						max="3"
						step="0.01"
						defaultValue="1.2"
					/>
				</div>
				<div className={createAccount.blacktext}>scroll to zoom - drag to move</div>
				<label for="newFile" className={createAccount.choosefile} onClick="">
					choose another file
				</label>
				<input
					hidden="hidden"
					name="newImage"
					id="newFile"
					accept=".jpg, .jpeg, .png, .gif"
					type="file"
					onChange={this.handleNewImage}
					className={createAccount.fileinput}
				/>

				<div className={createAccount.dialogiconbox}>
					<div onClick={this.props.exitStage} className={[styles.iconbuttonbig, createAccount.cancel].join(' ')}>
						<div className={styles.xmarkicon} />
					</div>
					<div
						className={[styles.iconbuttonbig, createAccount.confirm].join(' ')}
						onClick={this.onClickSave.bind(this)}
					>
						<div className={styles.vmarkicon} />
					</div>
				</div>
			</div>
		)
	}
}
