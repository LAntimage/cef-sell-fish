import React from "react"
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './App.scss'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [
                {name: "salmon", title: "Лосось", price: 120, rare: 1, inventory: 10},
                {name: "mackerel", title: "Макрель", price: 520, rare: 1, inventory: 3},
                {name: "sturgeon", title: "Осетр", price: 240, rare: 3, inventory: 15},
                {name: "trout", title: "Радужная форель", price: 70, rare: 2, inventory: 5},
                {name: "stingray", title: "Скат", price: 230, rare: 2, inventory: 12},
                {name: "cod", title: "Треска", price: 700, rare: 3, inventory: 6}
            ],
            current_product: 0,
            count_to_sell: 1
        }
    }

    selectProduct = (i) => {
        this.setState({ current_product: i, count_to_sell: 1 })
    }
    changeCountToSell = (count) => {
        if (typeof count === "object")
            count = parseInt(count.target.value)

        let product = this.state.products[this.state.current_product]
        if (count > product.inventory)
            count = product.inventory
        else if (count < 1)
            count = 1

        this.setState({ count_to_sell: count || 1 })
    }

    render() {
        let current_product = this.state.current_product
        let product = this.state.products[current_product] || {}
        let min_to_sell = 1
        let max_to_sell = product.inventory
        let count_to_sell = this.state.count_to_sell
        let sum_to_sell = product.price * count_to_sell
        let products_list = this.state.products.map((item, i) => {
            return (
                <div key={i} className={`product ${current_product===i?"active":""}`} onClick={() => this.selectProduct(i)}>
                    <div className={`type type-${item.rare}`}>Редкий вид</div>
                    <div className="info">
                        <div className="item big">
                            <span>Лосось</span>
                            <span />
                        </div>
                        <div className="item">
                            <span>Цена за 1шт.</span>
                            <span>${item.price}</span>
                        </div>
                        <div className="item">
                            <span>В инвентаре:</span>
                            <span>{item.inventory} шт.</span>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="App">
                <div className="window">
                    <div className="products">
                        <div className="tabs">
                            <div className="tab">Рыбы</div>
                        </div>
                        <div className="products-list">
                            {products_list}
                        </div>
                    </div>
                    <div className={`sell-panel`}>
                        <div className="logo" />
                        {product.inventory && product.inventory > 0 &&
                        <>
                            <div className="title">
                                <span>Выбранный вид:</span>
                                <span>{product.title}</span>
                            </div>
                            <div className="count">
                                <span>Количество:</span>
                                <div className="input">
                                    <Slider min={min_to_sell} max={max_to_sell} value={count_to_sell} onChange={this.changeCountToSell} />
                                    <input type="number" value={count_to_sell} onChange={this.changeCountToSell} />
                                </div>
                            </div>
                            <div className="title">
                                <span>Сумма выплаты:</span>
                                <span>${sum_to_sell}</span>
                            </div>
                            <div className="button-sell">Продать рыбу</div>
                        </>
                        }
                        <div className="button-close">Выход</div>
                    </div>
                </div>
            </div>
        )
    }
}
