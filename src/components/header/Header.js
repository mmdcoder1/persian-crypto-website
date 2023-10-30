import React from 'react';

//style
import styles from './header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>بروزترین اطلاعات ارز های دیجیتال
                 <span className={styles.headerTitleAfter}></span>
            </h1>
        </header>
    );
};

export default Header;