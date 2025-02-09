export const baseURL = "/api"

export const urls = {
    auth: {
        register: "/users/create",
        activate: "/auth/activate/",
        login: "/auth",
        refresh: "/auth/refresh"
    },
    users: {
        all: "/users",
        my_profile: "/users/me",
        search: (params) => `/users${params}`,
        byId: (id) => `/users/${id}`,
        block: (id) => `/users/${id}/block`,
        unblock: (id) => `/users/${id}/unblock`,
    },
    posts: {
        all: "/posts",
        create: "/posts/create",
        byId: (id) => `/posts/${id}`,
        byUserId: (id) => `/posts/user/${id}`,
    },
    post_label: {
        all: "/post_labels",
    },
    regions: {
        all: "/regions",
        create: "/regions"
    },
    cities: {
        all: "/cities",
        byRegion: (id) => `/cities/region/${id}`,
        create: (id) => `cities/region/${id}`
    }
}
