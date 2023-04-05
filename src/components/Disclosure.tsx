import React, { FC } from 'react';
import { motion } from 'framer-motion';

import { ReactComponent as CrossIcon } from '../assets/icons/cross.svg';

interface DisclosureProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Disclosure: FC<DisclosureProps> = ({ modal, setModal }) => {
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
      <motion.div
        className="absolute z-10 flex flex-col justify-center items-center bg-white rounded-[14px] max-w-[786px] w-full h-auto p-[48px]"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
      >
        <motion.div
          whileHover={{ scale: 1.3, rotateZ: '90deg' }}
          onClick={toggleModal}
          className="absolute z-20 top-0 right-0 m-5 cursor-pointer"
        >
          <CrossIcon />
        </motion.div>
        <h2 className="text-lg font-semibold pb-[48px]">Advertiser Disclosure</h2>
        <p className="text-base font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas
          vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum
          quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident
          similique accusantium nemo autem. <br />
          <br />
          Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
          nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error,
          harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error
          repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi
          expedita sint? Sed quibusdam recusandae alias error harum maxime adipisci amet laborum.
        </p>
      </motion.div>

      {/* dark screen */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="absolute w-full h-full bg-black bg-opacity-80 z-0"
        onClick={toggleModal}
      ></motion.div>
    </div>
  );
};
