import { useRef } from 'react';
import { HexColorPicker } from "react-colorful";
import { useAppSelector, useAppDispatch } from "@/appStore/hooks";
import {
	selectData,
	FeatureModes,
	defaultCurrentColor,
	FeatureModeType,
	genericChangeData,
} from '@/appStore/reducers/drawElementsSlice';
import styles from './controls.module.scss';

const ElementSelectorComponent: React.FC = () => {
	const dispatch = useAppDispatch();
	const {
		featureMode
	} = useAppSelector(selectData);
	const localColor = useRef<string>(defaultCurrentColor);
	const changeFeatureMode = (fMode: FeatureModeType) => {
		if (fMode === 1) {
			// if mode is 1 we need to send to the redux also a local state color
			// so we don't torture redux every time you play with a color picker
			dispatch(genericChangeData({
				currentColor: localColor.current,
				featureMode: fMode
			}));
		} else {
			// activated deleting elements mode
			dispatch(genericChangeData({
				featureMode: fMode
			}));
		}
	};
	const setCurrentColor = (color: string) => {
		localColor.current = color;
	};
	const addElementButtonClass = featureMode === 1 ? 'btn btn__opacity' : 'btn';
	const deleteElementButtonClass = featureMode === 2 ? 'btn btn__opacity' : 'btn';
	return (
		<div className={styles.controls}>
			<button
				className={`${styles.controls__btn} ${addElementButtonClass}`}
				onClick={() => changeFeatureMode(FeatureModes.addElement)}
			>+</button>
			<button
				className={`${styles.controls__btn} btn ${deleteElementButtonClass}`}
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
