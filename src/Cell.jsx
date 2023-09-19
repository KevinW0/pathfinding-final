import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from './redux_store';
import { motion } from 'framer-motion';
import { SiTarget } from 'react-icons/si';
import { VscDebugStart } from 'react-icons/vsc';
import { CgBlock } from 'react-icons/cg';
import InnerCellContentWithIcon from './InnerCellContentWithIcon';
import InnerCellContentWithColor from './InnerCellContentWithColor';
const handleCellClick = (isRegularClick) =>
    isRegularClick
        ? (updateInfoFunction, infoObj, isStartSelected, dispatchFunc) => {
              if ((!isStartSelected || infoObj.isStart) && !infoObj.isTarget) {
                  updateInfoFunction({ ...infoObj, isStart: !infoObj.isStart });
                  dispatchFunc({ type: actions.startCoordAction, payload: { x: infoObj.x, y: infoObj.y } });
              }
              //TODO - some instructional popup anchored to the cell
          }
        : (e, updateInfoFunction, infoObj, isTargetSelected, dispatchFunc) => {
              e.preventDefault();
              if ((!isTargetSelected || infoObj.isTarget) && !infoObj.isStart) {
                  updateInfoFunction({ ...infoObj, isTarget: !infoObj.isTarget });
                  dispatchFunc({ type: actions.targetCoordAction, payload: { x: infoObj.x, y: infoObj.y } });
                  return;
              }
          };

const dragHandler = (e, updateInfoFunction, infoObj) => {
    if (infoObj.isTarget || infoObj.isStart) {
        return;
    }
    updateInfoFunction({ ...infoObj, isWall: !infoObj.isWall });
    return;
};

const Cell = ({ infoObj, updateInfoFunc }) => {
    const isStartSelected = useSelector(selectors.selectStartBoolean);
    const isTargetSelected = useSelector(selectors.selectTargetBoolean);

    const dispatchFunc = useDispatch();

    const className = `inline-block border-orange-150 border-solid border col-span-1 row-span-1 h-6 w-6.5 justify-center text-center`;
    return (
        <motion.div
            onClick={() => handleCellClick(true)(updateInfoFunc, infoObj, isStartSelected, dispatchFunc)}
            onContextMenu={(e) => {
                handleCellClick(false)(e, updateInfoFunc, infoObj, isTargetSelected, dispatchFunc);
            }}
            onDoubleClick={(e) => dragHandler(e, updateInfoFunc, infoObj)}
            className={className}
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{ duration: 5 }}
        >
            {infoObj.isWall && InnerCellContentWithIcon(CgBlock)}
            {infoObj.visited && InnerCellContentWithColor('bg-amber-200')}
            {infoObj.isPredecessor && InnerCellContentWithColor('bg-lime-600')}
            {infoObj.isStart && InnerCellContentWithIcon(VscDebugStart)}
            {infoObj.isTarget && InnerCellContentWithIcon(SiTarget)}
        </motion.div>
    );
};
export default Cell;
