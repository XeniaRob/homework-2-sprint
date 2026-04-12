import React, {
	ChangeEvent,
	DetailedHTMLProps,
	InputHTMLAttributes,
} from "react";
import s from "./SuperCheckbox.module.css";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, "type"> & {
	onChangeChecked?: (checked: boolean) => void;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	spanClassName?: string;
};

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
	onChange,
	onChangeChecked,
	className,
	spanClassName,
	children, // текст рядом с чекбоксом
	id,
	...restProps
}) => {
	// коллбек для обработки изменения состояния
	const onChangeCallback = (event: ChangeEvent<HTMLInputElement>) => {
		if (onChangeChecked) {
			onChangeChecked(event.currentTarget.checked);
		} else if (onChange) {
			onChange(event);
		}
	};

	// классы для input
	const finalInputClassName = s.checkbox + (className ? " " + className : "");

	// классы для текста рядом с чекбоксом
	const finalSpanClassName = [s.span, spanClassName]
		.filter(Boolean)
		.join(" ");

	return (
		<label className={s.label}>
			<input
				id={id}
				type={"checkbox"}
				onChange={onChangeCallback}
				className={finalInputClassName}
				{...restProps} // остальные пропсы (checked, name и т.д.)
			/>
			{children && (
				<span
					id={id ? id + "-span" : undefined}
					className={finalSpanClassName}
				>
					{children}
				</span>
			)}
		</label>
	);
};

export default SuperCheckbox;
