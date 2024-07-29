import React, { memo, useState } from "react";
import clsx from "clsx";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #F6F6F6;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    transition: opacity 1s linear;

    &.image__loaded {
      opacity: 1;
    }
  }

  .image__loading {
    filter: blur(50px);
    transform: scale(1);
  }
`;

function ImageLoading({ smallSrc, largeSrc }) {
  const [isSmallImageLoaded, loadSmallImage] = useState(false);
  const [isLargeImageLoaded, loadLargeImage] = useState(false);

  const smallImageClass = clsx(
    "image__loading",
    isSmallImageLoaded && "image__loaded"
  );
  const largeImageClass = clsx(isLargeImageLoaded && "image__loaded");

  const handleSmallImageLoad = () => loadSmallImage(true);
  const handleLargeImageLoad = () => loadLargeImage(true);

  return (
    <Wrapper>
      <img src={smallSrc} className={smallImageClass} alt="" onLoad={handleSmallImageLoad} />
      <div style={{ paddingBottom: '66.6%' }} />
      <img src={largeSrc} className={largeImageClass} alt="" onLoad={handleLargeImageLoad} />
    </Wrapper>
  );
}

export default memo(ImageLoading);
