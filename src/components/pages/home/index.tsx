import React from 'react';

import { Button } from 'src/components/shared/common';
import { Variant } from 'src/components/shared/ui/button/types';
import Modal from 'src/components/shared/ui/modal';

import styles from './home.module.css';

const Home = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <section className={styles.container}>
      <Button materialVariant={Variant.CONTAINED} onClick={() => setOpen(true)} label="pum" />
      <h2>Home screen</h2>
      <Modal onClose={setOpen} isOpen={open} testId="testId">
        <div>
          <p>pum</p>
        </div>
      </Modal>
    </section>
  );
};

export default Home;
