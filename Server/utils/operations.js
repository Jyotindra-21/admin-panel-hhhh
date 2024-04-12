const supabase = require("../lib/db")

// Check if specific value exists 
exports.doesExists = async (table, selection, col_to_compare, value_to_find) => {
    try {
        const { data, error } = await supabase.from(table).select(selection).eq(col_to_compare, value_to_find)

        if (error) throw new Error(error.message)
        if (data.length === 1) return true;
        return false;
    } catch (error) {
        throw error
    }
}


exports.multiCheckDoesExists = async (table, selection, f_col_to_compare, f_value_to_find, s_col_compare, s_value_to_find) => {
    try {
        const { data, error } = await supabase.from(table).select(selection).eq(f_col_to_compare, f_value_to_find).eq(s_col_compare, s_value_to_find)
        if (error) throw new Error(error.message)
        if (data.length === 1) return true;
        return false;
    } catch (error) {
        throw error
    }
}


// Returns boolean values
exports.InsertDetails = async (table, details) => {
    try {
        const { error } = await supabase.from(table).insert(details)
        if (error) throw new Error;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.DeleteById = async (table, id) => {
    try {
        const { data } = await supabase.from(table).select("id").eq("id", id)
        if (data.length === 0) return false;
        const { error } = await supabase.from(table).delete().eq("id", id)
        if (error) throw new Error
        return true;
    } catch (error) {
        console.log(error);
        
        return false;
    }
}


// Delete files from the bucket

exports.DeleteFileFromBucket = async (bucket, path) => {
    try {
        const { data, error } = await supabase
            .storage
            .from(bucket)
            .remove(path)
    } catch (error) {
        console.log(error);
        throw error
    }

}

// Returns actual content

exports.viewDetailByCondition = async (table, to_select, col_to_compare, value_to_find) => {
    try {
        const { data, error } = await supabase.from(table).select(to_select).eq(col_to_compare, value_to_find).order('id', { ascending: true })
        if (error) throw new Error(error.message)
        return data;
    } catch (error) {
        return false;
    }
}

exports.ViewAllDetails = async (table) => {
    try {
        const { data, error } = await supabase.from(table).select("*").order('id', { ascending: true })
        if (error) throw new Error(error.message)
        return data;
    } catch (error) {
        return false;
    }
}


// Update values or return error

exports.UpdateDetailsById = async (table, details, id) => {
    try {
        delete details.id
        const { data } = await supabase.from(table).select("id").eq("id", id);
        if (data.length === 0) return false;
        const { error } = await supabase.from(table).update(details).eq("id", id)
        if (error) throw new Error(error)
        return true
    } catch (error) {
        console.log(error);
        throw error;
    }
}
