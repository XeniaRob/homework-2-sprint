import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import Greeting from "./Greeting";
import { UserType } from "./HW3";

type GreetingContainerPropsType = {
	users: UserType[];
	addUserCallback: (name: string) => void;
};

export const pureAddUser = (
	name: string,
	setError: React.Dispatch<React.SetStateAction<string>>,
	setName: React.Dispatch<React.SetStateAction<string>>,
	addUserCallback: (name: string) => void
) => {
	if (name.trim()) {
		addUserCallback(name);
		setError("");
		setName("");
	} else {
		setError("Ошибка! Введите имя!");
		if (name !== "") {
			setName(name);
		}
	}
};

export const pureOnBlur = (
	name: string,
	setError: React.Dispatch<React.SetStateAction<string>>
) => {
	if (!name.trim()) {
		setError("Ошибка! Введите имя!");
	}
};

export const pureOnEnter = (
	e: KeyboardEvent<HTMLInputElement>,
	addUser: () => void
) => {
	if (e.key === "Enter") {
		addUser();
	}
};

const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
	users,
	addUserCallback,
}) => {
	const [name, setName] = useState<string>("");
	const [error, setError] = useState<string>("");

	const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value);
		error && setError("");
	};
	const addUser = () => {
		pureAddUser(name, setError, setName, addUserCallback);
	};

	const onBlur = () => {
		pureOnBlur(name, setError);
	};

	const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		pureOnEnter(e, addUser);
	};

	const totalUsers = users.length;
	const lastUserName = users.length > 0 ? users[users.length - 1].name : "";

	return (
		<Greeting
			name={name}
			setNameCallback={setNameCallback}
			addUser={addUser}
			onBlur={onBlur}
			onEnter={onEnter}
			error={error}
			totalUsers={totalUsers}
			lastUserName={lastUserName}
		/>
	);
};

export default GreetingContainer;
