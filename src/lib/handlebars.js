//pedimos el método format
const {format} = require('timeago.js');
//helpers lo tuvimos que definir en el index!
const helpers = {};
//timeago es un nombre ficticio

helpers.timeago = (timestamp) => {
    
    return format(timestamp);

};

module.exports = helpers;