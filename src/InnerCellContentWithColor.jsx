import React from 'react';
import { motion } from 'framer-motion';
const InnerCellContentWithColor = (color) => {
    return (
        <motion.div
            className={`${color} h-full w-full`}
            initial={{ scale: 0 }}
            animate={{ scale: 0.8 }}
            transition={{ duration: 1 }}
            style={{ position: 'fixed' }}
        ></motion.div>
    );
};

export default InnerCellContentWithColor;
