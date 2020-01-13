import { useRef, useEffect } from 'react';

type BoundedOptions = {
	onOuterClick?: Function;
	onInnerClick?: Function;
};

const useBoundedClick = <T extends HTMLElement>(options: BoundedOptions) => {
	const { onOuterClick, onInnerClick } = options || {};

	const ref = useRef() as React.RefObject<T>;

	const onClickAnywhere = (e) => {
		if (ref && ref.current) {
			const insideClick = ref.current.contains(e.target);
			if (insideClick) {
				if (onInnerClick) {
					onInnerClick(e);
				}
			} else if (onOuterClick) {
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
