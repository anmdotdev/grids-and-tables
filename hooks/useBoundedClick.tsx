import { useRef, useEffect } from 'react';

const useBoundedClick = (options = {}) => {
	const { onOuterClick = () => {}, onInnerClick = () => {} } = options;

	const ref = useRef();

	const onClickAnywhere = (e) => {
		if (ref && ref.current) {
			const insideClick = ref.current.contains(e.target);
			if (insideClick) {
				onInnerClick(e);
			} else {
				onOuterClick(e);
			}
		}
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			document.addEventListener('click', onClickAnywhere, true);
		}
		return () => {
			if (typeof window !== 'undefined') {
				document.removeEventListener('click', onClickAnywhere, true);
			}
		};
	});

	return ref;
};

export default useBoundedClick;
