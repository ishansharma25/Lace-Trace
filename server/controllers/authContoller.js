const User=require('../models/user')
const {hashpassword,comparepassword, hashPassword}=require('../helpers/auth')
const jwt=require('jsonwebtoken');


const test=(req,res)=>
{
    res.json('test is working')
}
/* need middle ware that is in index.js*/

// register
const registerUser=async (req,res)=>{
    try{
const {name,email,password}=req.body
        //check if think are good
        if(!name)
        {
            return res.json({
                error:'name is require'
            })
        };
        if(!password || password.length<6)
        {
            return res.json({
                error:'password is require should be 6 charater long'
            })
        }
        const exist=await User.findOne({email})
        if(exist)
        {
            return res.json({
                error:'email already exits'
            }) 
        }
//create user
const hashedpassword= await hashPassword(password)
        const user=await User.create({
            name,
            email,
            password:hashedpassword,
        })
            return res.json(user)

    }catch(error){
        console.log("error",error)

    }

}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid User' });
        }

        const match = await comparepassword(password, user.password);
        if (match) {
            const token = jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // Set an appropriate expiration time
            );
            // Set cookie options to ensure cookies are sent securely
res.cookie('token', token, {
    httpOnly: true, // Prevent JavaScript access
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'Strict', 
    maxAge: 3600000
});

            

            res.json(user);
        } else {
            return res.status(401).json({ error: 'Incorrect Password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/*
// login
const loginUser=async (req,res)=>
{
    try {
        const {email,password}=req.body;

        const user=await User.findOne({email})

        if(!user)
            {
                return res.json({
                    error:'Invalid User'
                }) 
            }
            const match=await comparepassword(password,user.password)
        if(match)
        {
            const token= jwt.sign({email:user.email,id:user._id,name:user.name},process.env.JWT_SECRET,{},(error,token)=>
            {
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    maxAge: 3600000 // 1 hour
                }).json(user);
            })
         
        }
        if(!match)
            {
                   return res.json({
                error:'password not correct'})

            }
       
        
        
    } catch (error) {
        console.log(error)
    }
}
*/
const logout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 0
    }).json({ message: 'Logged out successfully' });
};

/*
const getProfile=(req,res)=>
{
    const { token } = req.cookies;
    console.log('Token:', token); // Log token to check if it's being received

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) {
                console.error('JWT Verification Error:', error); // Log any JWT verification errors
                return res.status(403).json({ error: 'Invalid token' });
            }
            console.log('User from Token:', user); 
            res.json(user);
        });
    } else {
        res.status(401).json(null);
    }
};*/
// In your backend routes
const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            res.json(user);
        });
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
};
module.exports={
    test,
    registerUser,
    loginUser,
    getProfile,
    logout
}