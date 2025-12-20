
/**
 * DATABASE MODULE
 * Handles data fetching and realtime subscriptions
 */

const DB = {

    /**
     * Fetch all channels
     */
    async getChannels() {
        const { data, error } = await window.supabaseClient
            .from('channels')
            .select('*')
            .order('id');

        if (error) {
            console.error('Error fetching channels:', error);
            return []; // Return empty on error (or default static channels?)
        }
        return data;
    },

    /**
     * Fetch posts for a specific channel
     */
    async getChannelPosts(channelId) {
        const { data, error } = await window.supabaseClient
            .from('posts')
            .select(`
                *,
                author:profiles(username, avatar_url, level)
            `)
            .eq('channel_id', channelId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
        return data;
    },

    /**
     * Create a new post
     */
    async createPost(content, channelId) {
        const user = window.Auth.user;
        if (!user) {
            UIUtils.toast('You must be logged in to post.', 'error');
            return null;
        }

        const { data, error } = await window.supabaseClient
            .from('posts')
            .insert({
                content,
                channel_id: channelId,
                author_id: user.id
            })
            .select()
            .single();

        if (error) {
            UIUtils.toast('Failed to post message.', 'error');
            console.error(error);
            return null;
        }

        UIUtils.toast('Message sent!', 'success');
        return data;
    },

    /**
     * Subscribe to new posts in a channel
     */
    subscribeToChannel(channelId, callback) {
        return window.supabaseClient
            .channel(`public:posts:channel_id=eq.${channelId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'posts',
                filter: `channel_id=eq.${channelId}`
            }, payload => {
                // Fetch full author details for the new post
                this.fetchPostWithAuthor(payload.new.id).then(post => {
                    if (post) callback(post);
                });
            })
            .subscribe();
    },

    /**
     * Helper to get a single post with author ref (for realtime payloads)
     */
    async fetchPostWithAuthor(postId) {
        const { data } = await window.supabaseClient
            .from('posts')
            .select(`*, author:profiles(username, avatar_url, level)`)
            .eq('id', postId)
            .single();
        return data;
    }
};

window.DB = DB;
