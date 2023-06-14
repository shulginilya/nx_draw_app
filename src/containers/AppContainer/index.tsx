import {
	CanvasComponent,
	SideMenuComponent,
} from '@/components';
import styles from './app_container.module.scss';

const AppContainer: React.FC = () => {
	return (
		<main className={styles.app_container}>
			<SideMenuComponent />
			<CanvasComponent />
		</main>
	)
};

export default AppContainer;
