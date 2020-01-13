import styled, { keyframes } from 'styled-components';

const skeleton = keyframes`
  0% {
    background-position: -468px 0;
  }
  
  100% {
    background-position: 468px 0; 
  }
`;

type SkeletonProps = { height: string };

const Skeleton = styled.div`
	width: 100%;
	height: ${({ height }: SkeletonProps) => height || '100px'};

	background: #f6f7f8;
	background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
	background-repeat: no-repeat;
	background-size: 100% 100%;

	animation: ${skeleton} 1s linear infinite forwards;
`;

export default Skeleton;
