import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";
import {PostsPage} from "./pages/PostsPage/PostsPage";
import {PostDetailsPage} from "./pages/PostDetailsPage/PostDetailsPage";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {RegisterPage} from "./pages/RegisterPage/RegisterPage";
import {ActivatePage} from "./pages/ActivatePage/ActivatePage";
import {UsersPage} from "./pages/UsersPage/UsersPage";


export const router = createBrowserRouter([
    {
        path: "/", element: <MainLayout/>,
        children: [
            {index: true, element: <Navigate to={"login"}/>},
            {path: "login", element: <LoginPage/>},
            {path: "register", element: <RegisterPage/>},
            {path: "activate/:token", element: <ActivatePage/>},

            {path: "users", element: <UsersPage/>},

            {path: "posts", element: <PostsPage/>},
            {path: "posts/post_details/:id", element: <PostDetailsPage/>},
        ]
    }
])
