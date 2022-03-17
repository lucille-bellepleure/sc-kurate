import React, { useState } from 'react'
import 'cropperjs/dist/cropper.css'
import main from 'styles.module.css'
import { NavLink } from 'react-router-dom'
export function MetaDataPhoto({ sharePost, image, accountUnlock }) {
	const [textInput, setTextInput] = useState()

	const handlePost = () => {
		const time = new Date().toISOString()
		sharePost({ image: image, caption: textInput, time: time })
	}

	return (
		<div className={main.container}>
			<div className={main.header}>
				<div>
					<NavLink className={[main.textbutton, main.gray].join(' ')} to="/">
						Cancel
					</NavLink>
				</div>
				<div
					onClick={() => {
						handlePost()
					}}
					className={[main.blue, main.bodyBold, main.textbutton].join(' ')}
				>
					{accountUnlock ? 'Share' : 'Unlock'}
				</div>
			</div>
			<div className={main.photoplace}>
				<div className={main.metaContainer}>
					<img src={image} width="100" height="100"></img>
					<textarea
						type="text"
						autoFocus
						rows="4"
						maxLength="78"
						className={main.textinput}
						value={textInput}
						placeholder="Write a caption..."
						onChange={(e) => setTextInput(e.target.value)}
					/>
				</div>
			</div>
		</div>
	)
}

export default MetaDataPhoto
