import styles from "./Containers.module.css";

function Containers(props) {
    return (
        <div className={`${styles.container} ${styles[props.customClass]}`}>
            {props.children}
        </div>
    );
}

export default Containers;
