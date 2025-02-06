import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "./layouts/MainLayout";
import {PostsPage} from "./pages/PostsPage/PostsPage";
import {PostDetailsPage} from "./pages/PostDetailsPage/PostDetailsPage";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {RegisterPage} from "./pages/RegisterPage/RegisterPage";
import {ActivatePage} from "./pages/ActivatePage/ActivatePage";
import {PostFormComponent} from "./components/PostFormComponent/PostFormComponent";



export const router = createBrowserRouter([
    {
        path: "/", element: <MainLayout/>,
        children: [
            {index: true, element: <Navigate to={"login"}/>},
            {path: "login", element: <LoginPage/>},
            {path: "registration", element: <RegisterPage/>},
            {path: "activate/:token", element: <ActivatePage/>},

            {path: "posts", element: <PostsPage/>},
            {path: "posts/post_details/:id", element: <PostDetailsPage/>},

            {path: "posts/post_update", element: <PostFormComponent/>},
            {path: "posts/post_add", element: <PostFormComponent/>},


        ]
    }
])
