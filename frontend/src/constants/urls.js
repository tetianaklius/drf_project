export const baseURL = "/api"

export const urls = {
    auth: {
        register: "/users/create",
        activate: "/auth/activate/",
        login: "/auth",
    },
    users: {
        all: "/users",
        byId: (id) => `/users/${id}`,
        block: (id) => `/users/${id}/block`,
        unblock: (id) => `/users/${id}/unblock`,
    },
    posts: {
        all: "/posts",
        create: "/posts/create",
        byId: (id) => `/posts/${id}`,
        byUserId: (id) => `/posts/user/${id}`,
        update: (id) => `/post/update/${id}`,
    }
}
