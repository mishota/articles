import styles from "./Layout.module.scss";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className={styles.container}>
      <>
        <Outlet />
      </>
    </div>
  );
};

export default Layout;
