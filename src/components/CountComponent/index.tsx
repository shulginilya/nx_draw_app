import styles from './count.module.scss';

const CountComponent: React.FC = () => {
	return (
		<div className={styles.count}>
			<p className={styles.count__info}>5 Elements</p>
			<button className="btn">Clear</button>
		</div>
	)
};

export default CountComponent;
