import React, { useReducer } from 'react';
import './styles.css';

/**
 * 定义 Action 类型
 * 使用常量来避免拼写错误
 */
const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

/**
 * 模拟商品数据
 */
const products = [
  { id: 1, name: 'React 实战教程', price: 99, image: '📚' },
  { id: 2, name: 'TypeScript 指南', price: 88, image: '📖' },
  { id: 3, name: 'JavaScript 高级编程', price: 128, image: '📗' },
  { id: 4, name: 'Node.js 开发实践', price: 108, image: '📘' },
];

/**
 * Reducer 函数
 * 接收当前状态和 action，返回新的状态
 * @param {Object} state - 当前购物车状态
 * @param {Object} action - 描述如何更新状态的动作对象
 * @returns {Object} 新的状态
 */
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // 如果商品已存在，增加数量
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // 如果是新商品，添加到购物车
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    // 删除指定商品
    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    // 更新指定商品的数量
    case ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    // 清空购物车
    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}

/**
 * 购物车组件
 * 使用 useReducer 管理购物车状态
 */
function ShoppingCart() {
  // 初始化购物车状态
  const initialState = {
    items: [],
  };

  // 使用 useReducer 创建状态和 dispatch 函数
  const [state, dispatch] = useReducer(cartReducer, initialState);

  /**
   * 计算购物车总价
   * @returns {number} 总价
   */
  const calculateTotal = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="shopping-cart">
      <h2>购物车示例 (useReducer)</h2>

      {/* 商品列表 */}
      <div className="products">
        <h3>可选商品</h3>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <span className="product-image">{product.image}</span>
              <span className="product-name">{product.name}</span>
              <span className="product-price">¥{product.price}</span>
              <button
                onClick={() =>
                  dispatch({
                    type: ACTIONS.ADD_TO_CART,
                    payload: product,
                  })
                }
              >
                添加到购物车
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 购物车内容 */}
      <div className="cart">
        <h3>购物车</h3>
        {state.items.length === 0 ? (
          <p>购物车是空的</p>
        ) : (
          <>
            <div className="cart-items">
              {state.items.map((item) => (
                <div key={item.id} className="cart-item">
                  <span className="item-image">{item.image}</span>
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">¥{item.price}</span>
                  <div className="quantity-controls">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          dispatch({
                            type: ACTIONS.UPDATE_QUANTITY,
                            payload: {
                              id: item.id,
                              quantity: item.quantity - 1,
                            },
                          });
                        } else {
                          dispatch({
                            type: ACTIONS.REMOVE_FROM_CART,
                            payload: item.id,
                          });
                        }
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: ACTIONS.UPDATE_QUANTITY,
                          payload: { id: item.id, quantity: item.quantity + 1 },
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() =>
                      dispatch({
                        type: ACTIONS.REMOVE_FROM_CART,
                        payload: item.id,
                      })
                    }
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="total">总计: ¥{calculateTotal()}</div>
              <button
                className="clear-button"
                onClick={() => dispatch({ type: ACTIONS.CLEAR_CART })}
              >
                清空购物车
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
