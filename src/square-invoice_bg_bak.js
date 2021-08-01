// Create fetch and functions for the square invoice.
// @ts-ignore
import { fetch } from 'wix-fetch';
// @ts-ignore
import { createProdList } from 'backend/wSaleList';
// @ts-ignore
import { getSecret } from 'wix-secrets-backend';
// @ts-ignore
import wixData from 'wix-data';
/*
fetch('https://connect.squareup.com/v2/', {
    method: 'post',
    headers: {
        'Square-Version': '2021-05-13',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sToken}`
    },
    body: 'somekey=somevalue'
})
    .then((httpResponse) => {
        if (httpResponse.ok) {
            return httpResponse.json();
        } else {
            return Promise.reject('Fetch did not succeed');
        }
    })
    .then((json) => console.log(json.someKey))
    .catch((err) => console.log(err));
*/
// Square url is https://connect.squareup.com/v2/ sandbox: https://connect.squareupsandbox.com/v2/
// APIs: Create invoice: invoice, publish invoice:invoices/{invoice_id}/publish, create order: orders, retrieve order: orders/{order_id},
// search customers: customers/search, Search catalog items: catalog/search-catalog-items (use sku)
/*  *****  */
const connect = {
	getsandbox    : getSecret('square_sandbox'),
	getProduction : getSecret('square_token'),
	sandbox       : 'https://connect.squareupsandbox.com/v2',
	production    : 'https://connect.squareup.com/v2'
};
// Get user email from wix
// let uEmail = simpleUserData().then((user: { email: string; }) => uEmail = user.email);
// Get line item skus to use to find square cat object ids
let orderSkus = createProdList().then((list) => {
	let skus = [];
	for (let item in list) {
		skus.push(list[item].sku);
	}
	return skus;
});
// console.log('oderSkus' + orderSkus);
// If square customer ID is not already available fetch from square using email
export function sqCustomerId(email) {
	let wxEmail = email;
	let myHeaders;
	const raw = JSON.stringify({
		query : {
			filter : {
				email_address : {
					exact : `${wxEmail}`
				}
			},
			sort   : {
				field : 'DEFAULT',
				order : 'ASC'
			}
		},
		limit : 2
	});
	let getID;
	// First check if the id is already available in the "Aditional Members info db"
	wixData
		.query('AditionalMembersInfo')
		.eq('email', email)
		.find()
		.then((results) => {
			let item = results.items[0]; // should only be one user per email
			console.log('Query Items', item);
			if (item) {
				if (item.sqId) {
					// console.log('Square id: ', item.sqId);
					return item.sqId;
				} else {
					console.log('No Square ID Found in Collection.');
					return (getID = undefined);
				}
			} else {
				console.log('User not found.');
				// popup with link to profile for up/ contact us info
			}
		})
		.catch((error) => console.log('error', error));
	if (getID === undefined) {
		connect.getProduction
			.then((data) => {
				return data;
			})
			.then((token) => {
				myHeaders = {
					Authorization  : 'Bearer ' + token,
					'Content-Type' : 'application/json'
				};
				console.log(myHeaders);
				return myHeaders;
			})
			.then((myHeaders) => {
				let requestOptions = {
					method   : 'POST',
					headers  : myHeaders,
					body     : raw,
					redirect : 'follow'
				};
				return fetch(connect.production + '/customers/search', requestOptions)
					.then((httpResponse) => {
						if (httpResponse.ok) {
							return httpResponse.json();
						} else {
							console.log(httpResponse.json());
							return Promise.reject('Fetch did not succeed');
						}
					})
					.then((result) => {
						let customer = result.customers[0];
						console.log(customer.id);
						// TODO: push id to customer's db item
						return customer.id;
					});
			})
			.catch((error) => console.log('error', error));
	}
	return getID;
}
// Get and build item list for square using Wix's catalogue skus
export async function getSquareProducts() {
	let skuList = await orderSkus;
	console.log('getSquareProducts skuList: ', skuList);
	let sqItemList = [];
	// create call body
	let raw = JSON.stringify({
		categoryIds : [
			'FBOFS5DQWYNCSPGGJN72VOIQ',
			'WE65LXZWKXYCN62ZIJJAXNHG',
			'ZQSRLYGR3HTOHLEY33RZIJF2',
			'QA6QWLKJNDUKHEPNOMTX7BQS',
			'32W5JMW3RBNWWVUTUQIQHUIA'
		],
		sortOrder   : 'ASC'
	});
	connect.getProduction
		.then((data) => {
			return data;
		})
		.then((token) => {
			let myHeaders = {
				'Square-Version' : '2021-05-13',
				'Content-Type'   : 'application/json',
				Authorization    : `Bearer ${token}`
			};
			fetch(connect.production + '/catalog/search-catalog-items', {
				method  : 'post',
				headers : myHeaders,
				body    : raw
			})
				.then((httpResponse) => {
					if (httpResponse.ok) {
						return httpResponse.json();
					} else {
						return Promise.reject('Fetch did not succeed');
					}
				})
				.then((json) => {
					let items = json.items;
					// console.log(json.items);
					// Take skuList item and find all items catalog object_id
					console.log('squareList items #', Object.keys(json.items).length);
					let sqItemList = [];
					const sqItemObject = function(itemID, catID) {
						return {
							catalog_object_id : '' + itemID,
							modifiers         : [
								{
									catalog_object_id : '' + catID
								}
							],
							quantity          : '1',
							basePriceMoney    : {
								amount   : 500,
								currency : 'USD'
							}
						};
					};
					skuList.forEach((sku) => {
						let match = '';
						Object.entries(items).forEach((item) => {
							const squ = item[1].item_data.variations[0].item_variation_data.sku;
							const sqName = item[1].item_data.name;
							if (squ === sku) {
								console.log(`${sqName} : ${squ}`);
								sqItemList.push(sqItemObject());
							}
							return (match = item[1].id);
						});
						if (match.length === null) {
							return console.log('Match not Found');
						}
						return console.log(sqItemList);
					});
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
}
// getSquareProducts(orderSkus);
// Start by creating a new order using the customer_id. build
// the line_items list using catalog/search
/* fetch('https://connect.squareup.com/v2/orders', {
    method: 'post',
    headers: {
        'Square-Version': '2021-05-13',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sSB}`
    },
    body: {
        //BG: Get from a... library? must just be random
        idempotency_key: '{{$guid}}',
        order: {
            location_id: '{location_id}',
            reference_id: 'my-order-0001',
            line_items: [
                {
                    catalog_object_id: '{COFFEE_ITEM_ID}',
                    modifiers: [
                        {
                            catalog_object_id: '{SMALL_MODIFIER_ID}'
                        }
                    ],
                    quantity: '1',
                    basePriceMoney: {
                        amount: 500,
                        currency: 'USD'
                    }
                }
            ]
        },
        fulfillments: [
            {
                type: 'PICKUP',
                status: 'PROPOSED',
                pickup_details: {
                    is_square_pickup_order: true,
                    recipient: {
                        display_name: 'Jack Dorsyss',
                        email_address: 'recipient email address',
                        phone_number: '1 (234) 567 8900'
                    },
                    schedule_type: 'SCHEDULED',
                    pickup_at: '2019-02-23T01:02:05+00:01',
                    pickup_window_duration: 'P1W3D',
                    prep_time_duration: 'P1W3D',
                    note: 'OPTIONAL NOTE ABOUT THE ORDER'
                }
            }
        ]
    }
})
    .then((httpResponse: { ok: any; json: () => any; }) => {
        if (httpResponse.ok) {
            return httpResponse.json();
        } else {
            return Promise.reject('Fetch did not succeed');
        }
    })
    .then((json: { someKey: any; }) => console.log(json.someKey))
    .catch((err: any) => console.log(err)); */
// Take the order_Id and the customer_Id and create the invoice.
/* fetch('https://connect.squareup.com/v2/invoice', {
    method: 'post',
    headers: {
        'Authorization':`Bearer ${sSB}`,
        'Content-Type':'application/json'
    },
    body: {
    "idempotency_key": "{{$guid}}",
    "invoice": {
        "order_id": "{{order_id}}",
        "location_id": "{{location_id}}",
        "primary_recipient": {
            "customer_id": "{{customer_id}}"
        },
                "invoice_number": "000020",
      "title": "Downtown Print Shop",
      "status": "DRAFT",
        "payment_requests": [
            {
                "request_type": "DEPOSIT",
                "due_date": "2020-07-30",
                "percentage_requested": "50",
                "request_method": "CHARGE_CARD_ON_FILE",
                "card_id": "{{card_on_file}}"
            },
            {
                "request_type": "BALANCE",
                "due_date": "2020-08-01",
                "request_method": "CHARGE_CARD_ON_FILE",
                "card_id": "{{card_on_file}}"
            }
        ]
    }
}
})
    .then((httpResponse: { ok: any; json: () => any; }) => {
        if (httpResponse.ok) {
            return httpResponse.json();
        } else {
            return Promise.reject('Fetch did not succeed');
        }
    })
    .then((json: { someKey: any; }) => console.log(json.someKey))
    .catch((err: any) => console.log(err));
 */
// import {sqCustomerId} from 'backend/square';
