import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from 'components/common/styles';

const VirtualizedList = props => {
  const scrollableWrapper = useRef(null);
  const lastVisibleOptRef = useRef(null);
  const {
    maxHeight,
    itemHeight,
    defaultStartingIndex,
    options,
    renderRow
  } = props;

  const initialState = {
    startingIndex: defaultStartingIndex
  };

  const [state, setState] = useState(initialState);

  const onScroll = () =>
    setState({
      ...state,
      startingIndex: Math.ceil(scrollableWrapper.current.scrollTop / itemHeight)
    });

  const getIndexBeingLooped = key => state.startingIndex + key;

  const getMarginTop = () =>
    scrollableWrapper ? scrollableWrapper.current.scrollTop : 0;

  const itemsCountToShow = Math.ceil(maxHeight / itemHeight);

  const getScrollHeight = () =>
    state.totalHeight > maxHeight ? state.totalHeight : maxHeight;

  const renderListItems = (_, i) => {
    const index = getIndexBeingLooped(i);
    const listItem = options[index];
    return (
      listItem && (
        <Wrapper key={`options-${index}`} innerRef={lastVisibleOptRef}>
          {renderRow(listItem, index)}
        </Wrapper>
      )
    );
  };

  useEffect(() => {
    const isBottoReached =
      state.totalHeight - scrollableWrapper.current.scrollTop - maxHeight === 0;
    if (isBottoReached) {
      let { totalHeight } = state;
      const ref = lastVisibleOptRef.current;
      if (ref && ref.getBoundingClientRect().top > maxHeight) {
        totalHeight += ref.getBoundingClientRect().top - maxHeight;
      }
      setState({ ...state, totalHeight });
    }
  });

  useEffect(() => {
    setState({ totalHeight: itemHeight * options.length });
  }, [itemHeight, options.length]);

  return (
    <Wrapper
      maxHeight={`${maxHeight}px`}
      ref={scrollableWrapper}
      onScroll={onScroll}
      overflow="auto"
    >
      <Wrapper height={`${getScrollHeight()}px`} overflow="hidden">
        <Wrapper margin={`${getMarginTop()}px 0 0`}>
          {Array(itemsCountToShow)
            .fill()
            .map(renderListItems)}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

VirtualizedList.defaultProps = {
  options: [],
  defaultStartingIndex: 0
};

VirtualizedList.propTypes = {
  maxHeight: PropTypes.number.isRequired,
  itemHeight: PropTypes.number.isRequired,
  defaultStartingIndex: PropTypes.number,
  renderRow: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.any)
};

export default VirtualizedList;
