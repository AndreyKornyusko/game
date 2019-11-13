import React from 'react'
import styles from './loader.module.css';
import { symlink } from 'fs';

const Loader= () => (
  <div className={styles.loader}>...Loading</div>
)

export default Loader;