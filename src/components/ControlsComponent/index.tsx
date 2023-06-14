import { useRef } from 'react';
import { HexColorPicker } from "react-colorful";
import {
	FeatureModes,
	defaultCurrentColor,
} from '@/appStore/reducers/drawElementsSlice';
import styles from './controls.module.scss';

const ElementSelectorComponent: React.FC = () => {
	const localColor = useRef<string>(defaultCurrentColor);
	const changeFeatureMode = (fMode: FeatureModes) => {
		if (fMode === 1) {
			// if mode is 1 we need to send to the redux also a local state color
			// so we don't torture redux every time you play with a color picker
			console.log('activate adding elements');
			console.log('localColor: ', localColor.current);
		} else {
			console.log('activated deleting elements');
		}
	};
	const setCurrentColor = (color: string) => {
		localColor.current = color;
	};
	return (
		<div className={styles.controls}>
			<button
				className={`${styles.controls__btn} btn`}
				onClick={() => changeFeatureMode(FeatureModes.addElement)}
			>+</button>
			<button
				className={`${styles.controls__btn} btn`}
				onClick={() => changeFeatureMode(FeatureModes.deleteElement)}
			>-</button>
			<HexColorPicker
				color={localColor.current}
				onChange={setCurrentColor}
			/>
		</div>
	)
};

export default ElementSelectorComponent;
