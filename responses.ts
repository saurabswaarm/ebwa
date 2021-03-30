[
    {
        code:455,
        payload: {
            status:200,
            message:'User not found in associatin records'
            
        }
    },
    {
        code:456,
        payload: {
            status:200,
            message:'User already activated, please login',
            redirect:'/login'
        }
    },
    {
        code:457,
        payload: {
            status:200,
            message:'Incomplete Post Submitted'
        }
    },
    {
        code:458,
        payload: {
            status:200,
            message:'Couldnt log out the user'
        }
    },
    {
        code:459,
        payload: {
            status:200,
            message:'Cannot create user as user already exists'
        }
    },
    {
        code:460,
        payload: {
            status:200,
            message:'Incomplete user data submitted'
        }
    },
    {
        code:500,
        payload: {
            status:500,
            message:'Server Error'
        }
    },
    {
        code:401,
        payload: {
            status:401,
            message:'You are not authorised. Please Log In.',
            redirect:'/login'
        }
    }
]

let success = [
    {
        code:1,
        payload:{
            message: "Account details have been mailled",
            redirect: '/login'
        }
    },
    {
        code:2,  // succesfully logged in
        payload:{
            user:'userObject'
        }
    },
    {
        code:3, // succesfull log out
        payload:{
            userEmail:'email of logged user'
        }
    },
    {
        code:4, // sending all posts
        payload: {
            posts:['post', 'post']
        }
    },
    {
        code:5, // post created
        payload: {
            posts:'the post you just created'
        }
    },
    {
        code:6, // post created
        payload: {
            user:'the post you just created'
        }
    }
]