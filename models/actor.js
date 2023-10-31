const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


//schema
const schema = mongoose.Schema({
    _name:String,
    _lastName:String
});

//clase
class Actor{
    constructor(name, _lastName){
        this._name = name;
        this._lastName = lastName;
    }
    get name(){
        return this._name;
    }
    set name(v){
        this._name = v;
    }
    get lastName(){
        return this._lastName;
    }
    set lastName(v){
        this._lastname = v;
    }
}

schema.loadClass(Actor);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Actor', schema);