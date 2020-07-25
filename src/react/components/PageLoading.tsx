import React, { memo, FC } from 'react';
import './PageLoading.css';

interface PageLoadingProps {
  transparent: number;
}
const PageLoading: FC<PageLoadingProps> = function PageLoading({
  transparent,
}) {
  return (
    <div
      className="loading"
      style={{ background: `rgba(255,255,255,${transparent})` }}
    >
      加载中...
    </div>
  );
};
export default memo(PageLoading);
