function isNumberKey(evt) {
	var charCode = evt.which ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
	return true;
}

// login
let modal_status = {
	modal: 0,
	user: 0,
	product: 0,
};

function closeModal() {
	const MODAL_FORM = document.querySelector('#modal-form');

	modal_status.modal = 0;
	MODAL_FORM.className = '';
}

function openModal(type, name) {
	const MODAL_FORM = document.querySelector('#modal-form');
	const USER_FORM = document.querySelector('#user-form');
	const PRODUCT_MODAL = document.querySelector('#product-modal');

	if (modal_status.modal == 0) modal_status.modal = 1;

	if (type == 'user') {
		modal_status.user = 1;
		if (modal_status.product == 1) {
			USER_FORM.parentElement.classList.remove('product');
			PRODUCT_MODAL.classList.remove('show');
			modal_status.product = 0;
		}

		if (!USER_FORM.classList.contains('show')) USER_FORM.classList.add('show');

		if (name == 'sign-up') {
			USER_FORM.querySelector('.modal-title').textContent = 'Đăng ký';
			USER_FORM.querySelector('label[name="phone"]').className = 'show';
			USER_FORM.querySelector('input[name="phone"]').className = 'show';
			const more = USER_FORM.querySelector('.account-more');
			more.innerHTML = `Đã có tài khoản? <span onclick='openModal("user","sign-in")' href="">Đăng nhập</span>`;
			USER_FORM.querySelector('.modal-btn').textContent = 'Đăng ký';
		}

		if (name == 'sign-in') {
			USER_FORM.querySelector('.modal-title').textContent = 'Đăng nhập';
			USER_FORM.querySelector('label[name="phone"]').classList.remove('show');
			USER_FORM.querySelector('input[name="phone"]').classList.remove('show');
			const more = USER_FORM.querySelector('.account-more');
			more.innerHTML = `Chưa có tài khoản? <span onclick='openModal("user","sign-up")' href="">Đăng ký</span>`;
			USER_FORM.querySelector('.modal-btn').textContent = 'Đăng nhập';
		}
	}

	if (type == 'product') {
		PRODUCT_MODAL.parentElement.classList.add('product');
		modal_status.product = 1;
		modal_status.user = 0;
		USER_FORM.classList.remove('show');

		PRODUCT_MODAL.className = 'show';
	}

	MODAL_FORM.className = 'show';
}

document.addEventListener('mouseup', (e) => {
	const item = [
		document.querySelector('#user-form'),
		document.querySelector('#product-modal'),
	];

	if (modal_status.user && !item[0].contains(e.target)) return closeModal();

	if (modal_status.product && !item[1].contains(e.target)) return closeModal();
});

function Top() {
	let currentScroll =
		document.documentElement.scrollTop || document.body.scrollTop;
	if (currentScroll > 0) {
		window.requestAnimationFrame(Top);
		window.scrollTo(0, currentScroll - currentScroll / 5);
	}
}

window.addEventListener('scroll', function (e) {
	const btn = document.querySelector('#to-top');

	if (window.scrollY <= 160) return btn.classList.remove('show');

	if (!btn.classList.contains('show')) btn.classList.add('show');
});

document.querySelectorAll('.product-size .size').forEach((e) => {
	e.addEventListener('click', () => {
		if (e.classList.contains('selected')) return;

		document.querySelector('.selected').classList.remove('selected');
		e.classList.add('selected');
	});
});

const toast = (status = 0, text) => {
	const icon = [
		'fas fa-check',
		'fas fa-info',
		'fas fa-exclamation-triangle',
		'fas fa-exclamation',
	];
	const item = document.createElement('div');
	item.className = 'notification-item success';
	item.innerHTML = `<i class="${icon[status]}"></i>
	<p class="notification-text">${text}</p>`;
	return item;
};

document.querySelectorAll('.product-action .add-to-cart').forEach((e) => {
	const wrap = document.querySelector('.notifications');
	e.addEventListener('click', () => {
		const toastElement = toast(0, 'Đã thêm vào giỏ hàng');
		wrap.appendChild(toastElement);
		setTimeout(() => {
			toastElement.classList.add('hide');
		}, 2000);
		setTimeout(() => {
			wrap.removeChild(toastElement);
		}, 2400);
	});
});
