import fetch from 'node-fetch';

async function getFakeStoreCart(cartItems) {
	const completeCart = cartItems;

	let cellNumber = 0;
	for (const currentItem of cartItems) {
		let id = currentItem.id;
		const quantity = currentItem.quantity;

		const response = await fetch(`https://fakestoreapi.com/products/${id}`);
		const data = await response.json();
		data.quantity = quantity;

		completeCart[cellNumber] = data;
		cellNumber++;
	}

	return completeCart;
}

function fakeStoreToKlarnaCart(fakeStoreCart) {
	const klarnaCart = fakeStoreCart.map((fakeStoreItem) => {
		return {
			type: 'physical',
			reference: fakeStoreItem.id,
			name: fakeStoreItem.title,
			quantity: fakeStoreItem.quantity,
			quantity_unit: 'pcs',
			unit_price: parseInt(fakeStoreItem.price) * 100,
			tax_rate: 1000,
			total_discount_amount: 0,
			image_url: fakeStoreItem.image
		};
	});

	return klarnaCart;
}

module.exports = { getFakeStoreCart, fakeStoreToKlarnaCart };
