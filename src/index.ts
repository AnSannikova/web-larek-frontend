import { ApiShop } from './components/ApiShop';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { AppState, GalleryChangeEvent } from './components/AppSate';
import { IProduct } from './types';
import { Modal } from './components/common/Modal';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Gallery } from './components/Gallery';

const events = new EventEmitter();
const api = new ApiShop(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

//const modalElement = ensureElement<HTMLElement>('#modal-container');

const appState = new AppState({}, events);
//const modal = new Modal(modalElement, events);

//дописать метод
// events.on<GalleryChangeEvent>('gallery:changed', () => {
// 	const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'), {
// 		onClick: (event) => {
// 			console.log(event);
// 		},
// 	});

// 	return gallery.render({
// 		items:
// 	})
// });

api
	.getItemList()
	.then((data: IProduct[]) => {
		appState.setProduct(data);
	})
	.catch((err) => {
		console.error(err);
	});
