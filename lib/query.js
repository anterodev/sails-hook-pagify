module.exports = {
    find: function(Table, options){
        // query the table
        var query = Table.find(options.findQuery);

        options.sort.forEach(function(sortQuery){
            query = query.sort(sortQuery);
        });

        // populate fields if required
        options.populate.forEach(function(field) {
            if(typeof field === 'string') {
                query = query.populate(field);
            }else if(typeof field == 'object'){
                query = query.populate(field.model, field.params)
            }
        });

        // do pagination
        query = query.paginate({
            limit: options.perPage,
            page: options.page
        });

        return query;
    },

    count: function(Table, findQuery){
        return Table.count(findQuery);
    }
}
