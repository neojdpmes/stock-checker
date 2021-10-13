const notifier = require('node-notifier');

module.exports = {
    
    notify: (title, link) => {
        console.log(link);
        notifier.notify({
            title,
            message: link,
        });
    }
}
