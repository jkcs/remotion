import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';
import {
	INPUT_BACKGROUND,
	INPUT_BORDER_COLOR_HOVERED,
	INPUT_BORDER_COLOR_UNHOVERED,
	SELECTED_BACKGROUND,
} from '../../helpers/colors';
import {FONT_FAMILY} from '../../helpers/font';
import {useZIndex} from '../../state/z-index';

type Props = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

const RemInputForwardRef: React.ForwardRefRenderFunction<
	HTMLInputElement,
	Props
> = (props, ref) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const {tabIndex} = useZIndex();

	const style = useMemo(() => {
		return {
			backgroundColor: INPUT_BACKGROUND,
			fontFamily: FONT_FAMILY,
			padding: '8px 10px',
			color: 'white',
			outline: 'none',
			borderStyle: 'solid',
			borderWidth: 1,
			fontSize: 14,
			appearance: 'textfield',
			borderColor: isFocused
				? SELECTED_BACKGROUND
				: isHovered
				? INPUT_BORDER_COLOR_HOVERED
				: INPUT_BORDER_COLOR_UNHOVERED,
			...(props.style ?? {}),
		};
	}, [isFocused, isHovered, props.style]);

	useImperativeHandle(ref, () => {
		return inputRef.current as HTMLInputElement;
	});

	useEffect(() => {
		if (!inputRef.current) {
			return;
		}

		const {current} = inputRef;

		const onFocus = () => setIsFocused(true);
		const onBlur = () => setIsFocused(false);
		const onMouseEnter = () => setIsHovered(true);
		const onMouseLeave = () => setIsHovered(false);

		current.addEventListener('focus', onFocus);
		current.addEventListener('blur', onBlur);
		current.addEventListener('mouseenter', onMouseEnter);
		current.addEventListener('mouseleave', onMouseLeave);

		return () => {
			current.removeEventListener('focus', onFocus);
			current.removeEventListener('blur', onBlur);
			current.removeEventListener('mouseenter', onMouseEnter);
			current.removeEventListener('mouseleave', onMouseLeave);
		};
	}, [inputRef]);

	return <input ref={inputRef} tabIndex={tabIndex} {...props} style={style} />;
};

export const RemotionInput = forwardRef(RemInputForwardRef);
