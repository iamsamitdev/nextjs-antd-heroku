import http from '../constants/_configAxios'

// Method Read All Product
const getAllProduct = () => {
    return http.get("/products")
}

// Method Read By ID
const getProductByID = (id) => {
    return http.get(`/products/${id}`)
}

// Method Add new product
const addNewProduct = (data) => {
    return http.post("/products", data)
}

// Method Update Product
const updateProduct = (id, data) => {
    return http.put(`/products/${id}`, data)
}

// Method Delete Product by ID
const deleteProduct = (id) => {
    return http.delete(`/products/${id}`)
}

export default {
    getAllProduct,
    getProductByID,
    addNewProduct,
    updateProduct,
    deleteProduct
}