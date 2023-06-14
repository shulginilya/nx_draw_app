import { HexColorPicker } from "react-colorful";
import { useAppSelector, useAppDispatch } from "@/appStore/hooks";
import {
	selectData,
	FeatureModes,
	FeatureModeType,
	genericChangeData,
} from '@/appStore/reducers/drawElementsSlice';
import styles from './controls.module.scss';

const ElementSelectorComponent: React.FC = () => {
	const dispatch = useAppDispatch();
	const {
		featureMode,
		currentColor,
	} = useAppSelector(selectData);
	const changeFeatureMode = (fMode: FeatureModeType) => {
		dispatch(genericChangeData({
			featureMode: fMode
		}));
	};
	const setCurrentColor = (color: string) => {
		dispatch(genericChangeData({
			currentColor: color
		}));
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
				color={currentColor}
				onChange={setCurrentColor}
			/>
		</div>
	)
};

export default ElementSelectorComponent;
