const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }

    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class Basket {
    constructor(container = '.basket') {
        this.container = container;
        this.basket_list = [];
        this._getBasket()
            .then(data => {
                this.basket_list = [...data.contents];
                this.render();
            });
    }

    _getBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json());
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.basket_list) {
            const productObj = new BasketItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

    addItem() {
        //    Добавление товара в корзину
    }

    delItem() {
        //    Удаление товара из корзины
    }
}

class BasketItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;
        this.img = img;
    }

    render() {
        return `<div class="basket-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <p>Количество: ${this.quantity} шт.</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();
// console.log(list.allProducts);

let basket = new Basket();
