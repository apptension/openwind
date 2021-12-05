import { supabase } from '../../utils/supabaseClient';

export const getLikes = async (id) => {
  try {
    const { data } = await supabase
      .from('elements')
      .select('likes, fires, rockets, hearts, unicorns')
      .eq('element_id', id);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateLikes = async (id, value, type) => {
  console.log('update', { id, value, type });
  try {
    await supabase
      .from('elements')
      .update({ [type]: value + 1 })
      .match({ element_id: id });
  } catch (e) {
    console.log(e);
  }
};

export const insertLikes = async (id, value, type) => {
  console.log('insert', { value, type });
  try {
    await supabase.from('elements').insert([{ element_id: id, [type]: value + 1 }]);
  } catch (e) {
    console.log(e);
  }
};
