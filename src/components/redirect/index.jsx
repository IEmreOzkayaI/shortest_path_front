/* eslint-disable react/prop-types */
import styles from "./style.module.css";

const Redirect = ({text}) => {
	
	return (
		<div className={styles.verified_redirect}>
			<div className={styles.verified_redirect_content}>
				<div className={styles.verified_redirect_title}>
					<span>PURE | </span> {text}
				</div>
			</div>
		</div>
	);
};

export default Redirect;
