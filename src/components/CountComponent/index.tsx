import { useAppSelector, useAppDispatch } from "@/appStore/hooks";
import {
	selectData,
	clearElementsTmp,
} from "@/appStore/reducers/drawElementsSlice";
import styles from './count.module.scss';

const CountComponent: React.FC = () => {
	const dispatch = useAppDispatch();
	const {
		elements
	} = useAppSelector(selectData);
	const clearElements = () => {
		dispatch(clearElementsTmp());
	};
	return (
		<div className={styles.count}>
			<p className={styles.count__info}>{elements.length} Elements</p>
			<button
				onClick={() => clearElements()}
				className="btn"
			>Clear</button>
		</div>
	)
};

export default CountComponent;
