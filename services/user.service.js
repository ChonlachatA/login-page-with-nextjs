import { getSupabase } from '../db';

export const getUser = async () => {
    try {
        const supabase = getSupabase()
        const { data, error } = await supabase
            .from('user')
            .select('*');

        if (error) throw error;
        return data;
    } catch (e) {
        throw e;        
    }
}

export const findOneUser = async (username) => {
    try {
        const supabase = getSupabase()
        const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('username', username)
        .single();
        
        if (error && error.code !== 'PGRST116') {
            throw error;
        }

        return data;
    } catch (e) {
        throw e;        
    }
}

export const findByIdUser = async (id) => {
    try {
        const supabase = getSupabase()
        const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', id)
        .single();
        
        if (error && error.code !== 'PGRST116') {
            throw error;
        }

        return data;
    } catch (e) {
        throw e;        
    }
}

export const createUsername = async (body) => {
    try {
        const supabase = getSupabase()
        const { data, error } = await supabase
            .from('user')
            .insert(body);

        if (error) throw error;
        return data;
    } catch (e) {
        throw e;        
    }
}

export const updateUser = async (id, body) => {
    try {
        const supabase = getSupabase()
        const { data, error } = await supabase
            .from('user')
            .update(body)
            .eq('id', id);

        if (error) throw error;
        return data;
    } catch (e) {
        throw e;        
    }
}

export const deletedUser = async (id) => {
    try {
        const supabase = getSupabase()
        const { data, error } = await supabase
            .from('user')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return data;
    } catch (e) {
        throw e;        
    }
}