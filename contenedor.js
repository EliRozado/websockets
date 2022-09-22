const fs = require("fs")

class Contenedor{
    constructor(archivo){
        this.archivo = archivo
    }

    save(producto){
        const producto_a_agregar = producto

        const data = this.processData()
        
        if(data.length){
            //si hay productos en data, buscar el ultimo id
            const last_id = data[data.length - 1].id
            producto_a_agregar.id = last_id + 1
        }else{
            //si es el primer producto de la lista, id = 1
            producto_a_agregar.id = 1
        }

        data.push(producto_a_agregar)
        fs.writeFileSync(this.archivo, JSON.stringify(data, null, 2))

        return producto_a_agregar.id
    }

    getByID(numero){
        const data = this.processData()

        //si no lo encuentra, devuelve null
        let producto = data.find(producto => producto.id == numero) || null

        return producto
    }

    getAll(){
        const data = this.processData()
        
        if(data.length){
            return data
        }else{
            console.log('No hay nada en la lista')
            return []
        }
    }

    deleteByID(numero){
        const data = this.processData()

        let productoIndex = data.findIndex(producto => producto.id == numero)

        if(productoIndex >= 0){
            data.splice(productoIndex, 1)

            fs.writeFileSync(this.archivo, JSON.stringify(data, null, 2))
            console.log('El producto fue eliminado')
        }else{
            console.log('El producto buscado no esta en la lista')
        }
    }

    deleteAll(){
        //Elimina todos los productos del archivo
        const data = []
        fs.writeFileSync(this.archivo, JSON.stringify(data, null, 2))
        console.log('Se vacio la lista')
    }

    // * funcion de ayuda
    processData(){
        const data = []
        // * Si ya hay algo en el archivo, pasarlo a data
        try{
            const productos = JSON.parse(fs.readFileSync(this.archivo, 'utf-8'))
            productos.forEach(element => {
                data.push(element)
            });
            
        } catch(err) {
            console.log('El archivo estaba vacio')
        }

        return data
    }
}

module.exports.Contenedor = Contenedor;
