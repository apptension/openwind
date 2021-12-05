import { supabase } from '../../utils/supabaseClient';

export const getLikes = async (id) => {
  try {
    const { data } = await supabase.from('elements').select('likes').eq('element_id', id);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateLikes = async (id, likes) => {
  console.log('api', { id, likes });
  try {
    await supabase
      .from('elements')
      .update({ likes: likes + 1 })
      .match({ element_id: id });
  } catch (e) {
    console.log(e);
  }
};

export const insertLikes = async (id, likes) => {
  try {
    await supabase.from('elements').insert([{ element_id: id, likes: likes + 1 }]);
  } catch (e) {
    console.log(e);
  }
};
