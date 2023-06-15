import { useAppSelector } from "@/appStore/hooks";
import {
	selectData
} from "@/appStore/reducers/drawElementsSlice";
import styles from './elements_list.module.scss';

const ElementsListComponent: React.FC = () => {
	const {
		elements
	} = useAppSelector(selectData);
	return (
		<div className={styles.elements_list}>
			{
				elements.map(el => (
					<div
						key={el.id}
						className={styles.elements_list__wrap}
					>
						<div
							className={styles.elements_list__item}
							style={{backgroundColor: el.color}}
						></div>
					</div>
				))
			}
		</div>
	)
};

export default ElementsListComponent;
