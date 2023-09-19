import { motion } from 'framer-motion';

const InnerCellContentWithIcon = (Icon) => (
    <motion.div
        className='bg-gray-50 h-full w-full text-center justify-center'
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 0.9 }}
        transition={{ duration: 1 }}
        style={{ position: 'fixed' }}
    >
        <Icon style={{ display: 'inline' }} />
    </motion.div>
);

export default InnerCellContentWithIcon;
