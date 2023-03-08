const btn = document.querySelector('.modal-btn');

const format = {
	email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
	phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};

const CODE = {
	empty: 2,
	validate: 3,
	length: 4,
};

function isEmpty(element) {
	const value = element.value;
	if (!value || value == '') return true;
}

function checkLength(ele, min = 6, max = 16) {
	const length = ele.value.length;

	return length < min || length > max;
}

function textError(ele, code) {
	if (!code) {
		ele.textContent = '';
		return ele.classList.remove('error');
	}

	let text;
	if (code == CODE.empty) text = 'Không được để trống';
	if (code == CODE.validate) text = 'Không hợp lệ';
	if (code == CODE.length) text = 'Độ dài 8-16 ký tự';

	ele.className = 'error';
	ele.textContent = text;
}

btn.addEventListener('click', function (e) {
	const email = document.querySelector('input[name="account"]');
	const password = document.querySelector('input[type="password"]');
	const phone = document.querySelector('input#phone');

	const errorDOM = {
		email: document.querySelector('#user-form input[name="account"] + p'),
		password: document.querySelector('#user-form input[type="password"] + p'),
		phone: document.querySelector('#user-form input#phone + p'),
	};

	// email
	if (isEmpty(email)) return textError(errorDOM.email, CODE.empty);
	if (!format.email.test(email.value))
		return textError(errorDOM.email, CODE.validate);
	textError(errorDOM.email);

	// password
	if (isEmpty(password)) return textError(errorDOM.password, CODE.empty);
	if (checkLength(password, 6, 12))
		return textError(errorDOM.password, CODE.length);
	textError(errorDOM.password);

	// phone
	if (!document.querySelector('input[name="phone"]').classList.contains('show'))
		return textError(errorDOM.phone);
	if (isEmpty(phone)) return textError(errorDOM.phone, CODE.empty);
	if (!format.phone.test(phone.value))
		return textError(errorDOM.phone, CODE.validate);
	if (checkLength(phone, 10, 11)) return textError(errorDOM.phone, CODE.length);
	textError(errorDOM.phone);
});
