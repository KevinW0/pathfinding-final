import { useSelector, useDispatch } from 'react-redux';
import { selectors, actions } from './redux_store';

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

const Cell = ({ infoObj, updateInfoFunc }) => {
    const isStartSelected = useSelector(selectors.selectStartBoolean);
    const isTargetSelected = useSelector(selectors.selectTargetBoolean);

    const dispatchFunc = useDispatch();

    return (
        <div
            onClick={() => handleCellClick(true)(updateInfoFunc, infoObj, isStartSelected, dispatchFunc)}
            onContextMenu={(e) => {
                handleCellClick(false)(e, updateInfoFunc, infoObj, isTargetSelected, dispatchFunc);
            }}
            className='inline-block border-orange-150 text-center border-solid border col-span-1 row-span-1 h-6 w-6.5'
        >
            {infoObj.isStart && 'S'}
            {infoObj.isTarget && 'T'}
            {infoObj.visited && 'V'}
        </div>
    );
};
export default Cell;
