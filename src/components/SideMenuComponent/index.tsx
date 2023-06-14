import {
	ControlsComponent,
	ElementSelectorComponent,
	CountComponent,
} from '@/components';
import styles from './side_menu.module.scss';

const SideMenuComponent: React.FC = () => {
	return (
		<aside className={styles.side_menu}>
			<div className={styles.side_menu__controls}>
				<ControlsComponent />
			</div>
			<div className={styles.side_menu__elements_selector}>
				<ElementSelectorComponent />
			</div>
			<div className={styles.side_menu__count}>
				<CountComponent />
			</div>
		</aside>
	)
};

export default SideMenuComponent;
