import db from '../models/index'

const getAllCategory = async () => {
    try {
        let data = await db.Category.findAll({})
        if(data) {
            return {
                EM: 'Get Data Success',
                EC: 0,
                DT: data
            }
        } else {
            return {
                EM: 'Get Data Falied',
                EC: -1,
                DT: []
            }
        }
    } catch(e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const getCategoryWithPost = async (id) => {
    try {
        if(!id) {
            return {
                EM: "Don't have category",
                EC: -1,
                DT: []
            }
        } 
        let post = await db.Category.findAll({
            where : {
                id: id
            },
            include: 
                {
                    model: db.Post,
                },
            raw: true,
            nest: true
        })
         
        if(post) {
            return {
                EM: 'Get Data Success',
                EC: 0,
                DT: post
            }
        } else {
            return {
                EM: 'Get Data Falied',
                EC: -1,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const getCategoyryWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit

        const { count, rows } = await db.Category.findAndCountAll({
            order: [['id', 'DESC']],
            offset,
            limit
        })

        let toltolPage = Math.ceil(count/limit)

        let data = {
            totalRows: count,
            toltolPage,
            category: rows
        }
        return {
                EM: 'Fetch OK',
                EC: 0,
                DT: data
            }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const CreateCategory = async (data) => {
    try {
        await db.Category.create(data)
        return {
                EM: 'Create Category Success',
                EC: 0,
                DT: []
            }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const UpdateCategory = async (data) => {
    try {
        let category = await db.Category.findOne({
            where: {
                id: data.id
            }
        })
        if (category) {
         await category.update({
                name: data.name,
                description: data.description,
            })
            return {
                EM: 'Update Category Success',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'Category not found',
                EC: 1,
                DT: ''
            }
        }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

const deleteCategory = async (id) => {
    try {
        let category = await db.Category.findOne({
            where: { 
                id: id 
            }
        })

        if (category) {
            await category.destroy();
            return {
                EM: 'Delete Category Success',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'Category not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
                EM: 'Somethign wrongs with services',
                EC: 1,
                DT: []
            }
    }
}

module.exports = {
    getAllCategory, CreateCategory, UpdateCategory, deleteCategory, getCategoyryWithPagination, getCategoryWithPost
}