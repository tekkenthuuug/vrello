import { css } from 'styled-components';

export const SkeletonLoadingCss = css`
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;

  & * {
    position: relative;
    overflow: hidden;

    background-color: rgba(0, 0, 0, 0.05);
  }

  & *::before,
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.05) 50%,
      transparent 100%
    );
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes load {
    from {
      top: -100%;
    }
    to {
      top: 100%;
    }
  }
`;

export const ClickableIconCss = css`
  padding: 2px;
  color: #949292;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    color: #7d828a;
    background-color: rgba(0, 0, 0, 0.05);
  }

  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  ${props =>
    props.isHighlighted &&
    css`
      color: #fff;
      background-color: #027bc2;

      &:hover {
        color: #fff;
        background-color: #026aa7;
      }
    `}
`;

export const FlexCenterCenterCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
